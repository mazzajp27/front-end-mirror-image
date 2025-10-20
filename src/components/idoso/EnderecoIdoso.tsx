import React, { useState } from 'react';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import FormInput from '../FormInput';
import { ContratanteData } from '../../services/api';
import { toast } from 'sonner';
import axios from 'axios';

interface EnderecoIdosoProps {
  data: ContratanteData;
  updateData: (data: Partial<ContratanteData>) => void;
  onNext: () => void;
  onPrevious: () => void;
}

interface ViaCepResponse {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  erro?: boolean;
}

const EnderecoIdoso: React.FC<EnderecoIdosoProps> = ({ 
  data, 
  updateData, 
  onNext, 
  onPrevious 
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    cep: data.cep || '',
    estado: data.estado || '',
    cidade: data.cidade || '',
    bairro: data.bairro || '',
    endereco: data.endereco || '',
    numero: data.numero || '',
    complemento: data.complemento || '',
    referencia: data.referencia || ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    let processedValue = value;

    // Aplicar formatação específica baseada no campo
    if (id === 'cep') {
      // Remover caracteres não numéricos e limitar a 8 dígitos
      processedValue = value.replace(/\D/g, '').slice(0, 8);
      
      // Se o CEP estiver completo, buscar o endereço
      if (processedValue.length === 8) {
        buscarCep(processedValue);
      }
    }

    setFormData(prev => ({
      ...prev,
      [id]: processedValue
    }));
  };

  const buscarCep = async (cep: string) => {
    setIsLoading(true);
    try {
      const response = await axios.get<ViaCepResponse>(`https://viacep.com.br/ws/${cep}/json/`);
      const data = response.data;

      if (data.erro) {
        toast.error('CEP não encontrado');
        return;
      }

      setFormData(prev => ({
        ...prev,
        estado: data.uf,
        cidade: data.localidade,
        bairro: data.bairro,
        endereco: data.logradouro,
        complemento: data.complemento
      }));
    } catch (error) {
      console.error('Erro ao buscar CEP:', error);
      toast.error('Erro ao buscar o CEP. Por favor, tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const formatCep = (cep: string) => {
    return cep.replace(/(\d{5})(\d{3})/, '$1-$2');
  };

  const validateForm = () => {
    // Validar CEP
    if (!formData.cep || formData.cep.length !== 8) {
      toast.error('Por favor, insira um CEP válido');
      return false;
    }

    // Validar estado
    if (!formData.estado) {
      toast.error('Por favor, selecione um estado');
      return false;
    }

    // Validar cidade
    if (!formData.cidade) {
      toast.error('Por favor, insira a cidade');
      return false;
    }

    // Validar bairro
    if (!formData.bairro) {
      toast.error('Por favor, insira o bairro');
      return false;
    }

    // Validar endereço
    if (!formData.endereco) {
      toast.error('Por favor, insira o endereço');
      return false;
    }

    // Validar número
    if (!formData.numero) {
      toast.error('Por favor, insira o número');
      return false;
    }

    // Validar complemento
    if (!formData.complemento) {
      toast.error('Por favor, insira o complemento');
      return false;
    }

    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    updateData(formData);
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
          value={formData.cep}
          onChange={handleChange}
          mask="99999-999"
          disabled={isLoading}
        />

        <FormInput 
          label="Estado"
          type="text"
          id="estado"
          required
          value={formData.estado}
          onChange={handleChange}
          disabled={isLoading}
        />
        
        <FormInput 
          label="Cidade"
          type="text"
          id="cidade"
          required
          value={formData.cidade}
          onChange={handleChange}
          disabled={isLoading}
        />
        
        <FormInput 
          label="Bairro"
          type="text"
          id="bairro"
          required
          value={formData.bairro}
          onChange={handleChange}
          disabled={isLoading}
        />
        
        <FormInput 
          label="Endereço"
          type="text"
          id="endereco"
          required
          value={formData.endereco}
          onChange={handleChange}
          disabled={isLoading}
        />
        
        <FormInput 
          label="Número"
          type="text"
          id="numero"
          required
          value={formData.numero}
          onChange={handleChange}
        />
        
        <FormInput 
          label="Complemento"
          type="text"
          id="complemento"
          required
          value={formData.complemento}
          onChange={handleChange}
          placeholder="Apartamento, bloco, etc."
        />
        
        <FormInput 
          label="Referência"
          type="text"
          id="referencia"
          value={formData.referencia}
          onChange={handleChange}
          placeholder="Ex: Próximo ao mercado, farmácia, etc."
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
          disabled={isLoading}
        >
          Avançar
          <ArrowRight size={18} />
        </button>
      </div>
    </form>
  );
};

export default EnderecoIdoso;
