
import React, { useState } from 'react';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
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
    if (!data.nome || !data.cpf || !data.email || !data.telefone || !data.genero || !data.senha || !data.data_nascimento) {
      toast.error("Por favor, preencha todos os campos obrigatórios!");
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
          required
          value={data.data_nascimento}
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
          required
          value={data.telefone_emergencia || ''}
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
