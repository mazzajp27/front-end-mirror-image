
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import FormHeader from '../FormHeader';
import StepIndicator from '../StepIndicator';
import { CuidadorData, cuidadorService } from '../../services/api';
import DadosCuidador from './DadosCuidador';
import EnderecoCuidador from './EnderecoCuidador';
import QuestionarioCuidador from './QuestionarioCuidador';
import HobbiesCuidador from './HobbiesCuidador';

const CuidadorForm: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<CuidadorData>({
    nome: '',
    cpf: '',
    email: '',
    dataNascimento: '',
    telefone: '',
    genero: '',
    senha: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateFormData = (data: Partial<CuidadorData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      await cuidadorService.cadastrar(formData);
      toast.success("Cadastro realizado com sucesso!");
      navigate('/');
    } catch (error: any) {
      console.error('Erro durante o cadastro:', error);
      toast.error(error.response?.data?.message || "Erro ao processar o cadastro. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <DadosCuidador data={formData} updateData={updateFormData} onNext={handleNext} />;
      case 2:
        return <EnderecoCuidador data={formData} updateData={updateFormData} onNext={handleNext} onPrevious={handlePrevious} />;
      case 3:
        return <QuestionarioCuidador data={formData} updateData={updateFormData} onNext={handleNext} onPrevious={handlePrevious} />;
      case 4:
        return <HobbiesCuidador data={formData} updateData={updateFormData} onPrevious={handlePrevious} onSubmit={handleSubmit} isSubmitting={isSubmitting} />;
      default:
        return <DadosCuidador data={formData} updateData={updateFormData} onNext={handleNext} />;
    }
  };

  const steps = [
    { name: "Dados", number: 1 },
    { name: "Endereço", number: 2 },
    { name: "Questionário", number: 3 },
    { name: "Hobbies", number: 4 }
  ];

  return (
    <div className="container mx-auto max-w-2xl px-4 py-8">
      <FormHeader title="Formulário Cuidador" />
      <StepIndicator 
        currentStep={currentStep} 
        steps={steps} 
      />
      
      {renderStep()}
    </div>
  );
};

export default CuidadorForm;
