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
      <header className="bg-white py-4 px-6 shadow-sm" role="banner">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex flex-col items-center justify-center text-center">
            <img 
              src="/lovable-uploads/ae6d71a7-8de9-40f0-a34b-848a22c94d66.png" 
              alt="Amigo Cuidador Logo" 
              className="h-14 w-auto max-h-16 md:h-16 md:max-h-20 lg:h-20 lg:max-h-24 mb-2"
            />
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
          </nav>
        </div>
      </header>

      {/* Main Hero Section */}
      <main id="main-content" className="flex-grow bg-gradient-to-b from-gray-50 to-white" role="main">
        <div className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h1 className="text-6xl font-bold text-gray-900 leading-tight">
              Cuidados compassivos para uma vida melhor
            </h1>
            <p className="text-2xl text-gray-700">
              Oferecemos serviços personalizados de cuidados para idosos, 
              proporcionando dignidade, independência e paz de espírito 
              para você e sua família.
            </p>
            <div className="flex flex-wrap gap-4 pt-4" role="group" aria-label="Ações principais">
              <button 
                onClick={() => navigate('/servicos')}
                className="bg-[#0056a4] text-white px-8 py-4 rounded-lg hover:bg-[#004483] transition-colors flex items-center gap-2 text-xl focus:outline-none focus:ring-2 focus:ring-[#0056a4] focus:ring-offset-2"
                aria-label="Ver nossos serviços"
              >
                Nossos Serviços
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
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </button>
              <button
                onClick={() => navigate('/cuidadores')}
                className="bg-[#00c853] text-white px-8 py-4 rounded-lg hover:bg-[#009624] transition-colors flex items-center gap-2 text-xl focus:outline-none focus:ring-2 focus:ring-[#00c853] focus:ring-offset-2"
                aria-label="Ver cuidadores disponíveis"
              >
                Ver Cuidadores
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
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M12 16v-4"></path>
                  <path d="M12 8h.01"></path>
                </svg>
              </button>
              <button
                onClick={() => navigate('/canal-suporte')}
                className="bg-white text-gray-800 px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors text-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#0056a4] focus:ring-offset-2"
                aria-label="Entre em contato conosco"
              >
                Fale Conosco
              </button>
              <button
                onClick={() => navigate('/mensagens')}
                className="bg-[#ff6b35] text-white px-8 py-4 rounded-lg hover:bg-[#e55a2b] transition-colors flex items-center gap-2 text-xl focus:outline-none focus:ring-2 focus:ring-[#ff6b35] focus:ring-offset-2"
                aria-label="Acessar mensagens"
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
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                </svg>
                Mensagens
              </button>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 bg-[#0056a4] rounded-2xl transform rotate-3 opacity-10" aria-hidden="true"></div>
            <img 
              src="/lovable-uploads/05f0d354-d346-42eb-b36f-87b02fe5e7df.png" 
              alt="Cuidador profissional auxiliando uma pessoa idosa em suas atividades diárias" 
              className="relative w-full h-auto object-cover rounded-2xl shadow-xl transform hover:scale-[1.02] transition-transform duration-300"
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
