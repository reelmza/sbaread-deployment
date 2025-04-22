// components/Input.tsx
import { KeySquareIcon, LockKeyholeOpen } from "lucide-react";
import React from "react";
import ThemeSpacer from "./auth/ThemeSpacer";

interface InputProps {
  label: string;
  type: string;
  placeholder: string;
  name: string;
  icon: React.JSX.Element;
}

const Input: React.FC<InputProps> = ({
  icon,
  name,
  label,
  type,
  placeholder,
}) => {
  return (
    <div className="w-full flex flex-col">
      <label
        htmlFor={name}
        className="font-secondary text-sm text-neutral-dark cursor-pointer"
      >
        {label}
      </label>
      <ThemeSpacer size="unit" />
      <div className="flex items-center justify-center bg-neutral-light h-12 w-full gap-4 rounded-md">
        {icon ? (
          <div className="h-5 w-12 flex items-center justify-center border-r border-neutral">
            {icon}
          </div>
        ) : (
          ""
        )}
        <input
          id={name}
          type={type}
          placeholder={placeholder}
          className="grow h-full outline-none px-0"
          required
        />
      </div>
    </div>
  );
};

export default Input;
