import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import Header from '../components/Header';

const AvaliacoesPage: React.FC = () => {
  const navigate = useNavigate();
  const [avaliacao, setAvaliacao] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!avaliacao.trim()) {
      toast.error('Por favor, escreva sua avaliação.');
      return;
    }
    
    toast.success('Avaliação enviada com sucesso!');
    setAvaliacao('');
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="max-w-4xl mx-auto px-6 py-12 bg-gradient-to-b from-white to-gray-50">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-[#0056a4] mb-6">Avaliações</h1>
          <h2 className="text-2xl text-gray-700">O que nossos clientes dizem sobre o Amigo Cuidador</h2>
        </div>
        
        {/* Testimonials */}
        <div className="space-y-8">
          {/* Testimonial 1 */}
          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center gap-3 mb-3">
              <h3 className="text-2xl font-semibold text-[#0056a4]">Maria Souza</h3>
            </div>
            <div className="mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <span key={star} className="text-yellow-500 text-2xl">★</span>
              ))}
            </div>
            <p className="text-xl text-blue-700 leading-relaxed">
              "Estamos extremamente satisfeitos com o cuidado que minha mãe está recebendo. 
              O cuidador que designaram para ela é gentil, paciente e está sempre atento às suas necessidades. 
              A comunicação também é excelente, tanto com a minha mãe quanto conosco, os familiares. 
              O serviço é realmente de confiança e faz toda a nossa dia a dia."
            </p>
          </div>
          
          {/* Testimonial 2 */}
          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center gap-3 mb-3">
              <h3 className="text-2xl font-semibold text-[#0056a4]">Pedro Sousa</h3>
            </div>
            <div className="mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <span key={star} className="text-yellow-500 text-2xl">★</span>
              ))}
            </div>
            <p className="text-xl text-blue-700 leading-relaxed">
              "Estamos muito felizes com o atendimento prestado ao meu pai. 
              O cuidador designado para ele é atencioso, carinhoso e sempre se preocupa com o bem-estar dele. 
              A comunicação com a equipe é excelente, mantendo-nos sempre informados sobre qualquer mudança no estado de saúde ou necessidade do meu pai. 
              O serviço realmente traz tranquilidade para toda a família e facilita o nosso dia a dia."
            </p>
          </div>
          
          {/* Testimonial 3 */}
          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center gap-3 mb-3">
              <h3 className="text-2xl font-semibold text-[#0056a4]">João Pedro</h3>
            </div>
            <div className="mb-4">
              {[1, 2, 3, 4].map((star) => (
                <span key={star} className="text-yellow-500 text-2xl">★</span>
              ))}
            </div>
            <p className="text-xl text-blue-700 leading-relaxed">
              "Estamos muito satisfeitos com o serviço que está sendo prestado. 
              O cuidador designado para minha tia é muito atencioso, paciente e cuida dela com muita dedicação. 
              A comunicação com a equipe é clara e eficaz, o que nos traz tranquilidade e confiança. 
              Esse apoio tem sido fundamental para melhorar o bem-estar dela e facilitar nossa rotina."
            </p>
          </div>
        </div>
        
        {/* Leave a review */}
        <div className="mt-16 bg-white p-8 rounded-xl shadow-lg">
          <h3 className="text-3xl font-semibold mb-6">Deixe aqui sua avaliação</h3>
          <form onSubmit={handleSubmit}>
            <textarea
              value={avaliacao}
              onChange={(e) => setAvaliacao(e.target.value)}
              className="w-full p-6 border border-gray-300 rounded-lg min-h-40 mb-6 text-xl"
              placeholder="Compartilhe sua experiência com o Amigo Cuidador..."
            ></textarea>
            <div className="text-right">
              <button
                type="submit"
                className="bg-[#0056a4] text-white px-8 py-3 rounded-lg hover:bg-[#004483] transition-colors text-xl"
              >
                Enviar Avaliação
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default AvaliacoesPage;
