# Servidor de Chat com Socket.io

Servidor Node.js para comunicação em tempo real usando Socket.io.

## Instalação

```bash
npm install
```

## Configuração

1. Copie o arquivo `.env.example` para `.env`
2. Configure as variáveis de ambiente:
   - `PORT`: Porta do servidor (padrão: 3001)
   - `CLIENT_URL`: URL do cliente frontend (padrão: http://localhost:8080)

## Execução

### Desenvolvimento
```bash
npm run dev
```

### Produção
```bash
npm start
```

## Endpoints HTTP

- `GET /health` - Health check do servidor
- `GET /api/messages/:roomId` - Buscar histórico de mensagens de uma sala
- `POST /api/messages` - Salvar mensagem (para persistência)

## Eventos Socket.io

### Cliente -> Servidor

- `join_room` - Entrar em uma sala (roomId = ID da contratação)
- `send_message` - Enviar mensagem
- `mark_as_read` - Marcar mensagens como lidas
- `leave_room` - Sair de uma sala

### Servidor -> Cliente

- `joined_room` - Confirmação de entrada na sala
- `receive_message` - Nova mensagem recebida
- `message_history` - Histórico de mensagens
- `user_joined` - Usuário entrou na sala
- `user_left` - Usuário saiu da sala
- `messages_read` - Mensagens marcadas como lidas
- `error` - Erro ocorrido

## Estrutura de Mensagem

```javascript
{
  id: string,
  text: string,
  sender: string, // userId
  senderName: string,
  timestamp: string, // ISO 8601
  roomId: string,
  isRead: boolean
}
```

