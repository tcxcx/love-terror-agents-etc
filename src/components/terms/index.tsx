import React from "react";
import Link from "next/link";
import { FileText, ShieldCheck, Users, Info, ArrowLeft } from "lucide-react";

const Terms = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-primary/5 py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <FileText className="w-8 h-8 text-secondary" />
          <h1 className="text-4xl font-bold">Terms of Service</h1>
        </div>
        
        <div className="space-y-8 text-accent/80">
          <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-4">
              <ShieldCheck className="w-6 h-6 text-secondary" />
              <h2 className="text-2xl font-semibold">1. Agreement to Terms</h2>
            </div>
            <div className="space-y-4">
              <p>By accessing and using Cringy Cupid, you agree to be bound by these terms of service:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>You must be at least 18 years old to use this service</li>
                <li>You accept full responsibility for maintaining your wallet security</li>
                <li>You agree to use the platform in compliance with all applicable laws</li>
                <li>You understand that these terms may be updated periodically</li>
              </ul>
            </div>
          </section>

          <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-4">
              <Users className="w-6 h-6 text-secondary" />
              <h2 className="text-2xl font-semibold">2. User Conduct</h2>
            </div>
            <div className="space-y-4">
              <p>Users of Cringy Cupid must adhere to these guidelines:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Respect other users and their privacy</li>
                <li>Do not engage in harassment or harmful behavior</li>
                <li>Do not attempt to manipulate or abuse the token system</li>
                <li>Report any suspicious or inappropriate activity</li>
                <li>Do not create multiple accounts or impersonate others</li>
              </ul>
            </div>
          </section>

          <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-4">
              <Info className="w-6 h-6 text-secondary" />
              <h2 className="text-2xl font-semibold">3. Tokens and Virtual Items</h2>
            </div>
            <div className="space-y-4">
              <p>Understanding digital assets on our platform:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>$LOVE tokens and roses are virtual items with no guaranteed monetary value</li>
                <li>Tokens cannot be exchanged for real currency through our platform</li>
                <li>We reserve the right to modify token mechanics at any time</li>
                <li>Users are responsible for any tax implications of their transactions</li>
              </ul>
            </div>
          </section>

          <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-4">
              <ShieldCheck className="w-6 h-6 text-secondary" />
              <h2 className="text-2xl font-semibold">4. Limitation of Liability</h2>
            </div>
            <div className="space-y-4">
              <p>Important disclaimers about our service:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Cringy Cupid is not responsible for financial losses related to token usage</li>
                <li>We do not guarantee continuous, uninterrupted access to the service</li>
                <li>We are not responsible for actions of other users</li>
                <li>We reserve the right to terminate accounts that violate our terms</li>
              </ul>
            </div>
          </section>

          <div className="mt-8">
            <Link href="/" className="inline-flex items-center text-secondary hover:underline gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;