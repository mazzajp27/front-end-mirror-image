# Implementação de Chat em Tempo Real com Socket.io

Este documento descreve a implementação do sistema de chat em tempo real usando Socket.io.

## 📋 Estrutura da Implementação

### Backend (Servidor Socket.io)
- **Localização**: `server/`
- **Arquivos principais**:
  - `server.js` - Servidor Express com Socket.io
  - `package.json` - Dependências do servidor

### Frontend (Cliente React)
- **Arquivos modificados/criados**:
  - `src/services/socket.ts` - Serviço de gerenciamento de Socket.io
  - `src/pages/MessagesPage.tsx` - Página de mensagens integrada com Socket.io

## 🚀 Como Executar

### 1. Instalar Dependências do Backend

```bash
cd server
npm install
```

### 2. Configurar Variáveis de Ambiente do Backend

Crie um arquivo `.env` na pasta `server/`:

```env
PORT=3001
CLIENT_URL=http://localhost:8080
```

### 3. Iniciar o Servidor Backend

```bash
cd server
npm start
# ou para desenvolvimento com auto-reload:
npm run dev
```

O servidor estará rodando em `http://localhost:3001`

### 4. Configurar Frontend (Opcional)

Se o servidor Socket.io estiver em uma URL diferente, crie um arquivo `.env` na raiz do projeto:

```env
VITE_SOCKET_URL=http://localhost:3001
```

### 5. Iniciar o Frontend

```bash
npm run dev
```

O frontend estará rodando em `http://localhost:8080`

## 🔧 Funcionalidades Implementadas

### ✅ Comunicação em Tempo Real
- Conexão WebSocket usando Socket.io
- Envio e recebimento de mensagens em tempo real
- Sistema de salas (Rooms) baseado no ID da contratação

### ✅ Sistema de Salas
- Cada conversa usa o ID da contratação como `roomId`
- Usuários entram automaticamente na sala ao selecionar uma conversa
- Mensagens são distribuídas apenas para usuários na mesma sala

### ✅ Tratamento de Erros
- Reconexão automática em caso de desconexão
- Indicadores visuais de status de conexão
- Mensagens de erro amigáveis ao usuário
- Validação de dados antes de enviar mensagens

### ✅ Persistência (Opcional)
- Backend armazena mensagens em memória (últimas 1000 por sala)
- Endpoint HTTP para buscar histórico de mensagens
- Endpoint HTTP para salvar mensagens (pode ser integrado com banco de dados)

## 📡 Eventos Socket.io

### Cliente → Servidor

| Evento | Descrição | Payload |
|--------|-----------|---------|
| `join_room` | Entrar em uma sala | `{ roomId, userId, userName }` |
| `send_message` | Enviar mensagem | `{ roomId, message, userId, userName }` |
| `mark_as_read` | Marcar mensagens como lidas | `{ roomId, messageIds }` |
| `leave_room` | Sair de uma sala | `{ roomId, userId, userName }` |

### Servidor → Cliente

| Evento | Descrição | Payload |
|--------|-----------|---------|
| `joined_room` | Confirmação de entrada | `{ roomId, success }` |
| `receive_message` | Nova mensagem recebida | `SocketMessage` |
| `message_history` | Histórico de mensagens | `{ roomId, messages }` |
| `user_joined` | Usuário entrou na sala | `UserEvent` |
| `user_left` | Usuário saiu da sala | `UserEvent` |
| `messages_read` | Mensagens marcadas como lidas | `{ roomId, messageIds }` |
| `error` | Erro ocorrido | `{ message }` |

## 🔐 Autenticação

Atualmente, o sistema usa IDs temporários armazenados no `localStorage`. Em produção, você deve:

1. Integrar com seu sistema de autenticação
2. Passar o token de autenticação no handshake do Socket.io
3. Validar o token no servidor antes de permitir conexão

## 💾 Persistência no Banco de Dados

Para persistir mensagens no banco de dados, você pode:

1. **Modificar o servidor** (`server/server.js`):
   - Adicionar conexão com banco de dados (PostgreSQL, MongoDB, etc.)
   - Salvar mensagens no evento `send_message`
   - Buscar histórico do banco ao invés de memória

2. **Exemplo de integração**:
```javascript
// No evento send_message do servidor
const fullMessage = { /* ... */ };

// Salvar no banco de dados
await db.messages.create({
  id: fullMessage.id,
  text: fullMessage.text,
  sender: fullMessage.sender,
  roomId: fullMessage.roomId,
  timestamp: fullMessage.timestamp,
  isRead: false
});

// Enviar para a sala
io.to(roomId).emit('receive_message', fullMessage);
```

## 🐛 Tratamento de Erros

O sistema inclui tratamento robusto de erros:

- **Reconexão automática**: Até 5 tentativas com delay progressivo
- **Validação de dados**: Verifica se dados obrigatórios estão presentes
- **Feedback visual**: Indicadores de conexão no header
- **Mensagens de erro**: Toast notifications para o usuário
- **Logs detalhados**: Console logs para debugging

## 📝 Notas Importantes

1. **ID da Contratação**: O `roomId` usado nas salas é o ID da conversa, que deve corresponder ao ID da contratação no seu sistema.

2. **Limite de Mensagens**: O servidor mantém apenas as últimas 1000 mensagens por sala em memória. Para histórico completo, use banco de dados.

3. **Escalabilidade**: Para múltiplos servidores, você precisará usar um adapter como `socket.io-redis` para compartilhar eventos entre servidores.

4. **Segurança**: Em produção, adicione:
   - Autenticação/autorização
   - Rate limiting
   - Validação de entrada mais rigorosa
   - HTTPS/WSS

## 🧪 Testando

1. Abra duas abas do navegador
2. Acesse `/mensagens` em ambas
3. Selecione a mesma conversa em ambas as abas
4. Envie uma mensagem de uma aba
5. A mensagem deve aparecer em tempo real na outra aba

## 📚 Recursos Adicionais

- [Documentação Socket.io](https://socket.io/docs/)
- [Socket.io Client API](https://socket.io/docs/v4/client-api/)
- [Socket.io Server API](https://socket.io/docs/v4/server-api/)

