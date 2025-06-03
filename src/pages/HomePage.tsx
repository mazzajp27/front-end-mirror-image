import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header/Navigation */}
      <header className="bg-white py-4 px-6 shadow-sm" role="banner">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <img 
              src="/lovable-uploads/ae6d71a7-8de9-40f0-a34b-848a22c94d66.png" 
              alt="Amigo Cuidador Logo" 
              className="h-28 w-auto"
            />
          </div>
          
          <nav className="flex items-center space-x-6" role="navigation" aria-label="Menu principal">
            <a 
              href="/" 
              className={`text-[#0056a4] hover:text-[#003d74] text-xl ${location.pathname === '/' ? 'font-bold border-b-2 border-[#0056a4]' : ''}`}
              aria-current={location.pathname === '/' ? 'page' : undefined}
              accessKey="1"
            >
              Início
            </a>
            <a 
              href="/servicos" 
              className={`text-[#0056a4] hover:text-[#003d74] text-xl ${location.pathname === '/servicos' ? 'font-bold border-b-2 border-[#0056a4]' : ''}`}
              aria-current={location.pathname === '/servicos' ? 'page' : undefined}
              accessKey="2"
            >
              Serviços
            </a>
            <a 
              href="/sobre-nos" 
              className={`text-[#0056a4] hover:text-[#003d74] text-xl ${location.pathname === '/sobre-nos' ? 'font-bold border-b-2 border-[#0056a4]' : ''}`}
              aria-current={location.pathname === '/sobre-nos' ? 'page' : undefined}
              accessKey="3"
            >
              Sobre nós
            </a>
            <a 
              href="/avaliacoes" 
              className={`text-[#0056a4] hover:text-[#003d74] text-xl ${location.pathname === '/avaliacoes' ? 'font-bold border-b-2 border-[#0056a4]' : ''}`}
              aria-current={location.pathname === '/avaliacoes' ? 'page' : undefined}
              accessKey="4"
            >
              Avaliações
            </a>
            <button
              onClick={() => navigate('/tipo-cadastro')}
              className="bg-[#0056a4] text-white px-6 py-3 rounded-lg hover:bg-[#004483] transition-colors text-xl"
              aria-label="Cadastrar-se no Amigo Cuidador"
            >
              Cadastre-se
            </button>
            <button
              onClick={() => navigate('/login')}
              className="flex items-center gap-2 text-[#0056a4] hover:text-[#003d74] text-xl"
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
                role="img"
              >
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              <span>Entrar</span>
            </button>
          </nav>
        </div>
      </header>

      {/* Main Hero Section */}
      <main className="flex-grow bg-gradient-to-b from-gray-50 to-white" role="main">
        <div className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h1 className="text-6xl font-bold text-gray-900 leading-tight" tabIndex={0}>
              Cuidados compassivos para uma vida melhor
            </h1>
            <p className="text-2xl text-gray-700" tabIndex={0}>
              Oferecemos serviços personalizados de cuidados para idosos, 
              proporcionando dignidade, independência e paz de espírito 
              para você e sua família.
            </p>
            <div className="flex flex-wrap gap-4 pt-4" role="group" aria-label="Ações principais">
              <button 
                onClick={() => navigate('/servicos')}
                className="bg-[#0056a4] text-white px-8 py-4 rounded-lg hover:bg-[#004483] transition-colors flex items-center gap-2 text-xl"
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
                  role="img"
                >
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </button>
              <button
                onClick={() => navigate('/contato')}
                className="bg-white text-gray-800 px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors text-xl shadow-sm"
                aria-label="Entrar em contato conosco"
              >
                Fale Conosco
              </button>
            </div>
          </div>
          
          <div className="relative" role="img" aria-label="Imagem ilustrativa de um cuidador ajudando um idoso">
            <div 
              className="absolute inset-0 bg-[#0056a4] rounded-2xl transform rotate-3 opacity-10"
              aria-hidden="true"
            ></div>
            <img 
              src="/lovable-uploads/05f0d354-d346-42eb-b36f-87b02fe5e7df.png" 
              alt="Cuidador ajudando idoso" 
              className="relative w-full h-auto object-cover rounded-2xl shadow-xl transform hover:scale-[1.02] transition-transform duration-300"
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
