import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { toast } from 'sonner';
import FormInput from '../FormInput';
import SelectInput from '../SelectInput';
import { CuidadorData } from '../../services/api';

interface DadosCuidadorProps {
  data: CuidadorData;
  updateData: (data: Partial<CuidadorData>) => void;
  onNext: () => void;
}

const DadosCuidador: React.FC<DadosCuidadorProps> = ({ data, updateData, onNext }) => {
  const navigate = useNavigate();
  const [confirmarSenha, setConfirmarSenha] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    if (id === 'confirmarSenha') {
      setConfirmarSenha(value);
    } else {
      updateData({ [id]: value });
    }
  };

  const validatePassword = (password: string) => {
    return password.length >= 8 && /[!@#$%^&*(),.?":{}|<>]/.test(password);
  };

  const validateCPF = (cpf: string) => {
    const numbers = cpf.replace(/\D/g, '');
    return numbers.length === 11;
  };

  const validatePhone = (phone: string) => {
    const numbers = phone.replace(/\D/g, '');
    return numbers.length >= 11;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validar se as senhas coincidem
    if (data.senha !== confirmarSenha) {
      toast.error("As senhas não coincidem!");
      return;
    }

    // Validar força da senha
    if (!validatePassword(data.senha)) {
      toast.error("A senha deve ter no mínimo 8 caracteres e conter pelo menos um caractere especial!");
      return;
    }

    // Validar CPF
    if (!validateCPF(data.cpf)) {
      toast.error("O CPF deve conter exatamente 11 números!");
      return;
    }

    // Validar telefone
    if (!validatePhone(data.telefone)) {
      toast.error("O telefone deve conter no mínimo 11 números!");
      return;
    }
    
    // Validar campos obrigatórios
    if (!data.nome || !data.cpf || !data.email || !data.dataNascimento || !data.telefone || !data.genero || !data.senha) {
      toast.error("Por favor, preencha todos os campos obrigatórios!");
      return;
    }

    onNext();
  };

  const handleGoBack = () => {
    navigate('/cadastro');
  };

  const generoOptions = [
    { value: 'masculino', label: 'Masculino' },
    { value: 'feminino', label: 'Feminino' },
    { value: 'outro', label: 'Outro' },
    { value: 'prefiro-nao-informar', label: 'Prefiro não informar' }
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
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
        id="dataNascimento"
        required
        value={data.dataNascimento}
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
        placeholder="Digite os 11 números do telefone"
      />
      
      <SelectInput 
        label="Gênero"
        id="genero"
        options={generoOptions}
        required
        value={data.genero}
        onChange={handleChange}
      />
      
      <FormInput 
        label="Senha"
        type="password"
        id="senha"
        required
        value={data.senha}
        onChange={handleChange}
        placeholder="Mínimo 8 caracteres e 1 caractere especial"
      />
      
      <FormInput 
        label="Confirmar Senha"
        type="password"
        id="confirmarSenha"
        required
        value={confirmarSenha}
        onChange={handleChange}
      />

      <div className="flex justify-between mt-10">
        <button 
          type="button"
          onClick={handleGoBack}
          className="bg-gray-300 text-gray-700 py-3 px-12 rounded-full hover:bg-gray-400 transition-colors"
        >
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

export default DadosCuidador;
