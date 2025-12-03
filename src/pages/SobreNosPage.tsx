import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

const SobreNosPage: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Header/Navigation */}
      <Header />

      <main className="max-w-5xl mx-auto px-6 py-12 bg-gradient-to-b from-white to-gray-50">
        <button
          onClick={() => navigate('/')}
          className="absolute top-4 left-4 text-[#0056a4] hover:text-[#003d74] p-2 rounded-lg hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-[#0056a4] focus:ring-offset-2"
          aria-label="Voltar para página inicial"
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
          >
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
        </button>

        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-[#0056a4] mb-6">Sobre Nós</h1>
          <div className="w-24 h-1 bg-[#0056a4] mx-auto mb-8"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <img 
              src="/lovable-uploads/12b87f5c-30c6-4ef0-99dc-8ff0848721f5.png"
              alt="Equipe Amigo Cuidador" 
              className="rounded-2xl shadow-xl w-full h-auto object-cover transform hover:scale-[1.02] transition-transform duration-300"
            />
          </div>
          <div className="space-y-6">
            <h2 className="text-3xl font-semibold text-[#0056a4] mb-6">Nossa História</h2>
            <p className="text-xl text-gray-700 leading-relaxed">
              O Amigo Cuidador nasceu da percepção de que muitas famílias enfrentam dificuldades 
              para cuidar adequadamente de seus entes queridos idosos. Fundada em 2025 por um grupo 
              de estudantes da área da tecnologia apaixonados por cuidados geriátricos, nossa empresa 
              tem como missão proporcionar bem-estar, dignidade e qualidade de vida para idosos e 
              tranquilidade para suas famílias.
            </p>
            <p className="text-xl text-gray-700 leading-relaxed">
              Ao longo dos anos, expandimos nossa equipe e serviços, mantendo sempre os mesmos valores: 
              excelência no atendimento, empatia, respeito e compromisso com o bem-estar dos nossos clientes.
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-[#0056a4] p-3 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
              </div>
              <h2 className="text-3xl font-semibold text-[#0056a4]">Nossa Missão</h2>
            </div>
            <p className="text-xl text-gray-700 leading-relaxed">
              Proporcionar cuidados personalizados e de qualidade superior aos idosos, promovendo sua 
              independência, dignidade e bem-estar, enquanto oferecemos tranquilidade às suas famílias.
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-[#0056a4] p-3 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
              </div>
              <h2 className="text-3xl font-semibold text-[#0056a4]">Nossa Visão</h2>
            </div>
            <p className="text-xl text-gray-700 leading-relaxed">
              Ser reconhecida como a empresa referência em cuidados domiciliares para idosos, 
              através da excelência em serviços, comprometimento com o bem-estar e da formação 
              contínua de profissionais altamente qualificados.
            </p>
          </div>
        </div>
        
        <div className="bg-white p-10 rounded-xl shadow-lg">
          <div className="flex items-center gap-4 mb-8">
            <div className="bg-[#0056a4] p-3 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
              </svg>
            </div>
            <h2 className="text-3xl font-semibold text-[#0056a4]">Nossos Valores</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <h3 className="text-2xl font-semibold text-[#0056a4] mb-3">Respeito</h3>
              <p className="text-xl text-gray-700">Tratamos cada idoso com dignidade e consideração.</p>
            </div>

            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <h3 className="text-2xl font-semibold text-[#0056a4] mb-3">Empatia</h3>
              <p className="text-xl text-gray-700">Colocamo-nos no lugar do outro para entender suas necessidades.</p>
            </div>

            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <h3 className="text-2xl font-semibold text-[#0056a4] mb-3">Comprometimento</h3>
              <p className="text-xl text-gray-700">Dedicamo-nos totalmente ao bem-estar de nossos clientes.</p>
            </div>

            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <h3 className="text-2xl font-semibold text-[#0056a4] mb-3">Excelência</h3>
              <p className="text-xl text-gray-700">Buscamos constantemente aprimorar nossos serviços.</p>
            </div>

            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <h3 className="text-2xl font-semibold text-[#0056a4] mb-3">Ética</h3>
              <p className="text-xl text-gray-700">Agimos com integridade e transparência em todas as situações.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SobreNosPage;
