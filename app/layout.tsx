import type { Metadata } from "next";
import { Raleway, Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${fontPrimary.variable} ${fontSecondary.variable} relative flex font-secondary antialiased`}
      >
        <Sidebar />
        <div className="main grow">
          <Header />

          {children}
        </div>
      </body>
    </html>
  );
}

export const metadata: Metadata = {
  title: "SBA Reads Admin",
  description: "SBA Reads admin dashboard",
};

const fontPrimary = Raleway({
  variable: "--font-primary",
  subsets: ["latin"],
});

const fontSecondary = Inter({
  variable: "--font-secondary",
  subsets: ["latin"],
});
