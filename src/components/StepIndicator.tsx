
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
            <div 
              className={`w-10 h-10 rounded-full flex items-center justify-center 
                ${currentStep === step.number ? 'bg-[#0056a4] text-white' : 'bg-gray-200 text-gray-600'}`}>
              {step.number}
            </div>
            <span className="mt-2 text-sm">{step.name}</span>
          </div>
          {index < steps.length - 1 && (
            <div className="w-16 h-1 mx-2 bg-gray-300"></div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default StepIndicator;
