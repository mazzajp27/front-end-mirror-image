import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  return (
    <header className="bg-white py-4 px-6 shadow-sm" role="banner">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <img 
            src="/lovable-uploads/ae6d71a7-8de9-40f0-a34b-848a22c94d66.png" 
            alt="Amigo Cuidador Logo" 
            className="h-28 w-auto"
            onClick={() => navigate('/')}
            style={{ cursor: 'pointer' }}
          />
        </div>
        
        <nav className="flex items-center space-x-6" role="navigation" aria-label="Menu principal">
          <button 
            onClick={() => navigate('/')}
            className={`font-display text-[#0056a4] hover:text-[#003d74] text-xl ${location.pathname === '/' ? 'font-bold border-b-2 border-[#0056a4]' : ''}`}
            aria-current={location.pathname === '/' ? 'page' : undefined}
            accessKey="1"
          >
            Início
          </button>
          <button 
            onClick={() => navigate('/servicos')}
            className={`font-display text-[#0056a4] hover:text-[#003d74] text-xl ${location.pathname === '/servicos' ? 'font-bold border-b-2 border-[#0056a4]' : ''}`}
            aria-current={location.pathname === '/servicos' ? 'page' : undefined}
            accessKey="2"
          >
            Serviços
          </button>
          <button 
            onClick={() => navigate('/sobre-nos')}
            className={`font-display text-[#0056a4] hover:text-[#003d74] text-xl ${location.pathname === '/sobre-nos' ? 'font-bold border-b-2 border-[#0056a4]' : ''}`}
            aria-current={location.pathname === '/sobre-nos' ? 'page' : undefined}
            accessKey="3"
          >
            Sobre nós
          </button>
          <button 
            onClick={() => navigate('/avaliacoes')}
            className={`font-display text-[#0056a4] hover:text-[#003d74] text-xl ${location.pathname === '/avaliacoes' ? 'font-bold border-b-2 border-[#0056a4]' : ''}`}
            aria-current={location.pathname === '/avaliacoes' ? 'page' : undefined}
            accessKey="4"
          >
            Avaliações
          </button>
          <button
            type="button"
            onClick={() => navigate('/cadastro')}
            className="font-display bg-[#0056a4] text-white px-6 py-3 rounded-lg hover:bg-[#004483] transition-colors text-xl"
            aria-label="Cadastrar-se no Amigo Cuidador"
          >
            Cadastre-se
          </button>
          <button
            type="button"
            onClick={() => navigate('/login')}
            className="font-display flex items-center gap-2 text-[#0056a4] hover:text-[#003d74] text-xl"
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
  );
};

export default Header; 