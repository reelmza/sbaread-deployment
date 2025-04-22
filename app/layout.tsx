import type { Metadata } from "next";
import { Raleway, Inter } from "next/font/google";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${fontPrimary.variable} ${fontSecondary.variable} font-secondary antialiased`}
      >
        {children}
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
