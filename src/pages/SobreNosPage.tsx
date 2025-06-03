import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const SobreNosPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header/Navigation */}
      <header className="bg-white py-4 px-6 shadow-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <img 
              src="/lovable-uploads/ae6d71a7-8de9-40f0-a34b-848a22c94d66.png" 
              alt="Amigo Cuidador Logo" 
              className="h-28 w-auto"
            />
          </div>
          
          <nav className="flex items-center space-x-6">
            <a 
              href="/" 
              className={`text-[#0056a4] hover:text-[#003d74] text-xl ${location.pathname === '/' ? 'font-bold border-b-2 border-[#0056a4]' : ''}`}
            >
              Início
            </a>
            <a 
              href="/servicos" 
              className={`text-[#0056a4] hover:text-[#003d74] text-xl ${location.pathname === '/servicos' ? 'font-bold border-b-2 border-[#0056a4]' : ''}`}
            >
              Serviços
            </a>
            <a 
              href="/sobre-nos" 
              className={`text-[#0056a4] hover:text-[#003d74] text-xl ${location.pathname === '/sobre-nos' ? 'font-bold border-b-2 border-[#0056a4]' : ''}`}
            >
              Sobre nós
            </a>
            <a 
              href="/avaliacoes" 
              className={`text-[#0056a4] hover:text-[#003d74] text-xl ${location.pathname === '/avaliacoes' ? 'font-bold border-b-2 border-[#0056a4]' : ''}`}
            >
              Avaliações
            </a>
            <button
              onClick={() => navigate('/tipo-cadastro')}
              className="bg-[#0056a4] text-white px-6 py-3 rounded-lg hover:bg-[#004483] transition-colors text-xl"
            >
              Cadastre-se
            </button>
            <button
              onClick={() => navigate('/login')}
              className="flex items-center gap-2 text-[#0056a4] hover:text-[#003d74] text-xl"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              Entrar
            </button>
          </nav>
        </div>
      </header>

      <div className="w-full bg-gradient-to-b from-white to-gray-50">
        <main className="max-w-7xl mx-auto px-6 py-12">
          <section className="mt-8">
            <div className="text-center mb-12">
              <h2 className="text-5xl font-bold text-[#0056a4] mb-4">Sobre Nós</h2>
              <p className="text-2xl text-gray-700 max-w-3xl mx-auto">
                Conheça nossa história, missão e valores. Saiba por que somos referência 
                em cuidados para idosos e como nossa dedicação faz a diferença na vida 
                de tantas famílias.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mt-16">
              <div className="relative">
                <div 
                  className="absolute inset-0 bg-[#0056a4] rounded-2xl transform -rotate-3 opacity-10"
                  aria-hidden="true"
                ></div>
                <img 
                  src="/lovable-uploads/12b87f5c-30c6-4ef0-99dc-8ff0848721f5.png" 
                  alt="Cuidador profissional auxiliando idoso em atividades diárias"
                  className="relative w-full h-auto object-cover rounded-2xl shadow-xl"
                />
              </div>
              
              <div className="space-y-8">
                <div>
                  <h3 className="text-3xl font-semibold text-[#0056a4] mb-4">Nossa História</h3>
                  <p className="text-xl text-gray-700 leading-relaxed">
                    O Amigo Cuidador nasceu da necessidade de proporcionar um serviço de 
                    cuidados que vai além do básico. Nossa jornada começou com a visão de 
                    criar um ambiente onde cada idoso pudesse receber atenção personalizada, 
                    mantendo sua dignidade e independência.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-3xl font-semibold text-[#0056a4] mb-4">Nossa Missão</h3>
                  <p className="text-xl text-gray-700 leading-relaxed">
                    Proporcionar cuidados excepcionais e personalizados, promovendo qualidade 
                    de vida e dignidade para nossos clientes e suas famílias, através de uma 
                    equipe altamente qualificada e comprometida.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
              <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                <div className="flex items-center gap-4 mb-6">
                  <div className="bg-[#0056a4] p-3 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                    </svg>
                  </div>
                  <h3 className="text-2xl font-semibold text-[#0056a4]">Compaixão</h3>
                </div>
                <p className="text-lg text-gray-700">
                  Cuidamos com amor e empatia, entendendo as necessidades únicas de cada pessoa 
                  e oferecendo suporte emocional além dos cuidados físicos.
                </p>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                <div className="flex items-center gap-4 mb-6">
                  <div className="bg-[#0056a4] p-3 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                      <path d="m9 12 2 2 4-4"></path>
                    </svg>
                  </div>
                  <h3 className="text-2xl font-semibold text-[#0056a4]">Excelência</h3>
                </div>
                <p className="text-lg text-gray-700">
                  Buscamos constantemente aprimorar nossos serviços, mantendo os mais altos 
                  padrões de qualidade e profissionalismo em tudo que fazemos.
                </p>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                <div className="flex items-center gap-4 mb-6">
                  <div className="bg-[#0056a4] p-3 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                      <circle cx="9" cy="7" r="4"></circle>
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                    </svg>
                  </div>
                  <h3 className="text-2xl font-semibold text-[#0056a4]">Respeito</h3>
                </div>
                <p className="text-lg text-gray-700">
                  Valorizamos a dignidade e individualidade de cada pessoa, respeitando suas 
                  escolhas, cultura e história de vida.
                </p>
              </div>
            </div>

            <div className="mt-16 text-center">
              <h3 className="text-3xl font-semibold text-[#0056a4] mb-6">
                Faça Parte da Nossa História
              </h3>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-8">
                Se você compartilha de nossos valores e busca um serviço de cuidados 
                que realmente faz a diferença, junte-se a nós nessa jornada.
              </p>
              <button
                onClick={() => navigate('/contato')}
                className="bg-[#0056a4] text-white px-8 py-4 rounded-lg hover:bg-[#004483] transition-colors text-xl inline-flex items-center gap-2"
              >
                Entre em Contato
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </button>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default SobreNosPage;
