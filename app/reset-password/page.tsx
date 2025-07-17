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
import { Mail } from "lucide-react";
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
        cardTitle="Forgot Password"
        cardDescription="Get an email link to reset it"
        onSubmit={setPassword}
      >
        {/* New Password Input*/}
        <Input
          type="email"
          name="email"
          label="Email"
          placeholder="Enter your email"
          icon={
            <Mail size={18} strokeWidth={1.5} className="text-neutral-dark" />
          }
        />
        <ThemeSpacer size="element" />
        <div className="self-end">
          <Link href={"/"} className="text-neutral-dark">
            Return to Login
          </Link>
        </div>
        <ThemeSpacer size="element" />

        <Button title="Reset password" type="submit" />

        <Dialog open={modalState} onOpenChange={setModalState}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-accent-dark text-2xl font-primary font-bold">
                Email Sent!
              </DialogTitle>
            </DialogHeader>
            <div className="text-neutral-dark">
              We have sent a password recovery instructions to your email.
            </div>
            <div className="text-neutral-dark">
              If you haven't recioeved an email, check your email spam filter or
              click here to
              <button className="ml-1 border-none text-blue-600 cursor-pointer h-fit w-fit hover:text-blue-900 outline-none bg-transparent">
                resend email again.
              </button>
            </div>
          </DialogContent>
        </Dialog>
      </AuthCard>
    </main>
  );
}
