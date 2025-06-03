import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import FormHeader from './FormHeader';
import FormInput from './FormInput';
import SelectInput from './SelectInput';
import { cuidadorService } from '../services/api';

const CuidadorForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nome: '',
    cpf: '',
    email: '',
    dataNascimento: '',
    telefone: '',
    genero: '',
    senha: '',
    confirmarSenha: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value
    });
  };

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
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
    return numbers.length === 11;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validações
    if (!validateEmail(formData.email)) {
      toast.error("Por favor, insira um e-mail válido!");
      return;
    }

    if (!validatePassword(formData.senha)) {
      toast.error("A senha deve ter no mínimo 8 caracteres e conter pelo menos um caractere especial!");
      return;
    }

    if (formData.senha !== formData.confirmarSenha) {
      toast.error("As senhas não coincidem!");
      return;
    }

    if (!validateCPF(formData.cpf)) {
      toast.error("Por favor, insira um CPF válido!");
      return;
    }

    if (!validatePhone(formData.telefone)) {
      toast.error("Por favor, insira um telefone válido!");
      return;
    }
    
    if (!formData.nome || !formData.cpf || !formData.email || !formData.dataNascimento || !formData.telefone || !formData.genero) {
      toast.error("Por favor, preencha todos os campos obrigatórios!");
      return;
    }

    try {
      setIsSubmitting(true);
      
      const { confirmarSenha, ...cuidadorData } = formData;
      
      const response = await cuidadorService.cadastrar(cuidadorData);
      console.log('Resposta da API:', response);
      
      toast.success("Cadastro realizado com sucesso!");
      navigate('/login'); // Redireciona para a página de login após o cadastro
    } catch (error: any) {
      console.error('Erro durante o cadastro:', error);
      toast.error(error.response?.data?.message || "Erro ao processar o cadastro. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const generoOptions = [
    { value: 'masculino', label: 'Masculino' },
    { value: 'feminino', label: 'Feminino' },
    { value: 'outro', label: 'Outro' },
    { value: 'prefiro-nao-informar', label: 'Prefiro não informar' }
  ];

  return (
    <div className="container mx-auto max-w-2xl px-4 py-8">
      <FormHeader />
      
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-6 md:p-10 mt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormInput 
            label="Nome Completo"
            type="text"
            id="nome"
            required
            value={formData.nome}
            onChange={handleChange}
          />
          
          <FormInput 
            label="CPF"
            type="text"
            id="cpf"
            required
            value={formData.cpf}
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
            value={formData.email}
            onChange={handleChange}
          />
          
          <FormInput 
            label="Data de Nascimento"
            type="date"
            id="dataNascimento"
            required
            value={formData.dataNascimento}
            onChange={handleChange}
          />
          
          <FormInput 
            label="Número de Telefone"
            type="tel"
            id="telefone"
            required
            value={formData.telefone}
            onChange={handleChange}
            mask="(99) 99999-9999"
            placeholder="Digite os 11 números do telefone"
          />
          
          <SelectInput 
            label="Gênero"
            id="genero"
            options={generoOptions}
            required
            value={formData.genero}
            onChange={handleChange}
          />
          
          <FormInput 
            label="Senha"
            type="password"
            id="senha"
            required
            value={formData.senha}
            onChange={handleChange}
            placeholder="Mínimo 8 caracteres e 1 caractere especial"
          />
          
          <FormInput 
            label="Confirmar Senha"
            type="password"
            id="confirmarSenha"
            required
            value={formData.confirmarSenha}
            onChange={handleChange}
          />
        </div>

        <div className="flex justify-between mt-10">
          <button 
            type="button"
            onClick={() => navigate('/cadastro')}
            className="bg-gray-300 text-gray-700 py-3 px-12 rounded-full hover:bg-gray-400 transition-colors"
          >
            Voltar
          </button>

          <button 
            type="submit"
            className="bg-[#0056a4] text-white py-3 px-12 rounded-full flex items-center gap-2 hover:bg-[#004483] transition-colors"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Cadastrando...' : 'Cadastrar'}
            <ArrowRight size={18} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default CuidadorForm;
