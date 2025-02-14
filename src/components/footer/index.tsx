import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-pink-400 text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex justify-center space-x-6 text-sm">
          <Link href="/privacy-policy" className="hover:text-primary transition-colors">
            Privacy Policy
          </Link>
          <Link href="/terms" className="hover:text-primary transition-colors">
            Terms of Service
          </Link>
        </div>
        <div className="text-center mt-4 text-xs text-white/60">
          © 2024 Cringy Cupid. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;