"use client";

import AuthCard from "@/components/auth/AuthCard";
import ThemeSpacer from "@/components/ThemeSpacer";
import Button from "@/components/Button";
import Input from "@/components/auth/Input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { LockKeyholeOpen, Mail } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const setPassword = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setModalState(true);
  };
  const [modalState, setModalState] = useState(false);
  return (
    <main className="h-full w-full flex items-center justify-center">
      {/* Set Password Card */}
      <AuthCard
        cardTitle="Create Password"
        cardDescription="Fix it by providing a new password"
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

        <Button title="Reset password" type="submit" />

        <Dialog open={modalState} onOpenChange={setModalState}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-accent-dark text-2xl font-primary font-bold">
                Password Updated!
              </DialogTitle>
            </DialogHeader>

            <div className="text-neutral-dark">
              You can now
              <button className="ml-1 border-none text-blue-600 cursor-pointer h-fit w-fit hover:text-blue-900 outline-none bg-transparent">
                Login
              </button>
            </div>
          </DialogContent>
        </Dialog>
      </AuthCard>
    </main>
  );
}
