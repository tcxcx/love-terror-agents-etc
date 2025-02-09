"use client";

import { useEffect, useState } from "react";
import ClaimInfo from "@/components/peanut/claim/claim";
import { ExtendedPaymentInfo, IGetLinkDetailsResponse } from "@/types";
import { fetchLinkDetails } from "@/utils/local-storage";

export default function ClaimRoses() {
  const [details, setDetails] = useState<IGetLinkDetailsResponse | null>(null);
  const [paymentInfo, setPaymentInfo] = useState<ExtendedPaymentInfo | null>(
    null
  );

  const queryString = window.location.href;

  useEffect(() => {
    fetchLinkDetails(queryString, setDetails, setPaymentInfo);
  }, [queryString]);

  return (
    <main className="flex-1 flex flex-col h-screen p-10">
        <h1 className="text-2xl font-bold">Your secret is safe with us 🌹🌹🌹</h1>
        <p className="text-sm text-gray-500"> Find out who your valentine's, claim four gifts to unlock a special date</p>
        <ClaimInfo
        details={details!}
        paymentInfo={paymentInfo!}
        setPaymentInfo={setPaymentInfo}
        setDestinationChainId={() => {
        console.log("running");
        }}
      />
    </main>
  );
}
