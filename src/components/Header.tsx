import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LogOut, User } from 'lucide-react';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // --- Autenticação (sua versão) ---
  const [userName, setUserName] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const checkAuth = () => {
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

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'token' || e.key === 'userName') checkAuth();
    };

    const handleAuthChange = () => {
      checkAuth();
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('auth-change', handleAuthChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('auth-change', handleAuthChange);
    };
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userType');
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    window.dispatchEvent(new Event('auth-change'));
    setIsLoggedIn(false);
    setUserName(null);
    navigate('/');
  };

  // --- JSX ---
  return (
    <header className="bg-white border-b border-gray-100" role="banner">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between py-3 sm:py-4 md:py-5 gap-4 md:gap-6 lg:gap-8">

          {/* LOGO */}
          <div className="flex items-center gap-3 flex-shrink-0 mr-4 md:mr-6 lg:mr-8">
            <button
              onClick={() => navigate('/')}
              className="hover:opacity-80 transition-opacity duration-200 focus:outline-none focus:ring-2 focus:ring-[#0056a4] focus:ring-offset-2 rounded-lg"
              aria-label="Voltar para página inicial"
            >
              <img
                src="/lovable-uploads/ae6d71a7-8de9-40f0-a34b-848a22c94d66.png"
                alt="Amigo Cuidador Logo"
                className="h-12 sm:h-14 md:h-16 lg:h-20 xl:h-24 w-auto"
              />
            </button>

            <span className="text-[#0056a4] text-sm md:text-base lg:text-lg font-semibold tracking-wide hidden sm:block">
              Cuidando de quem sempre cuidou de você
            </span>
          </div>

          {/* MENU */}
          <nav className="flex items-center gap-3 ml-auto" role="navigation" aria-label="Menu principal">

            <a
              href="/"
              className={`text-[#0056a4] hover:text-[#003d74] text-sm md:text-lg px-3 py-2 rounded-md ${location.pathname === '/' ? 'font-bold border-b-2 border-[#0056a4]' : ''}`}
            >
              Início
            </a>

            <a
              href="/servicos"
              className={`text-[#0056a4] hover:text-[#003d74] text-sm md:text-lg px-3 py-2 rounded-md ${location.pathname === '/servicos' ? 'font-bold border-b-2 border-[#0056a4]' : ''}`}
            >
              Serviços
            </a>

            <a
              href="/sobre-nos"
              className={`text-[#0056a4] hover:text-[#003d74] text-sm md:text-lg px-3 py-2 rounded-md whitespace-nowrap ${location.pathname === '/sobre-nos' ? 'font-bold border-b-2 border-[#0056a4]' : ''}`}
            >
              Sobre nós
            </a>

            <a
              href="/avaliacoes"
              className={`text-[#0056a4] hover:text-[#003d74] text-sm md:text-lg px-3 py-2 rounded-md ${location.pathname === '/avaliacoes' ? 'font-bold border-b-2 border-[#0056a4]' : ''}`}
            >
              Avaliações
            </a>

            {/* Botão de mensagens (da branch do Vitor) */}
            <button
              onClick={() => navigate('/mensagens')}
              className={`flex items-center gap-2 text-[#0056a4] hover:text-[#003d74] text-sm md:text-lg px-3 py-2 rounded-md ${location.pathname === '/mensagens' ? 'font-bold border-b-2 border-[#0056a4]' : ''}`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20" height="20"
                viewBox="0 0 24 24"
                fill="none" stroke="currentColor" strokeWidth="2"
                strokeLinecap="round" strokeLinejoin="round"
              >
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
              </svg>
              <span className="hidden sm:inline">Mensagens</span>
            </button>

            {/* --- LOGIN / LOGOUT --- */}
            {isLoggedIn ? (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-[#0056a4]">
                  <User size={20} />
                  <span className="text-lg">Olá, {userName}</span>
                </div>

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-[#0056a4] hover:text-[#003d74] px-3 py-2 rounded-lg text-lg"
                >
                  <LogOut size={20} />
                  Sair
                </button>
              </div>
            ) : (
              <>
                <button
                  onClick={() => navigate('/tipo-cadastro')}
                  className="bg-[#0056a4] text-white px-4 md:px-6 py-2 rounded-lg hover:bg-[#004483] text-sm md:text-base whitespace-nowrap"
                >
                  Cadastre-se
                </button>

                <button
                  onClick={() => navigate('/login')}
                  className="flex items-center gap-2 text-[#0056a4] hover:text-[#003d74] px-3 py-2 rounded-md text-sm md:text-lg"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20" height="20"
                    viewBox="0 0 24 24"
                    fill="none" stroke="currentColor" strokeWidth="2"
                    strokeLinecap="round" strokeLinejoin="round"
                  >
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                  <span className="hidden sm:inline">Entrar</span>
                </button>
              </>
            )}
          </nav>

        </div>
      </div>
    </header>
  );
};

export default Header;
