import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { MessageCircle, Search, MoreVertical, User, Send, Wifi, WifiOff, Mail, Phone, MapPin } from 'lucide-react';
import { toast } from 'sonner';
import { socketService, SocketMessage } from '../services/socket';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

interface Message {
  id: string;
  text: string;
  sender: 'me' | 'other';
  timestamp: string;
  isRead: boolean;
}

interface Conversation {
  id: string;
  name: string;
  role: 'Cuidador' | 'Familia' | 'Paciente';
  lastMessage: string;
  timestamp: string;
  lastMessageTimestamp: number; // Timestamp numérico para ordenação
  unread?: number;
  messages: Message[];
}

const MessagesPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [currentUserId] = useState(() => {
    // Em produção, isso viria do contexto de autenticação
    // Por enquanto, usamos um ID temporário baseado no localStorage
    try {
      const storedUserId = localStorage.getItem('userId');
      if (storedUserId) return storedUserId;
      const newUserId = `user-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
      localStorage.setItem('userId', newUserId);
      return newUserId;
    } catch (error) {
      // Se localStorage não estiver disponível, usar ID temporário
      return `user-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
    }
  });
  const [currentUserName] = useState(() => {
    // Em produção, isso viria do contexto de autenticação
    try {
      return localStorage.getItem('userName') || 'Usuário';
    } catch (error) {
      return 'Usuário';
    }
  });
  const currentRoomRef = useRef<string | null>(null);
  
  // Função auxiliar para obter timestamp numérico de uma string de hora
  const getTimestampFromTime = (timeString: string): number => {
    try {
      // Se for formato HH:MM, criar data de hoje com essa hora
      if (timeString.includes(':')) {
        const [hours, minutes] = timeString.split(':').map(Number);
        const today = new Date();
        today.setHours(hours, minutes, 0, 0);
        return today.getTime();
      }
      // Se for ISO string, converter diretamente
      return new Date(timeString).getTime();
    } catch {
      return Date.now();
    }
  };
  
  // Conversas padrão (usadas apenas se não houver conversas salvas)
  const defaultConversations: Conversation[] = [
    {
      id: '1',
      name: 'Maria Santos',
      role: 'Cuidador',
      lastMessage: 'Boa tarde! Como está a medicação hoje',
      timestamp: '14:30',
      lastMessageTimestamp: getTimestampFromTime('14:30'),
      unread: 2,
      messages: [
        {
          id: '1-1',
          text: 'Olá! Como está se sentindo hoje?',
          sender: 'other',
          timestamp: '14:00',
          isRead: true
        },
        {
          id: '1-2',
          text: 'Estou bem, obrigada! E você?',
          sender: 'me',
          timestamp: '14:15',
          isRead: true
        },
        {
          id: '1-3',
          text: 'Boa tarde! Como está a medicação hoje',
          sender: 'other',
          timestamp: '14:30',
          isRead: false
        }
      ]
    },
    {
      id: '2',
      name: 'Dr. João Silva',
      role: 'Cuidador',
      lastMessage: 'Vou passar para uma visita na proxima',
      timestamp: '13:45',
      lastMessageTimestamp: getTimestampFromTime('13:45'),
      unread: 1,
      messages: [
        {
          id: '2-1',
          text: 'Bom dia! Como foi a noite?',
          sender: 'other',
          timestamp: '13:30',
          isRead: true
        },
        {
          id: '2-2',
          text: 'Vou passar para uma visita na proxima',
          sender: 'other',
          timestamp: '13:45',
          isRead: false
        }
      ]
    },
    {
      id: '3',
      name: 'Ana Costa(Filha)',
      role: 'Familia',
      lastMessage: 'Obrigada pelo cuidado com a mamãe',
      timestamp: '12:20',
      lastMessageTimestamp: getTimestampFromTime('12:20'),
      unread: 0,
      messages: [
        {
          id: '3-1',
          text: 'Obrigada pelo cuidado com a mamãe',
          sender: 'other',
          timestamp: '12:20',
          isRead: true
        }
      ]
    },
    {
      id: '4',
      name: 'Dona Carmen',
      role: 'Paciente',
      lastMessage: 'Já tomei o remédio, obrigada!',
      timestamp: '11:15',
      lastMessageTimestamp: getTimestampFromTime('11:15'),
      unread: 0,
      messages: [
        {
          id: '4-1',
          text: 'Já tomei o remédio, obrigada!',
          sender: 'other',
          timestamp: '11:15',
          isRead: true
        }
      ]
    },
    {
      id: '5',
      name: 'Dona Claudia',
      role: 'Familia',
      lastMessage: 'Acabei de voltar do hospital!',
      timestamp: '10:30',
      lastMessageTimestamp: getTimestampFromTime('10:30'),
      unread: 0,
      messages: [
        {
          id: '5-1',
          text: 'Acabei de voltar do hospital!',
          sender: 'other',
          timestamp: '10:30',
          isRead: true
        }
      ]
    }
  ];

  // Função para carregar conversas do localStorage
  const loadConversationsFromStorage = (): Conversation[] => {
    try {
      const saved = localStorage.getItem('chatConversations');
      if (saved) {
        const parsed = JSON.parse(saved);
        // Validar se é um array válido
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Garantir que todas as conversas tenham lastMessageTimestamp
          return parsed.map(conv => {
            if (!conv.lastMessageTimestamp) {
              // Se não tiver timestamp, calcular a partir do timestamp string ou da última mensagem
              if (conv.messages && conv.messages.length > 0) {
                const lastMsg = conv.messages[conv.messages.length - 1];
                conv.lastMessageTimestamp = getTimestampFromTime(lastMsg.timestamp);
              } else {
                conv.lastMessageTimestamp = getTimestampFromTime(conv.timestamp);
              }
            }
            return conv;
          });
        }
      }
    } catch (error) {
      console.warn('Erro ao carregar conversas do localStorage:', error);
    }
    // Se não houver conversas salvas ou houver erro, usar as padrão
    return defaultConversations;
  };

  // Função para salvar conversas no localStorage
  const saveConversationsToStorage = (convs: Conversation[]) => {
    try {
      localStorage.setItem('chatConversations', JSON.stringify(convs));
    } catch (error) {
      console.warn('Erro ao salvar conversas no localStorage:', error);
    }
  };

  // Inicializar conversas do localStorage ou usar as padrão
  const [conversations, setConversations] = useState<Conversation[]>(() => {
    return loadConversationsFromStorage();
  });
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Salvar conversas no localStorage sempre que houver mudanças
  useEffect(() => {
    // Não salvar na primeira renderização (já foi carregado do storage)
    // Apenas salvar quando houver mudanças reais
    if (conversations.length > 0) {
      saveConversationsToStorage(conversations);
    }
  }, [conversations]);

  // Formatar timestamp
  const formatTimestamp = useCallback((timestamp: string): string => {
    try {
      const date = new Date(timestamp);
      return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
    } catch {
      return new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    }
  }, []);

  // Handler para receber mensagens
  const handleReceiveMessage = useCallback((socketMessage: SocketMessage) => {
    // Converter mensagem do socket para formato local
    const isFromMe = socketMessage.sender === currentUserId;
    
    const message: Message = {
      id: socketMessage.id,
      text: socketMessage.text,
      sender: isFromMe ? 'me' : 'other',
      timestamp: formatTimestamp(socketMessage.timestamp),
      isRead: socketMessage.isRead
    };

    setConversations(prev => {
      const conversation = prev.find(conv => conv.id === socketMessage.roomId);
      
      if (!conversation) {
        // Se a conversa não existe, criar uma nova
        return prev;
      }

      // Verificar se a mensagem já existe (evitar duplicatas)
      const messageExists = conversation.messages.some(msg => msg.id === message.id);
      if (messageExists) {
        return prev;
      }

      // Obter timestamp numérico da mensagem
      const messageTimestamp = new Date(socketMessage.timestamp).getTime();

      const updated = prev.map(conv =>
        conv.id === socketMessage.roomId
          ? {
              ...conv,
              messages: [...conv.messages, message],
              lastMessage: message.text,
              timestamp: message.timestamp,
              lastMessageTimestamp: messageTimestamp,
              unread: conv.id === selectedConversation ? 0 : (conv.unread || 0) + 1
            }
          : conv
      );
      
      // Ordenar após atualizar para garantir que a conversa atualizada suba
      return updated.sort((a, b) => {
        const aUnread = a.unread || 0;
        const bUnread = b.unread || 0;
        if (aUnread > 0 && bUnread === 0) return -1;
        if (aUnread === 0 && bUnread > 0) return 1;
        return b.lastMessageTimestamp - a.lastMessageTimestamp;
      });
    });
  }, [currentUserId, selectedConversation, formatTimestamp]);

  // Handler para histórico de mensagens
  const handleMessageHistory = useCallback((data: { roomId: string; messages: SocketMessage[] }) => {
    const messages: Message[] = data.messages.map(socketMsg => ({
      id: socketMsg.id,
      text: socketMsg.text,
      sender: socketMsg.sender === currentUserId ? 'me' : 'other',
      timestamp: formatTimestamp(socketMsg.timestamp),
      isRead: socketMsg.isRead
    }));

    setConversations(prev =>
      prev.map(conv =>
        conv.id === data.roomId
          ? {
              ...conv,
              messages: messages
            }
          : conv
      )
    );
  }, [currentUserId, formatTimestamp]);

  // Handler para erros do socket
  const handleSocketError = useCallback((error: { message: string }) => {
    console.error('Erro do Socket.io:', error);
    toast.error(error.message || 'Erro na conexão com o servidor');
  }, []);

  // Configurar listeners do Socket.io
  const setupSocketListeners = useCallback(() => {
    socketService.onMessage(handleReceiveMessage);
    socketService.onMessageHistory(handleMessageHistory);
    socketService.onError(handleSocketError);
  }, [handleReceiveMessage, handleMessageHistory, handleSocketError]);

  // Conectar ao Socket.io quando o componente montar (opcional - não bloqueia a UI)
  useEffect(() => {
    let mounted = true;
    let timeoutId: NodeJS.Timeout | null = null;
    let connectTimeout: NodeJS.Timeout | null = null;

    const connectSocket = async () => {
      if (!mounted) return;
      
      try {
        setIsConnecting(true);
        
        // Timeout de 2 segundos para conexão
        const connectionPromise = socketService.connect(currentUserId, currentUserName);
        const timeoutPromise = new Promise<never>((_, reject) => {
          timeoutId = setTimeout(() => reject(new Error('Timeout de conexão')), 2000);
        });
        
        await Promise.race([connectionPromise, timeoutPromise]);
        
        if (mounted && timeoutId) {
          clearTimeout(timeoutId);
          timeoutId = null;
          setIsConnected(true);
          setIsConnecting(false);
          
          // Configurar listeners
          setupSocketListeners();
        }
      } catch (error) {
        // Silenciosamente falhar - não mostrar erro ao usuário
        if (mounted) {
          setIsConnected(false);
          setIsConnecting(false);
        }
        if (timeoutId) {
          clearTimeout(timeoutId);
          timeoutId = null;
        }
      }
    };

    // Tentar conectar em background após um delay, mas não bloquear se falhar
    connectTimeout = setTimeout(() => {
      if (mounted) {
        connectSocket();
      }
    }, 2000); // Delay maior para garantir que a página renderize primeiro

    // Cleanup ao desmontar
    return () => {
      mounted = false;
      if (connectTimeout) {
        clearTimeout(connectTimeout);
      }
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      
      // Sair da sala atual se houver
      if (currentRoomRef.current && socketService && socketService.isConnected()) {
        try {
          socketService.leaveRoom(currentRoomRef.current, currentUserId, currentUserName);
        } catch (error) {
          // Ignorar erros no cleanup
        }
      }
      // Remover listeners
      if (socketService) {
        try {
          socketService.offMessage(handleReceiveMessage);
          socketService.offMessageHistory(handleMessageHistory);
          socketService.offError(handleSocketError);
          socketService.disconnect();
        } catch (error) {
          // Ignorar erros no cleanup
        }
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Executar apenas uma vez ao montar

  // Entrar na sala quando uma conversa for selecionada e estiver conectado
  useEffect(() => {
    if (selectedConversation && isConnected && socketService.isConnected()) {
      socketService.joinRoom(selectedConversation, currentUserId, currentUserName)
        .then(() => {
          currentRoomRef.current = selectedConversation;
        })
        .catch((error) => {
          console.warn('Erro ao entrar na sala:', error);
        });
    }
  }, [selectedConversation, isConnected, currentUserId, currentUserName]);

  // Handle URL parameters for new conversations
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const cuidadorId = urlParams.get('cuidadorId');
    const cuidadorName = urlParams.get('cuidadorName');
    const cuidadorRole = urlParams.get('cuidadorRole');

    if (cuidadorId && cuidadorName && cuidadorRole) {
      // Check if conversation already exists
      setConversations(prev => {
        const existingConversation = prev.find(conv => conv.id === cuidadorId);
        
        if (!existingConversation) {
          // Create new conversation
          const now = new Date();
          const timestampString = now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
          const timestampNumber = now.getTime();
          
          const newConversation: Conversation = {
            id: cuidadorId,
            name: cuidadorName,
            role: cuidadorRole as 'Cuidador' | 'Familia' | 'Paciente',
            lastMessage: 'Conversa iniciada',
            timestamp: timestampString,
            lastMessageTimestamp: timestampNumber,
            unread: 0,
            messages: [
              {
                id: `${cuidadorId}-welcome`,
                text: `Olá! Iniciamos uma conversa. Como posso ajudá-lo(a)?`,
                sender: 'other',
                timestamp: timestampString,
                isRead: false
              }
            ]
          };

          // Use setTimeout to ensure state update happens after render
          setTimeout(() => {
            setSelectedConversation(cuidadorId);
          }, 0);

          return [newConversation, ...prev];
        } else {
          // Conversation exists, select it
          setTimeout(() => {
            setSelectedConversation(cuidadorId);
          }, 0);
          return prev;
        }
      });

      // Clean URL parameters
      navigate('/mensagens', { replace: true });
    }
  }, [location.search, navigate]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [selectedConversation, conversations]);

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'Cuidador':
        return 'bg-blue-100 text-blue-800';
      case 'Familia':
        return 'bg-green-100 text-green-800';
      case 'Paciente':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedConversation) return;

    const messageId = `msg-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
    const now = new Date();
    const timestamp = now.toISOString();

    // Criar mensagem local
    const newMsg: Message = {
      id: messageId,
      text: newMessage.trim(),
      sender: 'me',
      timestamp: formatTimestamp(timestamp),
      isRead: true
    };

    // Adicionar mensagem localmente imediatamente
    const messageTimestamp = now.getTime();
    setConversations(prev => {
      // Criar novo array para garantir que o React detecte a mudança
      const updated = prev.map(conv => 
        conv.id === selectedConversation 
          ? {
              ...conv,
              messages: [...conv.messages, newMsg],
              lastMessage: newMessage.trim(),
              timestamp: formatTimestamp(timestamp),
              lastMessageTimestamp: messageTimestamp,
              unread: 0
            }
          : conv
      );
      // Ordenar após atualizar para garantir que a conversa atualizada suba
      return updated.sort((a, b) => {
        const aUnread = a.unread || 0;
        const bUnread = b.unread || 0;
        if (aUnread > 0 && bUnread === 0) return -1;
        if (aUnread === 0 && bUnread > 0) return 1;
        return b.lastMessageTimestamp - a.lastMessageTimestamp;
      });
    });

    setNewMessage('');

    // Tentar enviar via Socket.io se estiver conectado
    if (isConnected && socketService && socketService.isConnected()) {
      try {
        socketService.sendMessage(
          selectedConversation, // roomId = ID da contratação
          {
            id: messageId,
            text: newMessage.trim(),
            sender: currentUserId,
            timestamp
          },
          currentUserId,
          currentUserName
        );
      } catch (error) {
        console.warn('Erro ao enviar mensagem via Socket.io (mensagem salva localmente):', error);
        // Mensagem já foi adicionada localmente, então não precisa fazer nada
      }
    }
    // Se não estiver conectado, a mensagem já foi salva localmente acima
  };

  const handleConversationSelect = async (conversationId: string) => {
    // Sair da sala anterior se houver
    if (currentRoomRef.current && currentRoomRef.current !== conversationId && socketService.isConnected()) {
      try {
        socketService.leaveRoom(currentRoomRef.current, currentUserId, currentUserName);
      } catch (error) {
        console.warn('Erro ao sair da sala:', error);
      }
    }

    setSelectedConversation(conversationId);
    currentRoomRef.current = conversationId;
    
    // Marcar mensagens como lidas
    setConversations(prev => 
      prev.map(conv => 
        conv.id === conversationId 
          ? {
              ...conv,
              unread: 0,
              messages: conv.messages.map(msg => ({ ...msg, isRead: true }))
            }
          : conv
      )
    );

    // Entrar na nova sala (roomId = ID da contratação/conversa) se estiver conectado
    if (isConnected && socketService.isConnected()) {
      try {
        await socketService.joinRoom(conversationId, currentUserId, currentUserName);
      } catch (error) {
        console.warn('Erro ao entrar na sala (continuando em modo local):', error);
        // Não bloquear - permitir funcionamento local
      }
    }
  };

  const getCurrentConversation = () => {
    return conversations.find(conv => conv.id === selectedConversation);
  };

  // Ordenar conversas por última mensagem (mais recente primeiro)
  const sortedConversations = useMemo(() => {
    return [...conversations].sort((a, b) => {
      // Conversas com mensagens não lidas têm prioridade
      const aUnread = a.unread || 0;
      const bUnread = b.unread || 0;
      
      if (aUnread > 0 && bUnread === 0) return -1;
      if (aUnread === 0 && bUnread > 0) return 1;
      
      // Se ambas têm ou não têm não lidas, ordenar por timestamp
      return b.lastMessageTimestamp - a.lastMessageTimestamp;
    });
  }, [conversations]);

  // Filter conversations based on search query
  const filteredConversations = useMemo(() => {
    return sortedConversations.filter(conversation => {
      if (!searchQuery.trim()) return true;
      
      const query = searchQuery.toLowerCase().trim();
      const nameMatch = conversation.name.toLowerCase().includes(query);
      const roleMatch = conversation.role.toLowerCase().includes(query);
      const messageMatch = conversation.lastMessage.toLowerCase().includes(query);
      
      return nameMatch || roleMatch || messageMatch;
    });
  }, [sortedConversations, searchQuery]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleOpenProfile = (e: React.MouseEvent) => {
    e.stopPropagation(); // Evitar que o clique abra a conversa
    setIsProfileOpen(true);
  };

  const getCurrentConversationUser = () => {
    return conversations.find(c => c.id === selectedConversation);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 -ml-2">
              <button
                onClick={handleBackToHome}
                className="text-[#0056a4] hover:text-[#004483] p-2 rounded-lg hover:bg-gray-100 transition-colors"
                aria-label="Voltar para página inicial"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="M19 12H5M12 19l-7-7 7-7"/>
                </svg>
              </button>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Conversas</h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                {isConnected ? (
                  <Wifi size={28} className="text-green-500" title="Conectado" />
                ) : isConnecting ? (
                  <div className="w-7 h-7 border-2 border-[#0056a4] border-t-transparent rounded-full animate-spin" title="Conectando..." />
                ) : (
                  <WifiOff size={28} className="text-red-500" title="Desconectado" />
                )}
              </div>
              <img 
                src="/lovable-uploads/ae6d71a7-8de9-40f0-a34b-848a22c94d66.png" 
                alt="Amigo Cuidador Logo" 
                className="h-12 md:h-16"
              />
              <span className="text-[#0056a4] font-semibold text-lg md:text-xl">AMIGO CUIDADOR</span>
            </div>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-80px)]">
        {/* Left Sidebar - Conversations */}
        <div className="w-1/3 bg-white border-r border-gray-200 flex flex-col">
          {/* Search Bar */}
          <div className="p-4 border-b border-gray-200">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Buscar conversas..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0056a4] focus:border-transparent"
              />
            </div>
          </div>

          {/* Conversations List */}
          <div className="flex-1 overflow-y-auto">
            {filteredConversations.length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                <p>Nenhuma conversa encontrada</p>
                <p className="text-sm">Tente uma busca diferente</p>
              </div>
            ) : (
              filteredConversations.map((conversation) => (
              <div
                key={conversation.id}
                onClick={() => handleConversationSelect(conversation.id)}
                className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                  selectedConversation === conversation.id ? 'bg-blue-50 border-l-4 border-l-[#0056a4]' : ''
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="relative">
                    <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                      <User size={24} className="text-gray-500" />
                    </div>
                    {conversation.unread && (
                      <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {conversation.unread}
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold text-gray-900 truncate">{conversation.name}</h3>
                      <span className="text-xs text-gray-500">{conversation.timestamp}</span>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`px-2 py-1 text-xs rounded-full ${getRoleColor(conversation.role)}`}>
                        {conversation.role}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 truncate">{conversation.lastMessage}</p>
                  </div>
                </div>
              </div>
              ))
            )}
          </div>
        </div>

        {/* Right Section - Chat Area */}
        <div className="flex-1 bg-white flex items-center justify-center">
          {!selectedConversation ? (
            <div className="text-center">
              <div className="relative mb-6">
                <div className="w-24 h-24 bg-[#0056a4] rounded-full flex items-center justify-center mx-auto">
                  <MessageCircle size={40} className="text-white" />
                </div>
                <div className="absolute -top-1 -right-1 bg-white text-[#0056a4] text-xs rounded-full w-6 h-6 flex items-center justify-center border-2 border-[#0056a4]">
                  1
                </div>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Selecione uma conversa</h2>
              <p className="text-gray-600 max-w-md">
                Escolha uma conversa para começar a conversa com cuidadores, familiares ou pacientes
              </p>
            </div>
          ) : (
            <div className="w-full h-full flex flex-col">
              {/* Chat Header */}
              <div className="p-4 border-b border-gray-200 bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                      <User size={20} className="text-gray-500" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {conversations.find(c => c.id === selectedConversation)?.name}
                      </h3>
                      <span className="text-sm text-gray-500">
                        {conversations.find(c => c.id === selectedConversation)?.role}
                      </span>
                    </div>
                  </div>
                  <button 
                    onClick={handleOpenProfile}
                    className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                    title="Ver perfil"
                  >
                    <MoreVertical size={20} />
                  </button>
                </div>
              </div>

              {/* Chat Messages Area */}
              <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
                <div className="space-y-4">
                  {getCurrentConversation()?.messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                          message.sender === 'me'
                            ? 'bg-[#0056a4] text-white'
                            : 'bg-white text-gray-900 border border-gray-200'
                        }`}
                      >
                        <p className="text-sm">{message.text}</p>
                        <p className={`text-xs mt-1 ${
                          message.sender === 'me' ? 'text-blue-100' : 'text-gray-500'
                        }`}>
                          {message.timestamp}
                        </p>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              </div>

              {/* Message Input */}
              <div className="p-4 border-t border-gray-200 bg-white">
                {!isConnected && !isConnecting && (
                  <div className="mb-2 p-2 bg-blue-50 border border-blue-200 rounded text-sm text-blue-800">
                    💡 Modo local: mensagens serão salvas apenas localmente. Para chat em tempo real, inicie o servidor Socket.io.
                  </div>
                )}
                {isConnecting && (
                  <div className="mb-2 p-2 bg-yellow-50 border border-yellow-200 rounded text-sm text-yellow-800">
                    🔄 Conectando ao servidor...
                  </div>
                )}
                <form onSubmit={handleSendMessage} className="flex gap-2">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Digite sua mensagem..."
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0056a4] focus:border-transparent"
                  />
                  <button 
                    type="submit"
                    disabled={!newMessage.trim()}
                    className="px-4 py-2 bg-[#0056a4] text-white rounded-lg hover:bg-[#004483] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    <Send size={16} />
                    Enviar
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Dialog de Perfil do Usuário */}
      <Dialog open={isProfileOpen} onOpenChange={setIsProfileOpen}>
        <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto bg-white">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-gray-900">
              Perfil do Usuário
            </DialogTitle>
            <DialogDescription className="text-gray-600">
              Informações do contato
            </DialogDescription>
          </DialogHeader>
          
          {getCurrentConversationUser() && (
            <div className="space-y-6 py-4">
              {/* Avatar e Nome */}
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 bg-[#0056a4] rounded-full flex items-center justify-center flex-shrink-0">
                  <User size={40} className="text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-xl font-semibold text-gray-900 truncate">
                    {getCurrentConversationUser()?.name}
                  </h3>
                  <span className={`inline-block px-3 py-1 text-sm rounded-full mt-2 ${getRoleColor(getCurrentConversationUser()?.role || '')}`}>
                    {getCurrentConversationUser()?.role}
                  </span>
                </div>
              </div>

              {/* Informações */}
              <div className="space-y-4 border-t border-gray-200 pt-4">
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="text-gray-900 break-words">
                      {getCurrentConversationUser()?.name.toLowerCase().replace(/\s+/g, '.')}@exemplo.com
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-500">Telefone</p>
                    <p className="text-gray-900">(00) 00000-0000</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-500">Localização</p>
                    <p className="text-gray-900">Brasil</p>
                  </div>
                </div>
              </div>

              {/* Estatísticas da Conversa */}
              <div className="border-t border-gray-200 pt-4">
                <h4 className="text-sm font-semibold text-gray-700 mb-3">Estatísticas da Conversa</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                    <p className="text-2xl font-bold text-[#0056a4]">
                      {getCurrentConversationUser()?.messages.length || 0}
                    </p>
                    <p className="text-xs text-gray-600 mt-1">Mensagens</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                    <p className="text-2xl font-bold text-[#0056a4]">
                      {getCurrentConversationUser()?.unread || 0}
                    </p>
                    <p className="text-xs text-gray-600 mt-1">Não lidas</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MessagesPage;
