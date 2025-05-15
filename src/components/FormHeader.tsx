
import React from 'react';

interface FormHeaderProps {
  title?: string;
}

const FormHeader: React.FC<FormHeaderProps> = ({ title = "Formulário Cuidador" }) => {
  return (
    <div className="flex flex-col items-center mb-8">
      <div className="mb-4">
        <img 
          src="/lovable-uploads/ae6d71a7-8de9-40f0-a34b-848a22c94d66.png" 
          alt="Amigo Cuidador Logo" 
          className="h-16"
        />
      </div>
      <h1 className="text-3xl font-bold text-[#0056a4] text-center">{title}</h1>
    </div>
  );
};

export default FormHeader;
