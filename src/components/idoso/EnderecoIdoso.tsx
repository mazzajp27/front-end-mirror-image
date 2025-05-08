
import React from 'react';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import FormInput from '../FormInput';
import { IdosoData } from '../../services/api';
import { toast } from 'sonner';

interface EnderecoIdosoProps {
  data: IdosoData;
  updateData: (data: Partial<IdosoData>) => void;
  onNext: () => void;
  onPrevious: () => void;
}

const EnderecoIdoso: React.FC<EnderecoIdosoProps> = ({ data, updateData, onNext, onPrevious }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    updateData({ [id]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validar campos obrigatórios
    if (!data.estado || !data.cidade || !data.endereco || !data.bairro || !data.numero || !data.complemento) {
      toast.error("Por favor, preencha todos os campos obrigatórios!");
      return;
    }

    onNext();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormInput 
          label="Estado"
          type="text"
          id="estado"
          required
          value={data.estado || ''}
          onChange={handleChange}
        />
        
        <FormInput 
          label="Cidade"
          type="text"
          id="cidade"
          required
          value={data.cidade || ''}
          onChange={handleChange}
        />
        
        <FormInput 
          label="Endereço"
          type="text"
          id="endereco"
          required
          value={data.endereco || ''}
          onChange={handleChange}
        />
        
        <FormInput 
          label="Bairro"
          type="text"
          id="bairro"
          required
          value={data.bairro || ''}
          onChange={handleChange}
        />
        
        <FormInput 
          label="CEP"
          type="text"
          id="cep"
          required
          value={data.cep || ''}
          onChange={handleChange}
          mask="99999-999"
        />
        
        <FormInput 
          label="Número"
          type="text"
          id="numero"
          required
          value={data.numero || ''}
          onChange={handleChange}
        />
        
        <FormInput 
          label="Complemento"
          type="text"
          id="complemento"
          required
          value={data.complemento || ''}
          onChange={handleChange}
        />
        
        <FormInput 
          label="Referência"
          type="text"
          id="referencia"
          value={data.referencia || ''}
          onChange={handleChange}
        />
      </div>
      
      <div className="flex justify-between mt-10">
        <button 
          type="button"
          onClick={onPrevious}
          className="bg-[#0056a4] text-white py-3 px-12 rounded-full flex items-center gap-2 hover:bg-[#004483] transition-colors"
        >
          <ArrowLeft size={18} />
          Voltar
        </button>

        <button 
          type="submit" 
          className="bg-[#0056a4] text-white py-3 px-12 rounded-full flex items-center gap-2 hover:bg-[#004483] transition-colors"
        >
          Avançar
          <ArrowRight size={18} />
        </button>
      </div>
    </form>
  );
};

export default EnderecoIdoso;
