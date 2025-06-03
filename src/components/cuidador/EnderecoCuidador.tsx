import React, { useState } from 'react';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import FormInput from '../FormInput';
import { CuidadorData } from '../../services/api';
import { toast } from 'sonner';

interface EnderecoCuidadorProps {
  data: CuidadorData;
  updateData: (data: Partial<CuidadorData>) => void;
  onNext: () => void;
  onPrevious: () => void;
}

interface ViaCEPResponse {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  erro?: boolean;
}

const EnderecoCuidador: React.FC<EnderecoCuidadorProps> = ({ data, updateData, onNext, onPrevious }) => {
  const [isLoadingCep, setIsLoadingCep] = useState(false);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    updateData({ [id]: value });

    // Se for o campo CEP e tiver 8 dígitos, busca o endereço
    if (id === 'cep') {
      const cepNumbers = value.replace(/\D/g, '');
      if (cepNumbers.length === 8) {
        await buscarCep(cepNumbers);
      }
    }
  };

  const buscarCep = async (cep: string) => {
    try {
      setIsLoadingCep(true);
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data: ViaCEPResponse = await response.json();

      if (data.erro) {
        toast.error('CEP não encontrado');
        return;
      }

      updateData({
        endereco: data.logradouro,
        bairro: data.bairro,
        cidade: data.localidade,
        estado: data.uf,
        complemento: data.complemento
      });

      toast.success('Endereço preenchido automaticamente!');
    } catch (error) {
      toast.error('Erro ao buscar o CEP. Tente novamente.');
    } finally {
      setIsLoadingCep(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validar campos obrigatórios
    if (!data.estado || !data.cidade || !data.endereco || !data.bairro || !data.cep || !data.numero || !data.complemento) {
      toast.error("Por favor, preencha todos os campos obrigatórios!");
      return;
    }

    onNext();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormInput 
          label="CEP"
          type="text"
          id="cep"
          required
          value={data.cep || ''}
          onChange={handleChange}
          mask="99999-999"
          placeholder="Digite o CEP para autocompletar"
          disabled={isLoadingCep}
        />

        <FormInput 
          label="Estado"
          type="text"
          id="estado"
          required
          value={data.estado || ''}
          onChange={handleChange}
          disabled={isLoadingCep}
        />
        
        <FormInput 
          label="Cidade"
          type="text"
          id="cidade"
          required
          value={data.cidade || ''}
          onChange={handleChange}
          disabled={isLoadingCep}
        />

        <FormInput 
          label="Bairro"
          type="text"
          id="bairro"
          required
          value={data.bairro || ''}
          onChange={handleChange}
          disabled={isLoadingCep}
        />
        
        <FormInput 
          label="Endereço"
          type="text"
          id="endereco"
          required
          value={data.endereco || ''}
          onChange={handleChange}
          disabled={isLoadingCep}
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
          disabled={isLoadingCep}
        >
          Avançar
          <ArrowRight size={18} />
        </button>
      </div>
    </form>
  );
};

export default EnderecoCuidador;
