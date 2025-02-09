
import React from "react";
import Header from "@/components/header";
import SendRoses from "@/components/send-roses";

const RosesPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-lighter to-white">
      <Header />
      <SendRoses />
    </div>
  );
};

export default RosesPage;