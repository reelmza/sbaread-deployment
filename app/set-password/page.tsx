"use client";

import AuthCard from "@/components/auth/AuthCard";
import ThemeSpacer from "@/components/auth/ThemeSpacer";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { LockKeyholeOpen } from "lucide-react";

export default function Home() {
  const setPassword = async (e: React.SyntheticEvent) => {};

  return (
    <main className="h-full w-full flex items-center justify-center">
      {/* Set Password Card */}
      <AuthCard
        cardTitle="Welcome To SBAReads"
        cardDescription="Set your account password"
        onSubmit={setPassword}
      >
        {/* New Password Input*/}
        <Input
          type="password"
          name="password"
          label="New Password"
          placeholder="Enter new password"
          icon={
            <LockKeyholeOpen
              size={18}
              strokeWidth={1.5}
              className="text-neutral-dark"
            />
          }
        />
        <ThemeSpacer size="element" />

        {/* Confirm Password Input*/}
        <Input
          type="password"
          name="confirmPassword"
          label="Confirm Password"
          placeholder="Confirm new password"
          icon={
            <LockKeyholeOpen
              size={18}
              strokeWidth={1.5}
              className="text-neutral-dark"
            />
          }
        />
        <ThemeSpacer size="element" />

        <Button title="Create Password" type="submit" />
      </AuthCard>
    </main>
  );
}
