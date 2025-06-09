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
  disabled?: boolean;
  error?: string;
  maxLength?: number;
}

const FormInput: React.FC<FormInputProps> = ({ 
  label, 
  type, 
  id, 
  placeholder, 
  required = false,
  value,
  onChange,
  mask,
  disabled = false,
  error,
  maxLength
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
          name={id}
          className={`form-input w-full rounded-md border px-4 py-2 ${
            error ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder={placeholder}
          required={required}
          value={value}
          onChange={onChange}
          disabled={disabled}
          maxLength={maxLength}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${id}-error` : undefined}
        />
        {type === 'password' && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
            disabled={disabled}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
      {error && (
        <p id={`${id}-error`} className="text-red-500 text-sm mt-1">
          {error}
        </p>
      )}
    </div>
  );
};

export default FormInput;
