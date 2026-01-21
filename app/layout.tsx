import type { Metadata } from "next";
import { ArrowUpRight } from 'lucide-react';

import { Inter } from "next/font/google";
import "./globals.css";

const interFont = Inter({
  variable: "--font-inter-font",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ProBound Ai gents",
  description: "Automate IT Support with AI Agents",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        // 1. min-h-screen + flex-col makes the body take full height
        className={`${interFont.variable} antialiased min-h-screen flex flex-col`}
      >
        {/* 2. flex-1 pushes the footer down by taking up all available space */}
        <main className="flex-1">
            {children}
        </main>

         {/* Footer matching the design */}
              <footer className="w-full flex items-center justify-center gap-6 py-8 text-sm font-medium text-gray-400 border-t border-gray-100">
                <p>@ ProBound</p>
                
                <button className="flex items-center gap-1 hover:text-gray-600 transition-colors">
                  Contact Us 
                  <ArrowUpRight size={14} strokeWidth={2} />
                </button>
                
                <button className="hover:text-gray-600 transition-colors">
                  Privacy & terms
                </button>
              </footer>
              
      </body>
    </html>
  );
}