
import React from 'react';
import { useNavigate } from 'react-router-dom';

const ServicosPage: React.FC = () => {
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
              className="h-12"
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

      <main className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold text-[#0056a4] mb-2">Serviços</h1>
        
        <section className="mt-8">
          <h2 className="text-2xl font-bold text-[#0056a4] mb-4">Nossos Serviços</h2>
          <p className="text-lg text-gray-700 mb-8">
            Oferecemos uma ampla gama de serviços personalizados, visando o bem-estar e a qualidade de vida dos idosos. 
            Nossa equipe é formada por profissionais capacitados, preparados para atender às diversas necessidades dos 
            seus entes queridos com carinho, respeito e dedicação. Conheça nossos serviços:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            {/* Cuidados Paliativos */}
            <div className="bg-gray-100 p-6 rounded-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-[#0056a4] p-2 rounded-md">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect>
                    <line x1="16" x2="16" y1="2" y2="6"></line>
                    <line x1="8" x2="8" y1="2" y2="6"></line>
                    <line x1="3" x2="21" y1="10" y2="10"></line>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-[#0056a4]">1. Cuidados Paliativos</h3>
              </div>
              <p className="text-gray-700">
                Nossos profissionais estão preparados para oferecer cuidados paliativos que visam melhorar a qualidade de vida de idosos com doenças graves ou crônicas. O foco é aliviar o sofrimento físico e emocional, garantindo dignidade e respeito durante o processo.
              </p>
            </div>

            {/* Acompanhamento e Atividades de Socialização */}
            <div className="bg-gray-100 p-6 rounded-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-[#0056a4] p-2 rounded-md">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 3v18"></path>
                    <path d="M9 3h6a6 6 0 0 1 0 12H9"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-[#0056a4]">2. Acompanhamento e Atividades de Socialização</h3>
              </div>
              <p className="text-gray-700">
                Oferecemos apoio na realização de atividades que estimulam a mente e o corpo, como leitura, exercícios leves, jogos e passeios. Além disso, incentivamos a interação social para promover o bem-estar emocional e a manutenção das capacidades cognitivas.
              </p>
            </div>

            {/* Apoio Emocional e Psicológico */}
            <div className="bg-gray-100 p-6 rounded-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-[#0056a4] p-2 rounded-md">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-[#0056a4]">3. Apoio Emocional e Psicológico</h3>
              </div>
              <p className="text-gray-700">
                Cuidamos também do lado emocional do idoso, oferecendo apoio psicológico e ajudando a lidar com questões como a solidão, ansiedade e mudanças que acompanham o envelhecimento. Nosso objetivo é garantir uma vida mais feliz e equilibrada.
              </p>
            </div>

            {/* Assistência à Mobilidade */}
            <div className="bg-gray-100 p-6 rounded-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-[#0056a4] p-2 rounded-md">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0"></path>
                    <path d="M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v2"></path>
                    <path d="M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8"></path>
                    <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-[#0056a4]">4. Assistência à Mobilidade</h3>
              </div>
              <p className="text-gray-700">
                Ajudamos na locomoção do idoso, seja para atividades dentro de casa ou ao sair para consultas médicas, compras ou passeios. Nosso objetivo é garantir a segurança e o conforto, prevenindo quedas e lesões.
              </p>
            </div>

            {/* Cuidados com Alimentação */}
            <div className="bg-gray-100 p-6 rounded-lg border-2 border-[#0056a4]">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-[#0056a4] p-2 rounded-md">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
                    <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path>
                    <line x1="6" x2="6" y1="2" y2="4"></line>
                    <line x1="10" x2="10" y1="2" y2="4"></line>
                    <line x1="14" x2="14" y1="2" y2="4"></line>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-[#0056a4]">5. Cuidados com Alimentação</h3>
              </div>
              <p className="text-gray-700">
                Nossa equipe oferece suporte na preparação e acompanhamento das refeições, respeitando as necessidades nutricionais específicas de cada idoso. Também orientamos sobre hábitos alimentares saudáveis, adequados à idade e condição de saúde.
              </p>
            </div>

            {/* Acompanhamento Médico */}
            <div className="bg-gray-100 p-6 rounded-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-[#0056a4] p-2 rounded-md">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-[#0056a4]">6. Acompanhamento Médico</h3>
              </div>
              <p className="text-gray-700">
                Caso necessário, oferecemos suporte no agendamento de consultas médicas, transporte para exames e auxílio no acompanhamento das orientações do médico. Estamos atentos às necessidades de saúde do idoso para garantir que ele receba os cuidados adequados.
              </p>
            </div>
          </div>
          
          <div className="mt-12 bg-gray-100 p-6 rounded-lg">
            <p className="text-gray-700 text-lg">
              Se você está buscando um serviço dedicado e de qualidade, nossa equipe está pronta para oferecer o melhor cuidado para seu familiar.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ServicosPage;
