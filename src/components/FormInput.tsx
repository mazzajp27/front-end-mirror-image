
import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface FormInputProps {
  label: string;
  type: string;
  id: string;
  placeholder?: string;
  required?: boolean;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  mask?: string;
}

const FormInput: React.FC<FormInputProps> = ({ 
  label, 
  type, 
  id, 
  placeholder, 
  required = false,
  value,
  onChange,
  mask
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const inputType = type === 'password' && showPassword ? 'text' : type;

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="mb-6">
      <label 
        htmlFor={id} 
        className={`block mb-2 text-sm font-medium ${required ? 'required-field' : ''}`}
      >
        {label}
      </label>
      <div className="relative">
        <input
          type={inputType}
          id={id}
          className="form-input w-full rounded-md border border-gray-300 px-4 py-2"
          placeholder={placeholder}
          required={required}
          value={value}
          onChange={onChange}
        />
        {type === 'password' && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
    </div>
  );
};

export default FormInput;
