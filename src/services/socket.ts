import { io, Socket } from 'socket.io-client';

// Configuração da URL do servidor Socket.io
const SOCKET_SERVER_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:3001';

// Interface para mensagens
export interface SocketMessage {
  id: string;
  text: string;
  sender: string;
  senderName: string;
  timestamp: string;
  roomId: string;
  isRead: boolean;
}

// Interface para eventos de usuário
export interface UserEvent {
  userId: string;
  userName: string;
  roomId: string;
  timestamp: string;
}

// Classe para gerenciar conexão Socket.io
class SocketService {
  private socket: Socket | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectDelay = 1000; // 1 segundo

  // Conecta ao servidor Socket.io
  connect(userId: string, userName: string): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        this.socket = io(SOCKET_SERVER_URL, {
          transports: ['websocket', 'polling'],
          reconnection: true,
          reconnectionDelay: this.reconnectDelay,
          reconnectionAttempts: this.maxReconnectAttempts,
          timeout: 20000,
          auth: {
            userId,
            userName
          }
        });

        this.socket.on('connect', () => {
          console.log('✅ Conectado ao servidor Socket.io');
          this.reconnectAttempts = 0;
          resolve();
        });

        this.socket.on('connect_error', (error) => {
          console.warn('⚠️ Erro ao conectar ao Socket.io (modo local será usado):', error.message);
          this.reconnectAttempts++;
          
          // Não rejeitar imediatamente - permitir que continue tentando em background
          // Apenas rejeitar após todas as tentativas falharem
          if (this.reconnectAttempts >= this.maxReconnectAttempts) {
            // Não rejeitar aqui - deixar o timeout do Promise.race fazer isso
            console.warn('⚠️ Todas as tentativas de conexão falharam. Chat funcionará em modo local.');
          }
        });

        this.socket.on('disconnect', (reason) => {
          console.log('🔌 Desconectado do servidor:', reason);
          
          if (reason === 'io server disconnect') {
            // Servidor desconectou, tentar reconectar manualmente
            this.socket?.connect();
          }
        });

        this.socket.on('reconnect', (attemptNumber) => {
          console.log(`🔄 Reconectado após ${attemptNumber} tentativas`);
          this.reconnectAttempts = 0;
        });

        this.socket.on('reconnect_attempt', (attemptNumber) => {
          console.log(`🔄 Tentativa de reconexão ${attemptNumber}/${this.maxReconnectAttempts}`);
        });

        this.socket.on('reconnect_failed', () => {
          console.error('❌ Falha ao reconectar após todas as tentativas');
        });

        this.socket.on('error', (error) => {
          console.error('❌ Erro no socket:', error);
        });
      } catch (error) {
        console.error('❌ Erro ao inicializar socket:', error);
        reject(error);
      }
    });
  }

  // Desconecta do servidor
  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      console.log('🔌 Desconectado do servidor Socket.io');
    }
  }

  // Entra em uma sala (roomId = ID da contratação)
  joinRoom(roomId: string, userId: string, userName: string): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.socket || !this.socket.connected) {
        reject(new Error('Socket não está conectado'));
        return;
      }

      if (!roomId) {
        reject(new Error('roomId é obrigatório'));
        return;
      }

      this.socket.emit('join_room', { roomId, userId, userName });

      // Aguarda confirmação
      const timeout = setTimeout(() => {
        reject(new Error('Timeout ao entrar na sala'));
      }, 5000);

      this.socket.once('joined_room', (data) => {
        clearTimeout(timeout);
        if (data.success) {
          console.log(`✅ Entrou na sala ${roomId}`);
          resolve();
        } else {
          reject(new Error('Falha ao entrar na sala'));
        }
      });

      this.socket.once('error', (error) => {
        clearTimeout(timeout);
        reject(error);
      });
    });
  }

  // Sai de uma sala
  leaveRoom(roomId: string, userId: string, userName: string): void {
    if (!this.socket || !this.socket.connected) {
      console.warn('Socket não está conectado');
      return;
    }

    this.socket.emit('leave_room', { roomId, userId, userName });
    console.log(`👋 Saiu da sala ${roomId}`);
  }

  // Envia uma mensagem
  sendMessage(
    roomId: string,
    message: { id: string; text: string; sender: string; timestamp: string },
    userId: string,
    userName: string
  ): void {
    if (!this.socket || !this.socket.connected) {
      console.error('Socket não está conectado');
      throw new Error('Socket não está conectado');
    }

    if (!roomId || !message.text) {
      throw new Error('roomId e texto da mensagem são obrigatórios');
    }

    this.socket.emit('send_message', {
      roomId,
      message,
      userId,
      userName
    });
  }

  // Marca mensagens como lidas
  markAsRead(roomId: string, messageIds: string[]): void {
    if (!this.socket || !this.socket.connected) {
      console.warn('Socket não está conectado');
      return;
    }

    this.socket.emit('mark_as_read', { roomId, messageIds });
  }

  // Listeners de eventos

  // Escuta novas mensagens
  onMessage(callback: (message: SocketMessage) => void): void {
    if (!this.socket) return;
    this.socket.on('receive_message', callback);
  }

  // Remove listener de mensagens
  offMessage(callback: (message: SocketMessage) => void): void {
    if (!this.socket) return;
    this.socket.off('receive_message', callback);
  }

  // Escuta histórico de mensagens
  onMessageHistory(callback: (data: { roomId: string; messages: SocketMessage[] }) => void): void {
    if (!this.socket) return;
    this.socket.on('message_history', callback);
  }

  // Remove listener de histórico
  offMessageHistory(callback: (data: { roomId: string; messages: SocketMessage[] }) => void): void {
    if (!this.socket) return;
    this.socket.off('message_history', callback);
  }

  // Escuta quando usuário entra na sala
  onUserJoined(callback: (data: UserEvent) => void): void {
    if (!this.socket) return;
    this.socket.on('user_joined', callback);
  }

  // Remove listener de usuário entrou
  offUserJoined(callback: (data: UserEvent) => void): void {
    if (!this.socket) return;
    this.socket.off('user_joined', callback);
  }

  // Escuta quando usuário sai da sala
  onUserLeft(callback: (data: UserEvent) => void): void {
    if (!this.socket) return;
    this.socket.on('user_left', callback);
  }

  // Remove listener de usuário saiu
  offUserLeft(callback: (data: UserEvent) => void): void {
    if (!this.socket) return;
    this.socket.off('user_left', callback);
  }

  // Escuta erros
  onError(callback: (error: { message: string }) => void): void {
    if (!this.socket) return;
    this.socket.on('error', callback);
  }

  // Remove listener de erros
  offError(callback: (error: { message: string }) => void): void {
    if (!this.socket) return;
    this.socket.off('error', callback);
  }

  // Verifica se está conectado
  isConnected(): boolean {
    return this.socket?.connected || false;
  }

  // Obtém o ID do socket
  getSocketId(): string | undefined {
    return this.socket?.id;
  }
}

// Instância singleton
export const socketService = new SocketService();

