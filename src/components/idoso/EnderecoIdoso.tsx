import React from 'react';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import FormInput from '../FormInput';
import SelectInput from '../SelectInput';
import { ContratanteData } from '../../services/api';
import { toast } from 'sonner';

interface EnderecoIdosoProps {
  data: ContratanteData;
  updateData: (data: Partial<ContratanteData>) => void;
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
    if (!data.estado || !data.cidade || !data.endereco || !data.bairro || !data.cep || !data.numero) {
      toast.error("Por favor, preencha todos os campos obrigatórios!");
      return;
    }

    // Validar formato do CEP
    const cepRegex = /^\d{5}-\d{3}$/;
    if (!cepRegex.test(data.cep)) {
      toast.error("CEP inválido! Use o formato: 00000-000");
      return;
    }

    onNext();
  };

  const estadosOptions = [
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
  ];

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SelectInput 
          label="Estado"
          id="estado"
          options={estadosOptions}
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
          placeholder="00000-000"
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
          value={data.complemento || ''}
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
