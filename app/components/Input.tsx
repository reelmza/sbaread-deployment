// components/Input.tsx
import React from "react";

interface InputProps {
  label: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className: string;  // Add className here
}

const Input: React.FC<InputProps> = ({ label, type, value, onChange, className }) => {
  return (
    <div>
      <label htmlFor={label} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        id={label}
        type={type}
        value={value}
        onChange={onChange}
        className={`${className} mt-1`}  // Ensure className is applied
        required
        placeholder={`Enter your ${label}`}
      />
    </div>
  );
};

export default Input;
