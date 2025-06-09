import React from 'react';
import { ChevronDown } from 'lucide-react';

interface Option {
  value: string;
  label: string;
}

interface SelectInputProps {
  label: string;
  id: string;
  options: Option[];
  required?: boolean;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  error?: string;
}

const SelectInput: React.FC<SelectInputProps> = ({ 
  label, 
  id, 
  options,
  required = false,
  value,
  onChange,
  error
}) => {
  return (
    <div className="mb-6">
      <label 
        htmlFor={id} 
        className={`block mb-2 text-sm font-medium ${required ? 'required-field' : ''}`}
      >
        {label}
      </label>
      <div className="relative">
        <select
          id={id}
          name={id}
          required={required}
          value={value}
          onChange={onChange}
          className={`form-input appearance-none w-full rounded-md border px-4 py-2 ${
            error ? 'border-red-500' : 'border-gray-300'
          }`}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${id}-error` : undefined}
        >
          <option value="">Selecione</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none">
          <ChevronDown size={18} />
        </div>
      </div>
      {error && (
        <p id={`${id}-error`} className="text-red-500 text-sm mt-1">
          {error}
        </p>
      )}
    </div>
  );
};

export default SelectInput;
