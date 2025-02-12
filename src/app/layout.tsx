import type { Metadata } from "next";
import { Toaster } from "@/components/ui/toaster"
import { Geist, Geist_Mono } from "next/font/google";
import { AI } from "@/actions/index";
import { GridPattern } from "@/components/magicui/grid-pattern";
import Providers from "@/utils/providers";
import { cn } from "@/lib/utils";
import { NuqsAdapter } from 'nuqs/adapters/next/app'
import Header from "@/components/header";


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
      <AI>
        <Providers>
        <NuqsAdapter>
          <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
              <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#C9EBFF,transparent)]">
          <Header />
            {children}
            </div>
            </div>
          </body>
          <Toaster />
          </NuqsAdapter>
        </Providers>
      </AI>
    </html>
  );
}
