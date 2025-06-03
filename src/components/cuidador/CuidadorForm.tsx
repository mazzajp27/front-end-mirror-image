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
    senha: '',
    // Endereço
    cep: '',
    estado: '',
    cidade: '',
    bairro: '',
    endereco: '',
    numero: '',
    complemento: '',
    // Outros campos serão preenchidos conforme o usuário avança no formulário
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
      
      // Formatar a data antes de enviar
      const dataToSend = {
        ...formData,
        dataNascimento: formData.dataNascimento 
          ? new Date(formData.dataNascimento).toISOString().split('T')[0]
          : formData.dataNascimento // Mantém a string vazia se não houver data
      };

      await cuidadorService.cadastrar(dataToSend);
      toast.success("Cadastro realizado com sucesso!");
      navigate('/');
    } catch (error: any) {
      console.error('Erro durante o cadastro:', error);
      const errorMessage = error.response?.data?.detail || error.response?.data?.message || "Erro ao processar o cadastro. Tente novamente.";
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <DadosCuidador
            data={formData}
            updateData={updateFormData}
            onNext={handleNext}
          />
        );
      case 2:
        return (
          <EnderecoCuidador
            data={formData}
            updateData={updateFormData}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        );
      case 3:
        return (
          <QuestionarioCuidador
            data={formData}
            updateData={updateFormData}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        );
      case 4:
        return (
          <HobbiesCuidador
            data={formData}
            updateData={updateFormData}
            onPrevious={handlePrevious}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container max-w-3xl mx-auto px-4">
        <FormHeader title="Cadastro do Cuidador" />
        
        <div className="bg-white rounded-lg shadow-lg p-6 md:p-10 mt-6">
          <StepIndicator
            steps={[
              { name: 'Dados Pessoais', number: 1 },
              { name: 'Endereço', number: 2 },
              { name: 'Questionário', number: 3 },
              { name: 'Hobbies', number: 4 }
            ]}
            currentStep={currentStep}
          />

          <div className="mt-8">
            {renderStep()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CuidadorForm;
