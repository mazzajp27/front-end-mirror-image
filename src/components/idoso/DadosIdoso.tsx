import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import FormInput from '../FormInput';
import SelectInput from '../SelectInput';
import { ContratanteData } from '../../services/api';
import { toast } from 'sonner';

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    let processedValue = value;

    // Aplicar formatação específica baseada no campo
    if (id === 'cpf') {
      // Remove caracteres não numéricos
      const numbersOnly = value.replace(/\D/g, '').slice(0, 11);
      
      // Aplica a formatação enquanto digita
      processedValue = numbersOnly.replace(/^(\d{0,3})(\d{0,3})(\d{0,3})(\d{0,2}).*/, (_, p1, p2, p3, p4) => {
        if (p4) return `${p1}.${p2}.${p3}-${p4}`;
        if (p3) return `${p1}.${p2}.${p3}`;
        if (p2) return `${p1}.${p2}`;
        return p1;
      }).replace(/[.-]$/, '');

    } else if (id === 'telefone' || id === 'telefone_emergencia') {
      // Remove caracteres não numéricos
      const numbersOnly = value.replace(/\D/g, '').slice(0, 11);
      
      // Aplica a formatação enquanto digita
      processedValue = numbersOnly.replace(/^(\d{0,2})(\d{0,5})(\d{0,4}).*/, (_, ddd, prefix, suffix) => {
        if (suffix) return `(${ddd}) ${prefix}-${suffix}`;
        if (prefix) return `(${ddd}) ${prefix}`;
        if (ddd) return `(${ddd}`;
        return ddd;
      }).replace(/[()-]$/, '');
    }

    setFormData(prev => ({
      ...prev,
      [id]: processedValue
    }));
  };

  const validateForm = () => {
    // Validar nome
    if (!formData.nome.trim()) {
      toast.error('Por favor, preencha o nome completo');
      return false;
    }

    // Validar CPF
    const cpfNumbers = formData.cpf.replace(/\D/g, '');
    if (!cpfNumbers || cpfNumbers.length !== 11) {
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
    if (!phoneNumbers || phoneNumbers.length < 10 || phoneNumbers.length > 11) {
      toast.error('Por favor, insira um telefone válido com DDD');
      return false;
    }

    // Validar telefone de emergência
    const emergencyPhoneNumbers = formData.telefone_emergencia.replace(/\D/g, '');
    if (!emergencyPhoneNumbers || emergencyPhoneNumbers.length < 10 || emergencyPhoneNumbers.length > 11) {
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
    <form onSubmit={handleSubmit} className="space-y-6">
      <FormInput
        label="Nome Completo"
        id="nome"
        type="text"
        value={formData.nome}
        onChange={handleChange}
        required
      />

      <FormInput
        label="CPF"
        id="cpf"
        type="text"
        value={formData.cpf}
        onChange={handleChange}
        placeholder="Digite apenas números"
        required
      />

      <FormInput
        label="Email"
        id="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        required
      />

      <FormInput
        label="Telefone"
        id="telefone"
        type="text"
        value={formData.telefone}
        onChange={handleChange}
        placeholder="Digite apenas números"
        required
      />

      <FormInput
        label="Telefone de Emergência"
        id="telefone_emergencia"
        type="text"
        value={formData.telefone_emergencia}
        onChange={handleChange}
        placeholder="Digite apenas números (diferente do telefone principal)"
        required
      />

      <FormInput
        label="Senha"
        id="senha"
        type="password"
        value={formData.senha}
        onChange={handleChange}
        placeholder="Mínimo 8 caracteres e 1 caractere especial"
        required
      />

      <FormInput
        label="Confirmar Senha"
        id="confirmarSenha"
        type="password"
        value={formData.confirmarSenha}
        onChange={handleChange}
        required
      />

      <SelectInput
        label="Gênero"
        id="genero"
        value={formData.genero}
        onChange={handleChange}
        required
        options={[
          { value: '', label: 'Selecione um gênero' },
          { value: 'masculino', label: 'Masculino' },
          { value: 'feminino', label: 'Feminino' },
          { value: 'outro', label: 'Outro' },
          { value: 'prefiro_nao_dizer', label: 'Prefiro não dizer' }
        ]}
      />

      <FormInput
        label="Data de Nascimento"
        id="data_nascimento"
        type="date"
        value={formData.data_nascimento}
        onChange={handleChange}
        required
      />

      <div className="flex justify-end mt-10">
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

export default DadosIdoso;
