import React, { useState } from 'react';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import FormInput from '../FormInput';
import SelectInput from '../SelectInput';
import { ContratanteData } from '../../services/api';
import { toast } from 'sonner';
import { maskCPF, maskPhone, validateCPF, validatePhone } from '../../utils/masks';

interface DadosIdosoProps {
  data: ContratanteData;
  updateData: (data: Partial<ContratanteData>) => void;
  onNext: () => void;
}

const DadosIdoso: React.FC<DadosIdosoProps> = ({ 
  data, 
  updateData, 
  onNext 
}) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nome: data.nome || '',
    cpf: data.cpf || '',
    email: data.email || '',
    telefone: data.telefone || '',
    telefone_emergencia: data.telefone_emergencia || '',
    senha: data.senha || '',
    confirmarSenha: '',
    genero: data.genero || '',
    data_nascimento: data.data_nascimento || ''
  });
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    let formattedValue = value;
    let error = '';

    if (id === 'cpf') {
      formattedValue = maskCPF(value);
      if (value && !validateCPF(value)) {
        error = 'CPF inválido';
      }
    } else if (id === 'telefone' || id === 'telefone_emergencia') {
      formattedValue = maskPhone(value);
      if (value && !validatePhone(value)) {
        error = 'Telefone inválido';
      }
    }

    setErrors(prev => ({
      ...prev,
      [id]: error
    }));

    setFormData(prev => ({
      ...prev,
      [id]: formattedValue
    }));
  };

  const validateForm = () => {
    // Validar nome
    if (!formData.nome.trim()) {
      toast.error('Por favor, preencha o nome completo');
      return false;
    }

    // Validar CPF
    if (!validateCPF(formData.cpf)) {
      toast.error('Por favor, insira um CPF válido');
      return false;
    }

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error('Por favor, insira um email válido');
      return false;
    }

    // Validar telefone
    const phoneNumbers = formData.telefone.replace(/\D/g, '');
    if (!validatePhone(formData.telefone)) {
      toast.error('Por favor, insira um telefone válido com DDD');
      return false;
    }

    // Validar telefone de emergência
    const emergencyPhoneNumbers = formData.telefone_emergencia.replace(/\D/g, '');
    if (!validatePhone(formData.telefone_emergencia)) {
      toast.error('Por favor, insira um telefone de emergência válido com DDD');
      return false;
    }

    // Validar se os telefones são diferentes
    if (phoneNumbers === emergencyPhoneNumbers) {
      toast.error('O telefone de emergência deve ser diferente do telefone principal');
      return false;
    }

    // Validar senha
    if (!formData.senha || formData.senha.length < 8) {
      toast.error('A senha deve ter pelo menos 8 caracteres');
      return false;
    }

    // Validar se a senha contém caractere especial
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
    if (!specialCharRegex.test(formData.senha)) {
      toast.error('A senha deve conter pelo menos um caractere especial (!@#$%^&*(),.?":{}|<>)');
      return false;
    }

    // Validar confirmação de senha
    if (formData.senha !== formData.confirmarSenha) {
      toast.error('As senhas não coincidem');
      return false;
    }

    // Validar gênero
    if (!formData.genero) {
      toast.error('Por favor, selecione um gênero');
      return false;
    }

    // Validar data de nascimento
    if (!formData.data_nascimento) {
      toast.error('Por favor, insira a data de nascimento');
      return false;
    }

    // Validar idade mínima (60 anos em 2025)
    const birthDate = new Date(formData.data_nascimento);
    const yearIn2025 = 2025;
    const ageIn2025 = yearIn2025 - birthDate.getFullYear();
    
    if (ageIn2025 < 60) {
      toast.error('É necessário ter no mínimo 60 anos em 2025 para se cadastrar');
      return false;
    }

    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Remove confirmarSenha before updating data
    const { confirmarSenha, ...dataToUpdate } = formData;
    updateData(dataToUpdate);
    onNext();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormInput 
          label="Nome Completo"
          type="text"
          id="nome"
          required
          value={formData.nome}
          onChange={handleChange}
          error={errors.nome}
        />

        <FormInput 
          label="CPF"
          type="text"
          id="cpf"
          required
          value={formData.cpf}
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
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          placeholder="exemplo@email.com"
        />

        <FormInput 
          label="Data de Nascimento"
          type="date"
          id="data_nascimento"
          required
          value={formData.data_nascimento}
          onChange={handleChange}
          error={errors.data_nascimento}
        />

        <FormInput 
          label="Número de Telefone"
          type="text"
          id="telefone"
          required
          value={formData.telefone}
          onChange={handleChange}
          error={errors.telefone}
          maxLength={15}
          placeholder="(00) 00000-0000"
        />

        <SelectInput 
          label="Gênero"
          id="genero"
          options={[
            { value: 'masculino', label: 'Masculino' },
            { value: 'feminino', label: 'Feminino' },
            { value: 'outro', label: 'Outro' },
            { value: 'prefiro-nao-informar', label: 'Prefiro não informar' }
          ]}
          required
          value={formData.genero}
          onChange={handleChange}
          error={errors.genero}
        />

        <FormInput 
          label="Senha"
          type="password"
          id="senha"
          required
          value={formData.senha}
          onChange={handleChange}
          error={errors.senha}
        />

        <FormInput 
          label="Confirmar Senha"
          type="password"
          id="confirmarSenha"
          required
          value={formData.confirmarSenha}
          onChange={e => setFormData(prev => ({ ...prev, confirmarSenha: (e.target as HTMLInputElement).value }))}
          error={errors.confirmarSenha}
        />

        <div className="md:col-span-2">
          <div className="md:w-1/2 md:mx-auto">
            <FormInput 
              label="Telefone de Emergência"
              type="text"
              id="telefone_emergencia"
              required
              value={formData.telefone_emergencia}
              onChange={handleChange}
              error={errors.telefone_emergencia}
              maxLength={15}
              placeholder="(00) 00000-0000"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-between mt-10">
        <button 
          type="button"
          onClick={() => navigate('/tipo-cadastro')}
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
