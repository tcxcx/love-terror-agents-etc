import React from "react";
import Link from "next/link";
import { Shield, Lock, User, Globe, Bell, ArrowLeft } from "lucide-react";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-primary/5 py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <Shield className="w-8 h-8 text-secondary" />
          <h1 className="text-4xl font-bold">Privacy Policy</h1>
        </div>
        
        <div className="space-y-8 text-accent/80">
          <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-4">
              <User className="w-6 h-6 text-secondary" />
              <h2 className="text-2xl font-semibold">1. Information We Collect</h2>
            </div>
            <div className="space-y-4">
              <p>We collect and process the following types of information:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Basic profile information (username, display name)</li>
                <li>Wallet addresses for blockchain transactions</li>
                <li>Transaction history related to $LOVE tokens and roses</li>
                <li>Communication preferences</li>
              </ul>
            </div>
          </section>

          <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-4">
              <Lock className="w-6 h-6 text-secondary" />
              <h2 className="text-2xl font-semibold">2. How We Use Your Information</h2>
            </div>
            <div className="space-y-4">
              <p>Your information helps us provide and improve our services:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Facilitate sending roses and $LOVE tokens for the Valentine's Day game purposes only</li>
                <li>Improve user experience and platform functionality</li>
                <li>Maintain platform security and prevent fraud</li>
                <li>Send important updates about our service</li>
                <li>Analyze usage patterns to improve our platform</li>
              </ul>
            </div>
          </section>

          <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-4">
              <Globe className="w-6 h-6 text-secondary" />
              <h2 className="text-2xl font-semibold">3. Data Storage and Protection</h2>
            </div>
            <div className="space-y-4">
              <p>We implement robust security measures to protect your data:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>End-to-end encryption for sensitive data</li>
                <li>Regular security audits and updates</li>
                <li>Secure blockchain infrastructure</li>
                <li>Limited employee access to personal data</li>
              </ul>
            </div>
          </section>

          <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-4">
              <Bell className="w-6 h-6 text-secondary" />
              <h2 className="text-2xl font-semibold">4. Your Privacy Choices</h2>
            </div>
            <div className="space-y-4">
              <p>You have control over your privacy settings:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Opt-out of non-essential communications</li>
                <li>Request your data deletion</li>
                <li>Control visibility of your profile</li>
                <li>Manage notification preferences</li>
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

export default PrivacyPolicy;