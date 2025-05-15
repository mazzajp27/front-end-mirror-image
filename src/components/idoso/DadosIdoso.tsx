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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    updateData({ [id]: value });
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

    // Validar formato do CPF
    const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
    if (!cpfRegex.test(data.cpf)) {
      toast.error("CPF inválido! Use o formato: 000.000.000-00");
      return;
    }

    // Validar formato do email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      toast.error("E-mail inválido!");
      return;
    }

    // Validar formato do telefone
    const telefoneRegex = /^\(\d{2}\) \d{5}-\d{4}$/;
    if (!telefoneRegex.test(data.telefone)) {
      toast.error("Telefone inválido! Use o formato: (00) 00000-0000");
      return;
    }

    if (data.telefone_emergencia && !telefoneRegex.test(data.telefone_emergencia)) {
      toast.error("Telefone de emergência inválido! Use o formato: (00) 00000-0000");
      return;
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
          mask="999.999.999-99"
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
          mask="(99) 99999-9999"
        />
        
        <FormInput 
          label="Telefone de Emergência"
          type="tel"
          id="telefone_emergencia"
          value={data.telefone_emergencia || ''}
          onChange={handleChange}
          mask="(99) 99999-9999"
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
