import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LogOut, User } from 'lucide-react';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [userName, setUserName] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const checkAuth = () => {
    // Verifica se o usuário está logado
    const token = localStorage.getItem('token');
    const name = localStorage.getItem('userName');
    
    if (token && name) {
      setIsLoggedIn(true);
      setUserName(name);
    } else {
      setIsLoggedIn(false);
      setUserName(null);
    }
  };

  useEffect(() => {
    checkAuth();
    
    // Listener para mudanças no localStorage (quando login/logout acontece em outras abas)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'token' || e.key === 'userName') {
        checkAuth();
      }
    };
    
    // Listener para evento customizado (quando login/logout acontece na mesma aba)
    const handleAuthChange = () => {
      checkAuth();
    };
    
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('auth-change', handleAuthChange);
    
    // Também verifica quando a rota muda
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('auth-change', handleAuthChange);
    };
  }, [location.pathname]); // Atualiza quando a rota muda

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userType');
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    
    // Dispara evento customizado para atualizar outros componentes
    window.dispatchEvent(new Event('auth-change'));
    
    setIsLoggedIn(false);
    setUserName(null);
    navigate('/');
  };

  return (
    <header className="bg-white py-4 px-6 shadow-sm" role="banner">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex flex-col items-center justify-center text-center">
          <button
            onClick={() => navigate('/')}
            className="hover:opacity-80 transition-opacity duration-200 focus:outline-none focus:ring-2 focus:ring-[#0056a4] focus:ring-offset-2 rounded-lg"
            aria-label="Voltar para página inicial"
          >
            <img 
              src="/lovable-uploads/ae6d71a7-8de9-40f0-a34b-848a22c94d66.png" 
              alt="Amigo Cuidador Logo" 
              className="h-14 w-auto max-h-16 md:h-16 md:max-h-20 lg:h-20 lg:max-h-24 mb-2"
            />
          </button>
          <span className="text-[#0056a4] text-base md:text-lg lg:text-xl font-semibold tracking-wide">Cuidando de quem sempre cuidou de você</span>
        </div>
        
        <nav className="flex items-center space-x-6" role="navigation" aria-label="Menu principal">
          <a 
            href="/" 
            className={`text-[#0056a4] hover:text-[#003d74] text-xl focus:outline-none focus:ring-2 focus:ring-[#0056a4] focus:ring-offset-2 rounded-md ${location.pathname === '/' ? 'font-bold border-b-2 border-[#0056a4]' : ''}`}
            aria-current={location.pathname === '/' ? 'page' : undefined}
          >
            Início
          </a>
          <a 
            href="/servicos" 
            className={`text-[#0056a4] hover:text-[#003d74] text-xl focus:outline-none focus:ring-2 focus:ring-[#0056a4] focus:ring-offset-2 rounded-md ${location.pathname === '/servicos' ? 'font-bold border-b-2 border-[#0056a4]' : ''}`}
            aria-current={location.pathname === '/servicos' ? 'page' : undefined}
          >
            Serviços
          </a>
          <a 
            href="/sobre-nos" 
            className={`text-[#0056a4] hover:text-[#003d74] text-xl focus:outline-none focus:ring-2 focus:ring-[#0056a4] focus:ring-offset-2 rounded-md ${location.pathname === '/sobre-nos' ? 'font-bold border-b-2 border-[#0056a4]' : ''}`}
            aria-current={location.pathname === '/sobre-nos' ? 'page' : undefined}
          >
            Sobre nós
          </a>
          <a 
            href="/avaliacoes" 
            className={`text-[#0056a4] hover:text-[#003d74] text-xl focus:outline-none focus:ring-2 focus:ring-[#0056a4] focus:ring-offset-2 rounded-md ${location.pathname === '/avaliacoes' ? 'font-bold border-b-2 border-[#0056a4]' : ''}`}
            aria-current={location.pathname === '/avaliacoes' ? 'page' : undefined}
          >
            Avaliações
          </a>
          
          {isLoggedIn ? (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-[#0056a4]">
                <User size={20} />
                <span className="text-xl font-medium">Olá, {userName}</span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-[#0056a4] hover:text-[#003d74] text-xl focus:outline-none focus:ring-2 focus:ring-[#0056a4] focus:ring-offset-2 rounded-md px-3 py-2 hover:bg-gray-100 transition-colors"
                aria-label="Sair da conta"
              >
                <LogOut size={20} />
                Sair
              </button>
            </div>
          ) : (
            <>
              <button
                onClick={() => navigate('/tipo-cadastro')}
                className="bg-[#0056a4] text-white px-6 py-3 rounded-lg hover:bg-[#004483] transition-colors text-xl focus:outline-none focus:ring-2 focus:ring-[#0056a4] focus:ring-offset-2"
                aria-label="Cadastrar-se no Amigo Cuidador"
              >
                Cadastre-se
              </button>
              <button
                onClick={() => navigate('/login')}
                className="flex items-center gap-2 text-[#0056a4] hover:text-[#003d74] text-xl focus:outline-none focus:ring-2 focus:ring-[#0056a4] focus:ring-offset-2 rounded-md"
                aria-label="Entrar na sua conta"
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
                  aria-hidden="true"
                >
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
                Entrar
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;

