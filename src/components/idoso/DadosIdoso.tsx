import React, { useState } from 'react';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import FormInput from '../FormInput';
import SelectInput from '../SelectInput';
import { ContratanteData } from '../../services/api';
import { toast } from 'sonner';

interface DadosIdosoProps {
  data: ContratanteData;
  updateData: (data: Partial<ContratanteData>) => void;
  onNext: () => void;
}

const DadosIdoso: React.FC<DadosIdosoProps> = ({ data, updateData, onNext }) => {
  const navigate = useNavigate();
  const [confirmarSenha, setConfirmarSenha] = useState("");

  const applyMask = (value: string, type: 'cpf' | 'phone'): string => {
    // Remove todos os caracteres não numéricos
    const numbers = value.replace(/\D/g, '');
    
    switch (type) {
      case 'cpf':
        if (numbers.length <= 3) return numbers;
        if (numbers.length <= 6) return `${numbers.slice(0, 3)}.${numbers.slice(3)}`;
        if (numbers.length <= 9) return `${numbers.slice(0, 3)}.${numbers.slice(3, 6)}.${numbers.slice(6)}`;
        return `${numbers.slice(0, 3)}.${numbers.slice(3, 6)}.${numbers.slice(6, 9)}-${numbers.slice(9, 11)}`;
      
      case 'phone':
        if (numbers.length <= 2) return numbers;
        if (numbers.length <= 7) return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
        return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`;
      
      default:
        return value;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    
    // Aplica máscara baseado no tipo de campo
    let formattedValue = value;
    if (id === 'cpf') {
      formattedValue = applyMask(value, 'cpf');
    } else if (id === 'telefone' || id === 'telefone_emergencia') {
      formattedValue = applyMask(value, 'phone');
    }
    
    updateData({ [id]: formattedValue });
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmarSenha(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validar se as senhas coincidem
    if (data.senha !== confirmarSenha) {
      toast.error("As senhas não coincidem!");
      return;
    }
    
    // Validar campos obrigatórios
    if (!data.nome || !data.cpf || !data.email || !data.telefone || !data.senha) {
      toast.error("Por favor, preencha todos os campos obrigatórios!");
      return;
    }

    // Validar formato do CPF (apenas verifica se tem 11 dígitos)
    const cpfNumbers = data.cpf.replace(/\D/g, '');
    if (cpfNumbers.length !== 11) {
      toast.error("CPF inválido! Digite os 11 números do CPF.");
      return;
    }

    // Validar formato do email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      toast.error("E-mail inválido!");
      return;
    }

    // Validar formato do telefone (apenas verifica se tem 11 dígitos)
    const telefoneNumbers = data.telefone.replace(/\D/g, '');
    if (telefoneNumbers.length !== 11) {
      toast.error("Telefone inválido! Digite os 11 números do telefone.");
      return;
    }

    if (data.telefone_emergencia) {
      const telefoneEmergenciaNumbers = data.telefone_emergencia.replace(/\D/g, '');
      if (telefoneEmergenciaNumbers.length !== 11) {
        toast.error("Telefone de emergência inválido! Digite os 11 números do telefone.");
        return;
      }
    }

    onNext();
  };

  const handleGoBack = () => {
    navigate('/tipo-cadastro');
  };

  const generoOptions = [
    { value: 'masculino', label: 'Masculino' },
    { value: 'feminino', label: 'Feminino' },
    { value: 'outro', label: 'Outro' },
    { value: 'prefiro-nao-informar', label: 'Prefiro não informar' }
  ];

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormInput 
          label="Nome Completo"
          type="text"
          id="nome"
          required
          value={data.nome}
          onChange={handleChange}
        />
        
        <FormInput 
          label="CPF"
          type="text"
          id="cpf"
          required
          value={data.cpf}
          onChange={handleChange}
          placeholder="Digite os 11 números do CPF"
        />
        
        <FormInput 
          label="E-mail"
          type="email"
          id="email"
          placeholder="exemplo@email.com"
          required
          value={data.email}
          onChange={handleChange}
        />
        
        <FormInput 
          label="Data de Nascimento"
          type="date"
          id="data_nascimento"
          value={data.data_nascimento || ''}
          onChange={handleChange}
        />
        
        <FormInput 
          label="Número de Telefone"
          type="tel"
          id="telefone"
          required
          value={data.telefone}
          onChange={handleChange}
          placeholder="Digite os 11 números do telefone"
        />
        
        <FormInput 
          label="Telefone de Emergência"
          type="tel"
          id="telefone_emergencia"
          value={data.telefone_emergencia || ''}
          onChange={handleChange}
          placeholder="Digite os 11 números do telefone"
        />
        
        <SelectInput 
          label="Gênero"
          id="genero"
          options={generoOptions}
          value={data.genero || ''}
          onChange={handleChange}
        />
        
        <FormInput 
          label="Senha"
          type="password"
          id="senha"
          required
          value={data.senha}
          onChange={handleChange}
        />
        
        <FormInput 
          label="Confirmar Senha"
          type="password"
          id="confirmarSenha"
          required
          value={confirmarSenha}
          onChange={handleConfirmPasswordChange}
        />
      </div>
      
      <div className="flex justify-between mt-10">
        <button 
          type="button"
          onClick={handleGoBack}
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

export default DadosIdoso;
