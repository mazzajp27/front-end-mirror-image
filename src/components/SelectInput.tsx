
import React from 'react';
import { Eye } from 'lucide-react';

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
}

const SelectInput: React.FC<SelectInputProps> = ({ 
  label, 
  id, 
  options,
  required = false,
  value,
  onChange
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
          className="form-input"
          required={required}
          value={value}
          onChange={onChange}
        >
          <option value="" disabled>Selecione</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none">
          <Eye size={18} />
        </div>
      </div>
    </div>
  );
};

export default SelectInput;
