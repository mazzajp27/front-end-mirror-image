
import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header/Navigation */}
      <header className="bg-white py-4 px-6 shadow-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <img 
              src="/lovable-uploads/ae6d71a7-8de9-40f0-a34b-848a22c94d66.png" 
              alt="Amigo Cuidador Logo" 
              className="h-16"
            />
          </div>
          
          <nav className="flex items-center space-x-6">
            <a href="/" className="text-[#0056a4] hover:text-[#003d74]">Início</a>
            <a href="/servicos" className="text-[#0056a4] hover:text-[#003d74]">Serviços</a>
            <a href="/sobre-nos" className="text-[#0056a4] hover:text-[#003d74]">Sobre nós</a>
            <a href="/avaliacoes" className="text-[#0056a4] hover:text-[#003d74]">Avaliações</a>
            <button
              onClick={() => navigate('/tipo-cadastro')}
              className="bg-[#0056a4] text-white px-4 py-2 rounded hover:bg-[#004483] transition-colors"
            >
              Cadastra-se
            </button>
            <button
              onClick={() => navigate('/login')}
              className="flex items-center gap-2 text-[#0056a4] hover:text-[#003d74]"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              Entrar
            </button>
          </nav>
        </div>
      </header>

      {/* Main Hero Section */}
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Cuidados compassivos para uma vida melhor</h1>
            <p className="text-lg text-gray-700 mb-8">
              Oferecemos serviços personalizados de cuidados para idosos, 
              proporcionando dignidade, independência e paz de espírito 
              para você e sua família.
            </p>
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={() => navigate('/servicos')}
                className="bg-[#0056a4] text-white px-6 py-3 rounded hover:bg-[#004483] transition-colors flex items-center gap-2"
              >
                Nossos Serviços
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </button>
              <button
                onClick={() => navigate('/contato')}
                className="bg-gray-200 text-gray-800 px-6 py-3 rounded hover:bg-gray-300 transition-colors"
              >
                Fale Conosco
              </button>
            </div>
          </div>
          
          <div className="rounded-lg overflow-hidden">
            <img 
              src="/lovable-uploads/05f0d354-d346-42eb-b36f-87b02fe5e7df.png" 
              alt="Cuidador ajudando idoso" 
              className="w-full h-auto object-cover rounded-lg"
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
