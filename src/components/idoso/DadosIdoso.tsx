
import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import FormInput from '../FormInput';
import SelectInput from '../SelectInput';
import { IdosoData } from '../../services/api';
import { toast } from 'sonner';

interface DadosIdosoProps {
  data: IdosoData;
  updateData: (data: Partial<IdosoData>) => void;
  onNext: () => void;
}

const DadosIdoso: React.FC<DadosIdosoProps> = ({ data, updateData, onNext }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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
    if (!data.nome || !data.cpf || !data.email || !data.telefone || !data.genero || !data.senha) {
      toast.error("Por favor, preencha todos os campos obrigatórios!");
      return;
    }

    onNext();
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
          label="CEP"
          type="text"
          id="cep"
          required
          value={data.cep}
          onChange={handleChange}
          mask="99999-999"
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
        
        <SelectInput 
          label="Gênero"
          id="genero"
          options={generoOptions}
          required
          value={data.genero}
          onChange={handleChange}
        />
        
        <div className="relative">
          <FormInput 
            label="Senha"
            type={showPassword ? "text" : "password"}
            id="senha"
            required
            value={data.senha}
            onChange={handleChange}
          />
          <button 
            type="button"
            className="absolute right-3 top-9 text-gray-500"
            onClick={() => setShowPassword(!showPassword)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
              <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          </button>
        </div>
        
        <div className="relative">
          <FormInput 
            label="Confirmar Senha"
            type={showConfirmPassword ? "text" : "password"}
            id="confirmarSenha"
            required
            value={confirmarSenha}
            onChange={handleConfirmPasswordChange}
          />
          <button 
            type="button"
            className="absolute right-3 top-9 text-gray-500"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
              <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          </button>
        </div>
      </div>
      
      <div className="flex justify-center mt-10">
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
