import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import AccessibilityMenu from '../components/AccessibilityMenu';
import '../styles/accessibility.css';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  return (
    <div className="min-h-screen flex flex-col">
      <AccessibilityMenu />
      
      {/* Skip Link - Hidden until focused */}
      <a 
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-white focus:text-[#0056a4] focus:shadow-lg"
      >
        Pular para o conteúdo principal
      </a>

      {/* Header/Navigation */}
      <header className="bg-white border-b border-gray-100" role="banner">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="flex items-center justify-between py-3 sm:py-4 md:py-5 gap-4 sm:gap-6 md:gap-8 lg:gap-10">
            {/* Logo Section */}
            <div className="flex items-center gap-2 sm:gap-3 md:gap-4 flex-shrink-0 min-w-0">
              <img 
                src="/lovable-uploads/ae6d71a7-8de9-40f0-a34b-848a22c94d66.png" 
                alt="Amigo Cuidador Logo" 
                className="h-12 sm:h-14 md:h-16 lg:h-20 xl:h-24 w-auto flex-shrink-0"
              />
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

      {/* Main Hero Section */}
      <main id="main-content" className="flex-grow bg-gradient-to-b from-gray-50 via-white to-gray-50" role="main">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-center">
            {/* Content Section */}
            <div className="space-y-6 sm:space-y-8 order-2 lg:order-1">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 leading-tight tracking-tight">
                Cuidados compassivos para uma vida melhor
              </h1>
              <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 leading-relaxed max-w-2xl">
                Oferecemos serviços personalizados de cuidados para idosos, 
                proporcionando dignidade, independência e paz de espírito 
                para você e sua família.
              </p>
              <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 pt-2" role="group" aria-label="Ações principais">
                <button 
                  onClick={() => navigate('/servicos')}
                  className="bg-[#0056a4] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg hover:bg-[#004483] transition-all flex items-center justify-center gap-2 text-base sm:text-lg font-medium shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#0056a4] focus:ring-offset-2"
                  aria-label="Ver nossos serviços"
                >
                  Nossos Serviços
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="20" 
                    height="20" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M5 12h14"></path>
                    <path d="m12 5 7 7-7 7"></path>
                  </svg>
                </button>
                <button
                  onClick={() => navigate('/cuidadores')}
                  className="bg-[#00c853] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg hover:bg-[#009624] transition-all flex items-center justify-center gap-2 text-base sm:text-lg font-medium shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#00c853] focus:ring-offset-2"
                  aria-label="Ver cuidadores disponíveis"
                >
                  Ver Cuidadores
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="20" 
                    height="20" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M12 16v-4"></path>
                    <path d="M12 8h.01"></path>
                  </svg>
                </button>
                <button
                  onClick={() => navigate('/canal-suporte')}
                  className="bg-white text-gray-800 border-2 border-gray-200 px-6 sm:px-8 py-3 sm:py-4 rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-all text-base sm:text-lg font-medium shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#0056a4] focus:ring-offset-2"
                  aria-label="Entre em contato conosco"
                >
                  Fale Conosco
                </button>
              </div>
            </div>
            
            {/* Image Section */}
            <div className="relative order-1 lg:order-2">
              <div className="absolute inset-0 bg-gradient-to-br from-[#0056a4] to-[#004483] rounded-3xl transform rotate-2 sm:rotate-3 opacity-5" aria-hidden="true"></div>
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img 
                  src="/lovable-uploads/05f0d354-d346-42eb-b36f-87b02fe5e7df.png" 
                  alt="Cuidador profissional auxiliando uma pessoa idosa em suas atividades diárias" 
                  className="w-full h-auto object-cover transform hover:scale-[1.02] transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
