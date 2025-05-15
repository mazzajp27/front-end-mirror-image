
import React from 'react';
import { useNavigate } from 'react-router-dom';

const SobreNosPage: React.FC = () => {
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

      <main className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold text-[#0056a4] mb-6">Sobre Nós</h1>
        
        <div className="mb-8">          
          <h2 className="text-2xl font-semibold text-[#0056a4] mb-4">Nossa História</h2>
          <p className="text-gray-700 mb-4">
            O Amigo Cuidador nasceu da percepção de que muitas famílias enfrentam dificuldades para cuidar 
            adequadamente de seus entes queridos idosos. Fundada em 2015 por um grupo de profissionais da saúde 
            apaixonados por cuidados geriátricos, nossa empresa tem como missão proporcionar bem-estar, 
            dignidade e qualidade de vida para idosos e tranquilidade para suas famílias.
          </p>
          <p className="text-gray-700 mb-4">
            Ao longo dos anos, expandimos nossa equipe e serviços, mantendo sempre os mesmos valores: 
            excelência no atendimento, empatia, respeito e compromisso com o bem-estar dos nossos clientes.
          </p>
        </div>
        
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-[#0056a4] mb-4">Nossa Missão</h2>
          <p className="text-gray-700">
            Proporcionar cuidados personalizados e de qualidade superior aos idosos, promovendo sua 
            independência, dignidade e bem-estar, enquanto oferecemos tranquilidade às suas famílias.
          </p>
        </div>
        
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-[#0056a4] mb-4">Nossa Visão</h2>
          <p className="text-gray-700">
            Ser reconhecida como a empresa referência em cuidados domiciliares para idosos, 
            através da excelência em serviços, comprometimento com o bem-estar e da formação contínua 
            de profissionais altamente qualificados.
          </p>
        </div>
        
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-[#0056a4] mb-4">Nossos Valores</h2>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li><span className="font-semibold">Respeito:</span> Tratamos cada idoso com dignidade e consideração.</li>
            <li><span className="font-semibold">Empatia:</span> Colocamo-nos no lugar do outro para entender suas necessidades.</li>
            <li><span className="font-semibold">Comprometimento:</span> Dedicamo-nos totalmente ao bem-estar de nossos clientes.</li>
            <li><span className="font-semibold">Excelência:</span> Buscamos constantemente aprimorar nossos serviços.</li>
            <li><span className="font-semibold">Ética:</span> Agimos com integridade e transparência em todas as situações.</li>
          </ul>
        </div>
      </main>
    </div>
  );
};

export default SobreNosPage;
