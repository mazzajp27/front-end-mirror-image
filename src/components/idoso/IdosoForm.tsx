import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import FormHeader from '../FormHeader';
import StepIndicator from '../StepIndicator';
import { ContratanteData, contratanteService } from '../../services/api';
import DadosIdoso from './DadosIdoso';

const IdosoForm: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<ContratanteData>({
    nome: '',
    cpf: '',
    email: '',
    telefone: '',
    telefone_emergencia: '',
    senha: '',
    genero: '',
    data_nascimento: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateFormData = (data: Partial<ContratanteData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const handleNext = () => {
    // Como agora só temos uma etapa, vamos enviar o formulário diretamente
    handleSubmit();
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      
      // Formatar a data antes de enviar (se existir)
      const dataToSend = {
        ...formData,
        data_nascimento: formData.data_nascimento 
          ? new Date(formData.data_nascimento).toISOString().split('T')[0]
          : undefined
      };

      await contratanteService.cadastrar(dataToSend);
      toast.success("Cadastro realizado com sucesso!");
      navigate('/login'); // Redireciona para a página de login após o cadastro
    } catch (error: any) {
      console.error('Erro durante o cadastro:', error);
      const errorMessage = error.response?.data?.detail || error.response?.data?.message || "Erro ao processar o cadastro. Tente novamente.";
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto max-w-2xl px-4 py-8">
      <FormHeader title="Cadastro de Contratante" />
      <div className="mb-8">
        <p className="text-gray-600 text-center">
          Preencha seus dados pessoais para criar sua conta
        </p>
      </div>
      
      <DadosIdoso 
        data={formData} 
        updateData={updateFormData} 
        onNext={handleNext}
      />
    </div>
  );
};

export default IdosoForm;
