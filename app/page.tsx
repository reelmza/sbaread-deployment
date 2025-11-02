"use client";

import { signIn } from "next-auth/react";
import AuthCard from "@/components/auth/AuthCard";
import ThemeSpacer from "@/components/ThemeSpacer";
import Button from "@/components/Button";
import Input from "@/components/auth/Input";
import { LockKeyholeOpen, Mail } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useState } from "react";
import Spinner from "@/components/Spinner";

export default function Home() {
  const router = useRouter();

  const [loading, setLoading] = useState<string | null>(null);
  const doLogin = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setLoading("doLogin");

    const target = e.target as typeof e.target & {
      email: { value: string };
      password: { value: string };
    };

    const res = await signIn("credentials", {
      email: target.email.value,
      password: target.password.value,
      redirect: false,
    });
    console.log(res);

    if (!res!.error) {
      router.push("/dashboard");
    }
    if (res!.error === "CredentialsSignin") {
      toast.error("Incorrect details provided.", {
        richColors: true,
        position: "bottom-left",
      });
    }

    if (res!.error === "Configuration") {
      toast.error("An error occured, try again.", {
        richColors: true,
        position: "bottom-left",
      });
    }

    setLoading(null);
  };

  return (
    <main className="h-full w-full flex items-center justify-center">
      {/* Set Password Card */}
      <AuthCard
        onSubmit={doLogin}
        cardTitle="Welcome To SBAReads"
        cardDescription="Signin to your account"
      >
        {/* Email Input */}
        <Input
          type="email"
          name="email"
          label="Email"
          placeholder="Enter your email"
          defaultValue=""
          icon={
            <Mail size={18} strokeWidth={1.5} className="text-neutral-dark" />
          }
        />
        <ThemeSpacer size="element" />

        {/* Password Input */}
        <Input
          type="password"
          name="password"
          label="Password"
          placeholder="Enter your password"
          defaultValue=""
          icon={
            <LockKeyholeOpen
              size={18}
              strokeWidth={1.5}
              className="text-neutral-dark"
            />
          }
        />

        <ThemeSpacer size="element" />
        <div className="self-end">
          <Link href={"/reset-password"} className="text-neutral-dark">
            Forgot Password?
          </Link>
        </div>
        <ThemeSpacer size="element" />

        <Button
          title="Login"
          type="submit"
          disabled={loading !== null}
          icon={loading === "doLogin" ? <Spinner className="size-5" /> : ""}
        />
      </AuthCard>
    </main>
  );
}
