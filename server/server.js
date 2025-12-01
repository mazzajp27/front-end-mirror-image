import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const httpServer = createServer(app);

// Configuração do CORS para Socket.io
const io = new Server(httpServer, {
  cors: {
    origin: process.env.CLIENT_URL || "http://localhost:8080",
    methods: ["GET", "POST"],
    credentials: true
  }
});

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:8080",
  credentials: true
}));
app.use(express.json());

// Armazenamento em memória para mensagens (substituir por banco de dados em produção)
const messagesStore = new Map(); // roomId -> messages[]

// Armazenamento de usuários conectados por sala
const roomUsers = new Map(); // roomId -> Set<socketId>

// Rota de health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Chat server is running' });
});

// Rota para buscar mensagens de uma sala (opcional - para histórico)
app.get('/api/messages/:roomId', (req, res) => {
  try {
    const { roomId } = req.params;
    const messages = messagesStore.get(roomId) || [];
    res.json({ success: true, messages });
  } catch (error) {
    console.error('Erro ao buscar mensagens:', error);
    res.status(500).json({ success: false, error: 'Erro ao buscar mensagens' });
  }
});

// Rota para salvar mensagem (opcional - para persistência)
app.post('/api/messages', async (req, res) => {
  try {
    const { roomId, message } = req.body;
    
    if (!roomId || !message) {
      return res.status(400).json({ 
        success: false, 
        error: 'roomId e message são obrigatórios' 
      });
    }

    // Aqui você pode salvar no banco de dados
    // Por enquanto, apenas armazenamos em memória
    if (!messagesStore.has(roomId)) {
      messagesStore.set(roomId, []);
    }
    
    const messages = messagesStore.get(roomId);
    messages.push(message);
    
    // Limitar histórico a 1000 mensagens por sala
    if (messages.length > 1000) {
      messages.shift();
    }

    res.json({ success: true, message });
  } catch (error) {
    console.error('Erro ao salvar mensagem:', error);
    res.status(500).json({ success: false, error: 'Erro ao salvar mensagem' });
  }
});

// Socket.io Connection Handling
io.on('connection', (socket) => {
  console.log(`Cliente conectado: ${socket.id}`);

  // Evento: Cliente entra em uma sala (baseado no ID da contratação)
  socket.on('join_room', ({ roomId, userId, userName }) => {
    try {
      if (!roomId) {
        socket.emit('error', { message: 'roomId é obrigatório' });
        return;
      }

      // Entra na sala
      socket.join(roomId);
      
      // Registra usuário na sala
      if (!roomUsers.has(roomId)) {
        roomUsers.set(roomId, new Set());
      }
      roomUsers.get(roomId).add(socket.id);

      console.log(`Usuário ${userName || userId} (${socket.id}) entrou na sala ${roomId}`);
      
      // Notifica outros usuários na sala
      socket.to(roomId).emit('user_joined', {
        userId,
        userName,
        roomId,
        timestamp: new Date().toISOString()
      });

      // Envia histórico de mensagens para o novo usuário
      const messages = messagesStore.get(roomId) || [];
      if (messages.length > 0) {
        socket.emit('message_history', {
          roomId,
          messages: messages.slice(-50) // Últimas 50 mensagens
        });
      }

      socket.emit('joined_room', { roomId, success: true });
    } catch (error) {
      console.error('Erro ao entrar na sala:', error);
      socket.emit('error', { message: 'Erro ao entrar na sala' });
    }
  });

  // Evento: Cliente envia uma mensagem
  socket.on('send_message', ({ roomId, message, userId, userName }) => {
    try {
      if (!roomId || !message || !message.text) {
        socket.emit('error', { message: 'Dados da mensagem incompletos' });
        return;
      }

      // Cria objeto de mensagem completo
      const fullMessage = {
        id: message.id || `msg-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`,
        text: message.text,
        sender: message.sender || userId,
        senderName: userName || 'Usuário',
        timestamp: message.timestamp || new Date().toISOString(),
        roomId,
        isRead: false
      };

      // Salva mensagem no armazenamento
      if (!messagesStore.has(roomId)) {
        messagesStore.set(roomId, []);
      }
      messagesStore.get(roomId).push(fullMessage);

      // Limitar histórico
      const messages = messagesStore.get(roomId);
      if (messages.length > 1000) {
        messages.shift();
      }

      // Envia mensagem para todos na sala (incluindo o remetente)
      io.to(roomId).emit('receive_message', fullMessage);

      console.log(`Mensagem enviada na sala ${roomId} por ${userName || userId}`);
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
      socket.emit('error', { message: 'Erro ao enviar mensagem' });
    }
  });

  // Evento: Marcar mensagens como lidas
  socket.on('mark_as_read', ({ roomId, messageIds }) => {
    try {
      if (!roomId) return;

      const messages = messagesStore.get(roomId) || [];
      messageIds.forEach(msgId => {
        const msg = messages.find(m => m.id === msgId);
        if (msg) {
          msg.isRead = true;
        }
      });

      // Notifica outros usuários na sala
      socket.to(roomId).emit('messages_read', { roomId, messageIds });
    } catch (error) {
      console.error('Erro ao marcar mensagens como lidas:', error);
    }
  });

  // Evento: Cliente sai de uma sala
  socket.on('leave_room', ({ roomId, userId, userName }) => {
    try {
      socket.leave(roomId);
      
      if (roomUsers.has(roomId)) {
        roomUsers.get(roomId).delete(socket.id);
        if (roomUsers.get(roomId).size === 0) {
          roomUsers.delete(roomId);
        }
      }

      console.log(`Usuário ${userName || userId} (${socket.id}) saiu da sala ${roomId}`);
      
      socket.to(roomId).emit('user_left', {
        userId,
        userName,
        roomId,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error('Erro ao sair da sala:', error);
    }
  });

  // Evento: Cliente desconecta
  socket.on('disconnect', (reason) => {
    console.log(`Cliente desconectado: ${socket.id} - Razão: ${reason}`);
    
    // Remove o socket de todas as salas
    roomUsers.forEach((users, roomId) => {
      if (users.has(socket.id)) {
        users.delete(socket.id);
        if (users.size === 0) {
          roomUsers.delete(roomId);
        }
      }
    });
  });

  // Tratamento de erros do socket
  socket.on('error', (error) => {
    console.error(`Erro no socket ${socket.id}:`, error);
  });
});

const PORT = process.env.PORT || 3001;

httpServer.listen(PORT, () => {
  console.log(`🚀 Servidor Socket.io rodando na porta ${PORT}`);
  console.log(`📡 CORS configurado para: ${process.env.CLIENT_URL || "http://localhost:8080"}`);
});

// Tratamento de erros não capturados
process.on('uncaughtException', (error) => {
  console.error('Erro não capturado:', error);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Promise rejeitada não tratada:', reason);
});

