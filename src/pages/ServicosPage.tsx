import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const ServicosPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header/Navigation */}
      <header className="bg-white py-4 px-6 shadow-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <button
              onClick={() => navigate('/')}
              className="hover:opacity-80 transition-opacity duration-200 focus:outline-none focus:ring-2 focus:ring-[#0056a4] focus:ring-offset-2 rounded-lg"
              aria-label="Voltar para página inicial"
            >
              <img 
                src="/lovable-uploads/ae6d71a7-8de9-40f0-a34b-848a22c94d66.png" 
                alt="Amigo Cuidador Logo" 
                className="h-28 w-auto"
              />
            </button>
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

      <main className="max-w-7xl mx-auto px-6 py-12 bg-gradient-to-b from-white to-gray-50">
        <section className="mt-8">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold text-[#0056a4] mb-4">Nossos Serviços</h2>
            <p className="text-2xl text-gray-700 max-w-3xl mx-auto">
              Oferecemos uma ampla gama de serviços personalizados, visando o bem-estar e a qualidade de vida dos idosos. 
              Nossa equipe é formada por profissionais capacitados, preparados para atender às diversas necessidades dos 
              seus entes queridos com carinho, respeito e dedicação.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
            {/* Cuidados Paliativos */}
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-[#0056a4] p-3 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 9a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z"></path>
                    <path d="M13 13h4"></path>
                    <path d="M7 13h4"></path>
                  </svg>
                </div>
                <h3 className="text-3xl font-semibold text-[#0056a4]">Cuidados Paliativos</h3>
              </div>
              <p className="text-xl text-gray-700 leading-relaxed">
                Nossos profissionais estão preparados para oferecer cuidados paliativos que visam melhorar a qualidade de vida de idosos com doenças graves ou crônicas. O foco é aliviar o sofrimento físico e emocional, garantindo dignidade e respeito durante o processo.
              </p>
            </div>

            {/* Atividades de Socialização */}
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
                <h3 className="text-3xl font-semibold text-[#0056a4]">Atividades de Socialização</h3>
              </div>
              <p className="text-xl text-gray-700 leading-relaxed">
                Oferecemos apoio na realização de atividades que estimulam a mente e o corpo, como leitura, exercícios leves, jogos e passeios. Além disso, incentivamos a interação social para promover o bem-estar emocional e a manutenção das capacidades cognitivas.
              </p>
            </div>

            {/* Apoio Emocional e Psicológico */}
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-[#0056a4] p-3 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                  </svg>
                </div>
                <h3 className="text-3xl font-semibold text-[#0056a4]">Apoio Emocional</h3>
              </div>
              <p className="text-xl text-gray-700 leading-relaxed">
                Cuidamos também do lado emocional do idoso, oferecendo apoio psicológico e ajudando a lidar com questões como a solidão, ansiedade e mudanças que acompanham o envelhecimento. Nosso objetivo é garantir uma vida mais feliz e equilibrada.
              </p>
            </div>

            {/* Assistência à Mobilidade */}
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-[#0056a4] p-3 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0"></path>
                    <path d="M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v2"></path>
                    <path d="M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8"></path>
                    <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"></path>
                  </svg>
                </div>
                <h3 className="text-3xl font-semibold text-[#0056a4]">Assistência à Mobilidade</h3>
              </div>
              <p className="text-xl text-gray-700 leading-relaxed">
                Ajudamos na locomoção do idoso, seja para atividades dentro de casa ou ao sair para consultas médicas, compras ou passeios. Nosso objetivo é garantir a segurança e o conforto, prevenindo quedas e lesões.
              </p>
            </div>

            {/* Cuidados com Alimentação */}
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-[#0056a4] p-3 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
                    <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path>
                    <line x1="6" x2="6" y1="2" y2="4"></line>
                    <line x1="10" x2="10" y1="2" y2="4"></line>
                    <line x1="14" x2="14" y1="2" y2="4"></line>
                  </svg>
                </div>
                <h3 className="text-3xl font-semibold text-[#0056a4]">Cuidados com Alimentação</h3>
              </div>
              <p className="text-xl text-gray-700 leading-relaxed">
                Nossa equipe oferece suporte na preparação e acompanhamento das refeições, respeitando as necessidades nutricionais específicas de cada idoso. Também orientamos sobre hábitos alimentares saudáveis, adequados à idade e condição de saúde.
              </p>
            </div>

            {/* Acompanhamento Médico */}
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-[#0056a4] p-3 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4.8 2.3A.3.3 0 105 2H4a2 2 0 00-2 2v5c0 1.1.9 2 2 2h3.8a2 2 0 001.8-1.1l1.7-2.9c.3-.6.4-1.3.3-2-.1-.5-.4-1-.8-1.3l-1-1"></path>
                    <path d="M3 17h4.8a2 2 0 001.8-1.1l1.7-2.9"></path>
                    <path d="M15 6h6"></path>
                    <path d="M18 3v6"></path>
                  </svg>
                </div>
                <h3 className="text-3xl font-semibold text-[#0056a4]">Acompanhamento Médico</h3>
              </div>
              <p className="text-xl text-gray-700 leading-relaxed">
                Caso necessário, oferecemos suporte no agendamento de consultas médicas, transporte para exames e auxílio no acompanhamento das orientações do médico. Estamos atentos às necessidades de saúde do idoso para garantir que ele receba os cuidados adequados.
              </p>
            </div>
          </div>
          
          <div className="mt-16 bg-white p-8 rounded-xl shadow-lg text-center">
            <p className="text-2xl text-gray-700">
              Se você está buscando um serviço dedicado e de qualidade, nossa equipe está pronta para oferecer o melhor cuidado para seu familiar.
            </p>
            <button
              onClick={() => navigate('/contato')}
              className="mt-6 bg-[#0056a4] text-white px-8 py-3 rounded-lg hover:bg-[#004483] transition-colors text-xl flex items-center gap-2 mx-auto"
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
  );
};

export default ServicosPage;
