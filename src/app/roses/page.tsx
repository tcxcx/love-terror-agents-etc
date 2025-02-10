'use client';

import React from "react";
import dynamic from 'next/dynamic';
import Header from "@/components/header";

const SendRoses = dynamic(() => import('@/components/send-roses'), {
  ssr: false
});

const RosesPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-lighter to-white">
      <Header />
      <SendRoses />
    </div>
  );
};

export default RosesPage;