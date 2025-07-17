// components/Button.tsx
import React, { JSX } from "react";

interface ButtonProps {
  title: string;
  type?: "button" | "submit";
  icon?: JSX.Element | string;
  disabled?: boolean;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({
  title,
  type,
  onClick,
  icon,
  disabled,
}) => {
  return (
    <button
      type={type || "submit"}
      onClick={onClick}
      disabled={disabled}
      className="h-12 w-full flex items-center justify-center rounded-md shadow-lg shadow-neutral-light gap-2 font-secondary bg-accent hover:bg-accent-dark text-accent-tint cursor-pointer transition-all ease-in-out duration-200"
    >
      <span>{title}</span>
      {icon ? icon : ""}
    </button>
  );
};

export default Button;
