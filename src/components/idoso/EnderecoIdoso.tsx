import React, { useState } from 'react';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import FormInput from '../FormInput';
import SelectInput from '../SelectInput';
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
    <form onSubmit={handleSubmit} className="space-y-6">
      <FormInput
        label="CEP"
        id="cep"
        type="text"
        value={formData.cep}
        onChange={handleChange}
        placeholder="Digite apenas números"
        mask={formData.cep ? formatCep(formData.cep) : ''}
        required
        disabled={isLoading}
      />

      <SelectInput
        label="Estado"
        id="estado"
        value={formData.estado}
        onChange={handleChange}
        required
        options={[
          { value: '', label: 'Selecione um estado' },
          { value: 'AC', label: 'Acre' },
          { value: 'AL', label: 'Alagoas' },
          { value: 'AP', label: 'Amapá' },
          { value: 'AM', label: 'Amazonas' },
          { value: 'BA', label: 'Bahia' },
          { value: 'CE', label: 'Ceará' },
          { value: 'DF', label: 'Distrito Federal' },
          { value: 'ES', label: 'Espírito Santo' },
          { value: 'GO', label: 'Goiás' },
          { value: 'MA', label: 'Maranhão' },
          { value: 'MT', label: 'Mato Grosso' },
          { value: 'MS', label: 'Mato Grosso do Sul' },
          { value: 'MG', label: 'Minas Gerais' },
          { value: 'PA', label: 'Pará' },
          { value: 'PB', label: 'Paraíba' },
          { value: 'PR', label: 'Paraná' },
          { value: 'PE', label: 'Pernambuco' },
          { value: 'PI', label: 'Piauí' },
          { value: 'RJ', label: 'Rio de Janeiro' },
          { value: 'RN', label: 'Rio Grande do Norte' },
          { value: 'RS', label: 'Rio Grande do Sul' },
          { value: 'RO', label: 'Rondônia' },
          { value: 'RR', label: 'Roraima' },
          { value: 'SC', label: 'Santa Catarina' },
          { value: 'SP', label: 'São Paulo' },
          { value: 'SE', label: 'Sergipe' },
          { value: 'TO', label: 'Tocantins' }
        ]}
      />

      <FormInput
        label="Cidade"
        id="cidade"
        type="text"
        value={formData.cidade}
        onChange={handleChange}
        required
      />

      <FormInput
        label="Bairro"
        id="bairro"
        type="text"
        value={formData.bairro}
        onChange={handleChange}
        required
      />

      <FormInput
        label="Endereço"
        id="endereco"
        type="text"
        value={formData.endereco}
        onChange={handleChange}
        required
      />

      <FormInput
        label="Número"
        id="numero"
        type="text"
        value={formData.numero}
        onChange={handleChange}
        required
      />

      <FormInput
        label="Complemento"
        id="complemento"
        type="text"
        value={formData.complemento}
        onChange={handleChange}
        placeholder="Apartamento, bloco, etc."
        required
      />

      <FormInput
        label="Ponto de Referência"
        id="referencia"
        type="text"
        value={formData.referencia}
        onChange={handleChange}
        placeholder="Ex: Próximo ao mercado, farmácia, etc. (opcional)"
      />

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
          Próximo
          <ArrowRight size={18} />
        </button>
      </div>
    </form>
  );
};

export default EnderecoIdoso;
