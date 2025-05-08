
import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { toast } from 'sonner';
import FormHeader from './FormHeader';
import StepIndicator from './StepIndicator';
import FormInput from './FormInput';
import SelectInput from './SelectInput';
import { cuidadorService } from '../services/api';

const CuidadorForm = () => {
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validar se as senhas coincidem
    if (formData.senha !== formData.confirmarSenha) {
      toast.error("As senhas não coincidem!");
      return;
    }
    
    // Validar outros campos, se necessário
    if (!formData.nome || !formData.cpf || !formData.email || !formData.dataNascimento || !formData.telefone) {
      toast.error("Por favor, preencha todos os campos obrigatórios!");
      return;
    }

    try {
      setIsSubmitting(true);
      
      // Enviar dados para API (excluindo confirmarSenha que é apenas para validação)
      const { confirmarSenha, ...cuidadorData } = formData;
      
      const response = await cuidadorService.cadastrar(cuidadorData);
      console.log('Resposta da API:', response);
      
      toast.success("Cadastro realizado com sucesso!");
      // Aqui você pode implementar navegação para a próxima etapa
      // ou qualquer outra ação após o cadastro bem-sucedido
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
      <StepIndicator currentStep={1} />
      
      <form onSubmit={handleSubmit}>
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
        
        <div className="flex justify-center mt-10">
          <button 
            type="submit" 
            className="bg-[#0056a4] text-white py-3 px-12 rounded-full flex items-center gap-2 hover:bg-[#004483] transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Enviando...' : 'Avançar'}
            {!isSubmitting && <ArrowRight size={18} />}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CuidadorForm;
