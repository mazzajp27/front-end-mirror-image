import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <header className="bg-white border-b border-gray-100" role="banner">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between py-3 sm:py-4 md:py-5 gap-4 sm:gap-6 md:gap-8 lg:gap-10">
          {/* Logo Section */}
          <div className="flex items-center gap-2 sm:gap-3 md:gap-4 flex-shrink-0 min-w-0">
            <button
              onClick={() => navigate('/')}
              className="hover:opacity-80 transition-opacity duration-200 focus:outline-none focus:ring-2 focus:ring-[#0056a4] focus:ring-offset-2 rounded-lg"
              aria-label="Voltar para página inicial"
            >
              <img 
                src="/lovable-uploads/ae6d71a7-8de9-40f0-a34b-848a22c94d66.png" 
                alt="Amigo Cuidador Logo" 
                className="h-12 sm:h-14 md:h-16 lg:h-20 xl:h-24 w-auto flex-shrink-0"
              />
            </button>
            <span className="text-[#0056a4] text-xs sm:text-sm md:text-base lg:text-lg font-semibold tracking-wide whitespace-nowrap hidden sm:inline">
              Cuidando de quem sempre cuidou de você
            </span>
          </div>
        
          {/* Navigation */}
          <nav className="flex items-center gap-1.5 sm:gap-2 md:gap-3 lg:gap-4 flex-shrink-0" role="navigation" aria-label="Menu principal">
            <a 
              href="/" 
              className={`text-[#0056a4] hover:text-[#003d74] text-sm sm:text-base md:text-lg font-medium transition-colors px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-[#0056a4] focus:ring-offset-2 rounded-md ${location.pathname === '/' ? 'font-bold border-b-2 border-[#0056a4] pb-1.5 sm:pb-2' : ''}`}
              aria-current={location.pathname === '/' ? 'page' : undefined}
            >
              Início
            </a>
            <a 
              href="/servicos" 
              className={`text-[#0056a4] hover:text-[#003d74] text-sm sm:text-base md:text-lg font-medium transition-colors px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-[#0056a4] focus:ring-offset-2 rounded-md ${location.pathname === '/servicos' ? 'font-bold border-b-2 border-[#0056a4] pb-1.5 sm:pb-2' : ''}`}
              aria-current={location.pathname === '/servicos' ? 'page' : undefined}
            >
              Serviços
            </a>
            <a 
              href="/sobre-nos" 
              className={`text-[#0056a4] hover:text-[#003d74] text-sm sm:text-base md:text-lg font-medium transition-colors px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-[#0056a4] focus:ring-offset-2 rounded-md ${location.pathname === '/sobre-nos' ? 'font-bold border-b-2 border-[#0056a4] pb-1.5 sm:pb-2' : ''}`}
              aria-current={location.pathname === '/sobre-nos' ? 'page' : undefined}
            >
              Sobre nós
            </a>
            <a 
              href="/avaliacoes" 
              className={`text-[#0056a4] hover:text-[#003d74] text-sm sm:text-base md:text-lg font-medium transition-colors px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-[#0056a4] focus:ring-offset-2 rounded-md ${location.pathname === '/avaliacoes' ? 'font-bold border-b-2 border-[#0056a4] pb-1.5 sm:pb-2' : ''}`}
              aria-current={location.pathname === '/avaliacoes' ? 'page' : undefined}
            >
              Avaliações
            </a>
            <button
              onClick={() => navigate('/mensagens')}
              className={`flex items-center gap-1 sm:gap-1.5 text-[#0056a4] hover:text-[#003d74] text-sm sm:text-base md:text-lg font-medium transition-colors px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-[#0056a4] focus:ring-offset-2 rounded-md ${location.pathname === '/mensagens' ? 'font-bold border-b-2 border-[#0056a4] pb-1.5 sm:pb-2' : ''}`}
              aria-label="Acessar mensagens"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="18" 
                height="18" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                className="sm:w-5 sm:h-5 md:w-6 md:h-6"
                aria-hidden="true"
              >
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
              </svg>
              <span className="hidden sm:inline">Mensagens</span>
            </button>
            <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3">
              <button
                onClick={() => navigate('/tipo-cadastro')}
                className="bg-[#0056a4] text-white px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 md:py-2.5 rounded-lg hover:bg-[#004483] transition-all text-xs sm:text-sm md:text-base font-medium shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#0056a4] focus:ring-offset-2 whitespace-nowrap"
                aria-label="Cadastrar-se no Amigo Cuidador"
              >
                Cadastre-se
              </button>
              <button
                onClick={() => navigate('/login')}
                className="flex items-center gap-1 sm:gap-1.5 text-[#0056a4] hover:text-[#003d74] text-sm sm:text-base md:text-lg font-medium transition-colors px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-[#0056a4] focus:ring-offset-2 rounded-md"
                aria-label="Entrar na sua conta"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="18" 
                  height="18" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  className="sm:w-5 sm:h-5 md:w-6 md:h-6"
                  aria-hidden="true"
                >
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
                <span className="hidden sm:inline">Entrar</span>
              </button>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;

