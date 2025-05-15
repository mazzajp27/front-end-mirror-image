
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

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
        <h1 className="text-3xl font-bold text-[#0056a4] mb-6 text-center">Avaliações</h1>
        <h2 className="text-xl text-center mb-12">O que nossos clientes dizem sobre o Amigo Cuidador</h2>
        
        {/* Testimonials */}
        <div className="space-y-8">
          {/* Testimonial 1 */}
          <div className="bg-gray-100 p-6 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-semibold text-lg">Maria Souza</h3>
            </div>
            <div className="mb-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <span key={star} className="text-yellow-500">★</span>
              ))}
            </div>
            <p className="text-blue-700">
              "Estamos extremamente satisfeitos com o cuidado que minha mãe está recebendo. 
              O cuidador que designaram para ela é gentil, paciente e está sempre atento às suas necessidades. 
              A comunicação também é excelente, tanto com a minha mãe quanto conosco, os familiares. 
              O serviço é realmente de confiança e faz toda a nossa dia a dia."
            </p>
          </div>
          
          {/* Testimonial 2 */}
          <div className="bg-gray-100 p-6 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-semibold text-lg">Pedro Sousa</h3>
            </div>
            <div className="mb-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <span key={star} className="text-yellow-500">★</span>
              ))}
            </div>
            <p className="text-blue-700">
              "Estamos muito felizes com o atendimento prestado ao meu pai. 
              O cuidador designado para ele é atencioso, carinhoso e sempre se preocupa com o bem-estar dele. 
              A comunicação com a equipe é excelente, mantendo-nos sempre informados sobre qualquer mudança no estado de saúde ou necessidade do meu pai. 
              O serviço realmente traz tranquilidade para toda a família e facilita o nosso dia a dia."
            </p>
          </div>
          
          {/* Testimonial 3 */}
          <div className="bg-gray-100 p-6 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-semibold text-lg">João Pedro</h3>
            </div>
            <div className="mb-2">
              {[1, 2, 3, 4].map((star) => (
                <span key={star} className="text-yellow-500">★</span>
              ))}
            </div>
            <p className="text-blue-700">
              "Estamos muito satisfeitos com o serviço que está sendo prestado. 
              O cuidador designado para minha tia é muito atencioso, paciente e cuida dela com muita dedicação. 
              A comunicação com a equipe é clara e eficaz, o que nos traz tranquilidade e confiança. 
              Esse apoio tem sido fundamental para melhorar o bem-estar dela e facilitar nossa rotina."
            </p>
          </div>
        </div>
        
        {/* Leave a review */}
        <div className="mt-12">
          <h3 className="text-xl font-semibold mb-4">Deixe aqui sua avaliação</h3>
          <form onSubmit={handleSubmit}>
            <textarea
              value={avaliacao}
              onChange={(e) => setAvaliacao(e.target.value)}
              className="w-full p-4 border border-gray-300 rounded-md min-h-32 mb-4"
              placeholder="Compartilhe sua experiência com o Amigo Cuidador..."
            ></textarea>
            <div className="text-right">
              <button
                type="submit"
                className="bg-[#0056a4] text-white px-8 py-2 rounded-md hover:bg-[#004483] transition-colors"
              >
                Enviar
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default AvaliacoesPage;
