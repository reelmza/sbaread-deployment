// components/Button.tsx
import React from "react";

interface ButtonProps {
  type: "button" | "submit";
  className: string;
  children: React.ReactNode;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ type, className, children, onClick }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={className}
    >
      {children}
    </button>
  );
};

export default Button;
