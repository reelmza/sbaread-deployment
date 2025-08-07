import React from "react";
import ThemeSpacer from "../ThemeSpacer";
import { LogOutIcon } from "lucide-react";

const AuthCard = ({
  cardTitle,
  cardDescription,
  children,
  onSubmit,
}: Readonly<{
  cardTitle: string;
  cardDescription: string;
  children: React.ReactNode;
  onSubmit?: (e: React.SyntheticEvent) => Promise<void>;
}>) => {
  return (
    <form
      className="relative w-full lg:w-2/6 lg:shadow rounded-2xl flex flex-col items-center justify-center px-10 mt-10"
      onSubmit={onSubmit}
    >
      <ThemeSpacer size="section" />
      {/* Card Icon */}
      <div className="absolute -top-8 h-16 w-16 flex items-center justify-center rounded-full bg-gray-100">
        <LogOutIcon strokeWidth={2.5} size={28} />
      </div>

      {/* Card Heading */}
      <div>
        <h1 className="font-primary font-bold text-accent-dark text-2xl text-center">
          {cardTitle}
        </h1>
        <p className="text-accent font-primary font-semibold text-center">
          {cardDescription}
        </p>
      </div>
      <ThemeSpacer size="section" />

      {/*  Form Content */}
      {children}

      <ThemeSpacer size="section" />
    </form>
  );
};

export default AuthCard;
