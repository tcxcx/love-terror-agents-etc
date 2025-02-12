"use client";

import React from "react";
import dynamic from "next/dynamic";
import Header from "@/components/header";

const SendRoses = dynamic(() => import("@/components/send-roses"), {
  ssr: false,
});

const RosesPage = () => {
  return (
    <div className="min-h-screen max-w-4xl mx-auto">
      <div className="z-10">
        <SendRoses />
      </div>
    </div>
  );
};

export default RosesPage;
