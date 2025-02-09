import type { Metadata } from "next";
import { Toaster } from "@/components/ui/toaster"
import { Geist, Geist_Mono } from "next/font/google";
import { GridPattern } from "@/components/magicui/grid-pattern";
import Providers from "@/utils/providers";
import { cn } from "@/lib/utils";


import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI Valentines | Send Love with AI",
  description: "Send virtual roses and chat with an AI companion this Valentine's Day. Experience a unique digital Valentine's celebration powered by artificial intelligence.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
        <Providers>
          <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <GridPattern
            width={20}
            height={20}
            x={-1}
            y={-1}
            className={cn(
              "[mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)]"
            )}
          />
            {children}
          </body>
          <Toaster />
        </Providers>
    </html>
  );
}
