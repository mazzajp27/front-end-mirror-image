import React, { useState } from 'react';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import FormInput from '../FormInput';
import SelectInput from '../SelectInput';
import { CuidadorData } from '../../services/api';
import { toast } from 'sonner';
import { maskCPF, maskPhone, validateCPF, validatePhone } from '../../utils/masks';

interface DadosCuidadorProps {
  data: CuidadorData;
  updateData: (data: Partial<CuidadorData>) => void;
  onNext: () => void;
}

const DadosCuidador: React.FC<DadosCuidadorProps> = ({ data, updateData, onNext }) => {
  const navigate = useNavigate();
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    let formattedValue = value;
    let error = '';

    // Aplicar máscaras e validações
    if (id === 'cpf') {
      formattedValue = maskCPF(value);
      if (value && !validateCPF(value)) {
        error = 'CPF inválido';
      }
    } else if (id === 'telefone') {
      formattedValue = maskPhone(value);
      if (value && !validatePhone(value)) {
        error = 'Telefone inválido';
      }
    }

    // Atualizar erros
    setErrors(prev => ({
      ...prev,
      [id]: error
    }));

    // Atualizar dados
    updateData({
      ...data,
      [id]: formattedValue
    });
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

    // Validar força da senha
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(data.senha);
    if (data.senha.length < 8 || !hasSpecialChar) {
      toast.error("A senha deve ter no mínimo 8 caracteres e conter pelo menos um caractere especial!");
      return;
    }

    // Validar CPF
    if (!validateCPF(data.cpf)) {
      toast.error("CPF inválido!");
      return;
    }

    // Validar telefone
    if (!validatePhone(data.telefone)) {
      toast.error("Telefone inválido!");
      return;
    }
    
    // Validar campos obrigatórios
    const requiredFields = ['nome', 'cpf', 'email', 'dataNascimento', 'telefone', 'genero', 'senha'];
    const newErrors: {[key: string]: string} = {};
    
    requiredFields.forEach(field => {
      if (!data[field]) {
        newErrors[field] = 'Campo obrigatório';
      }
    });

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (data.email && !emailRegex.test(data.email)) {
      newErrors.email = 'Email inválido';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      toast.error('Por favor, corrija os erros antes de continuar.');
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
          value={data.nome || ''}
          onChange={handleChange}
          error={errors.nome}
        />
        
        <FormInput 
          label="CPF"
          type="text"
          id="cpf"
          required
          value={data.cpf || ''}
          onChange={handleChange}
          error={errors.cpf}
          maxLength={14}
          placeholder="000.000.000-00"
        />
        
        <FormInput 
          label="E-mail"
          type="email"
          id="email"
          required
          value={data.email || ''}
          onChange={handleChange}
          error={errors.email}
          placeholder="exemplo@email.com"
        />
        
        <FormInput 
          label="Data de Nascimento"
          type="date"
          id="dataNascimento"
          required
          value={data.dataNascimento || ''}
          onChange={handleChange}
          error={errors.dataNascimento}
        />
        
        <FormInput 
          label="Número de Telefone"
          type="text"
          id="telefone"
          required
          value={data.telefone || ''}
          onChange={handleChange}
          error={errors.telefone}
          maxLength={15}
          placeholder="(00) 00000-0000"
        />
        
        <SelectInput 
          label="Gênero"
          id="genero"
          options={generoOptions}
          required
          value={data.genero || ''}
          onChange={handleChange}
          error={errors.genero}
        />
        
        <FormInput 
          label="Senha"
          type="password"
          id="senha"
          required
          value={data.senha || ''}
          onChange={handleChange}
          error={errors.senha}
        />
        
        <FormInput 
          label="Confirmar Senha"
          type="password"
          id="confirmarSenha"
          required
          value={confirmarSenha}
          onChange={handleConfirmPasswordChange}
          error={errors.confirmarSenha}
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

export default DadosCuidador;
