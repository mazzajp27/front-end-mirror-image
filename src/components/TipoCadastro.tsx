
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const TipoCadastro: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center py-10 px-4">
      <div className="text-center mb-10 max-w-2xl w-full">
        <h1 className="text-3xl font-bold text-[#0056a4] mb-2">Amigo Cuidador</h1>
        <p className="text-lg font-medium text-[#0056a4]">CUIDANDO DE QUEM SEMPRE CUIDOU DE VOCÊ</p>
      </div>
      
      <div className="flex flex-col md:flex-row items-center justify-center gap-8 w-full max-w-5xl">
        <div className="flex-1 flex justify-center">
          <button 
            onClick={() => navigate('/cadastro/cuidador')} 
            className="bg-[#0056a4] text-white px-6 py-3 rounded-full font-medium hover:bg-[#004483] transition-colors"
          >
            Cadastro Cuidador
          </button>
        </div>
        
        <div className="md:mx-8">
          <img 
            src="/lovable-uploads/5a39454b-b30c-4703-9a08-fb4ca441e2b9.png" 
            alt="Amigo Cuidador Logo" 
            className="h-24"
          />
        </div>
        
        <div className="flex-1 flex justify-center">
          <button 
            onClick={() => navigate('/cadastro/idoso')} 
            className="bg-[#0056a4] text-white px-6 py-3 rounded-full font-medium hover:bg-[#004483] transition-colors"
          >
            Cadastro Contratante
          </button>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4 mt-8 w-full max-w-5xl px-4">
        <div className="flex-1">
          <img 
            src="/lovable-uploads/6523d046-bb3c-42ec-b701-f2425ab7900a.png" 
            alt="Cuidador ajudando idoso" 
            className="w-full h-64 object-cover rounded-lg"
          />
        </div>
        <div className="flex-1">
          <img 
            src="/lovable-uploads/abed7ee4-83b4-4817-add9-aa5b305f66c3.png" 
            alt="Idoso sorrindo" 
            className="w-full h-64 object-cover rounded-lg"
          />
        </div>
      </div>
      
      <div className="mt-16">
        <button 
          onClick={() => navigate('/')} 
          className="flex items-center justify-center bg-[#0056a4] text-white px-6 py-2 rounded-full gap-2 hover:bg-[#004483] transition-colors"
        >
          <ArrowLeft size={18} />
          VOLTAR
        </button>
      </div>
    </div>
  );
};

export default TipoCadastro;
