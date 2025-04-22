// components/Button.tsx
import React from "react";

interface ButtonProps {
  title: string;
  type?: "button" | "submit";
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ title, type, onClick }) => {
  return (
    <button
      type={type || "submit"}
      onClick={onClick}
      className="h-12 w-full flex items-center justify-center rounded-md shadow-lg shadow-neutral-light gap-2 font-secondary bg-accent hover:bg-accent-dark text-accent-tint cursor-pointer transition-all ease-in-out duration-200"
    >
      <span>{title}</span>
    </button>
  );
};

export default Button;
