
import React from 'react';

interface StepIndicatorProps {
  currentStep: number;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep }) => {
  const steps = [
    { name: 'Dados', number: 1 },
    { name: 'Endereço', number: 2 },
    { name: 'Questionário', number: 3 },
    { name: 'Hobbies', number: 4 }
  ];

  return (
    <div className="flex items-center justify-center mb-10">
      {steps.map((step, index) => (
        <React.Fragment key={step.number}>
          <div className="flex flex-col items-center">
            <div className={`step-indicator ${currentStep === step.number ? 'step-active' : 'step-inactive'}`}>
              {step.number === 1 && currentStep === 1 ? step.number : ''}
            </div>
            <span className="mt-2 text-sm">{step.name}</span>
          </div>
          {index < steps.length - 1 && (
            <div className="step-line"></div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default StepIndicator;
