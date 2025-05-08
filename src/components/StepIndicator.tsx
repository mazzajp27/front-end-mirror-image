
import React from 'react';

interface Step {
  name: string;
  number: number;
}

interface StepIndicatorProps {
  currentStep: number;
  steps: Step[];
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep, steps }) => {
  return (
    <div className="flex items-center justify-center mb-10">
      {steps.map((step, index) => (
        <React.Fragment key={step.number}>
          <div className="flex flex-col items-center">
            <div className={`step-indicator ${currentStep === step.number ? 'step-active' : 'step-inactive'}`}>
              {step.number}
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
