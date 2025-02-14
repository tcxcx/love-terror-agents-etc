'use client';

import React from "react";
import Image from "next/image";
import Link from "next/link";

const SocialSection = () => {
  return (
    <section className="container px-4 pt-20 pb-16">
      <div className="max-w-4xl mx-auto text-center">
        <div className="space-y-8 animate-slide-up">
          <h2 className="text-3xl font-bold text-accent">Connect With Us</h2>
          <p className="text-accent/80">Join our community and stay updated</p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link 
              href="https://x.com/cringycupid69" 
              target="_blank"
              className="group flex items-center gap-3 px-6 py-3 bg-secondary/10 rounded-full hover:bg-secondary/20 transition-all duration-300"
            >
              <div className="relative">
                <Image 
                  src="/icons/x.png" 
                  alt="X" 
                  width={24} 
                  height={24}
                  className="group-hover:scale-110 transition-transform duration-300" 
                />
              </div>
              <span className="font-medium text-accent group-hover:text-secondary">
                Follow @cringycupid69
              </span>
            </Link>
   
            <Link 
              href="https://t.me/+H85aPWtq2mwzNGMx" 
              target="_blank"
              className="group flex items-center gap-3 px-6 py-3 bg-secondary/10 rounded-full hover:bg-secondary/20 transition-all duration-300"
            >
              <div className="relative">
                <Image 
                  src="/icons/telegram.png" 
                  alt="Telegram" 
                  width={24} 
                  height={24}
                  className="group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <span className="font-medium text-accent group-hover:text-secondary">
                Join our Telegram
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialSection;