// app/login/page.tsx or pages/login.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import Input from "../components/Input";
import Button from "../components/Button";
import { login } from "../lib/auth"; // Your login logic

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, password); // Replace with actual login API call
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="flex w-full max-w-4xl bg-white shadow-md rounded-lg overflow-hidden">
        {/* Left Image Section */}
        <div className="relative w-0 md:w-1/2 h-full hidden md:block">
          <Image
            src="/login-image.jpg" // Replace with your actual image path
            alt="Login Illustration"
            layout="fill"
            objectFit="cover"
            className="h-full w-full"
          />
        </div>

        {/* Right Form Section */}
        <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col justify-center">
          <h2 className="text-2xl font-semibold text-gray-900 text-center mb-6">Login</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Input
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-[#c8a381] focus:border-[#c8a381]"
              />
            </div>
            <div className="space-y-2">
              <Input
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-[#c8a381] focus:border-[#c8a381]"
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-[#c8a381] hover:bg-[#b48e6c] text-white py-2 rounded-md"
            >
              Login
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
