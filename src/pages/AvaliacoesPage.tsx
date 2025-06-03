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

      {/* Main Content */}
      <main className="flex-1 bg-gray-50">
        <section className="max-w-7xl mx-auto px-6 py-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
            Avaliações
          </h1>

          {/* Form Section */}
          <div className="max-w-2xl mx-auto mb-16">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-lg">
              <h2 className="text-2xl font-semibold text-[#0056a4] mb-4">
                Deixe sua Avaliação
              </h2>
              <div className="space-y-4">
                <textarea
                  value={avaliacao}
                  onChange={(e) => setAvaliacao(e.target.value)}
                  className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0056a4] focus:border-transparent"
                  placeholder="Conte-nos sua experiência..."
                />
                <button
                  type="submit"
                  className="w-full bg-[#0056a4] text-white px-6 py-3 rounded-lg hover:bg-[#004483] transition-colors"
                >
                  Enviar Avaliação
                </button>
              </div>
            </form>
          </div>

          {/* Testimonials */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-[#0056a4] rounded-full flex items-center justify-center text-white text-xl font-bold">
                  M
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Maria Silva</h3>
                  <p className="text-gray-600">Cliente desde 2022</p>
                </div>
              </div>
              <p className="text-gray-700">
                "Excelente serviço! Os cuidadores são muito atenciosos e profissionais. 
                Minha mãe está muito bem cuidada e feliz."
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-[#0056a4] rounded-full flex items-center justify-center text-white text-xl font-bold">
                  J
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">João Santos</h3>
                  <p className="text-gray-600">Cliente desde 2021</p>
                </div>
              </div>
              <p className="text-gray-700">
                "O Amigo Cuidador trouxe tranquilidade para nossa família. 
                Agora sei que meu pai está em boas mãos."
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-[#0056a4] rounded-full flex items-center justify-center text-white text-xl font-bold">
                  A
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Ana Oliveira</h3>
                  <p className="text-gray-600">Cliente desde 2023</p>
                </div>
              </div>
              <p className="text-gray-700">
                "Profissionais muito bem preparados e dedicados. 
                Recomendo fortemente os serviços do Amigo Cuidador."
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AvaliacoesPage;
