"use client";

import { useEffect, useState } from "react";
import Claim from "@/components/peanut/claim/claim";
import { ExtendedPaymentInfo, IGetLinkDetailsResponse } from "@/types";
import { fetchLinkDetails } from "@/utils/local-storage";
import { useAccount } from "wagmi";
import { useToast } from "@/hooks/use-toast";
import { claimPeanutLink } from "@/utils/supabase/mutations";

export default function ClaimRoses() {
  const [details, setDetails] = useState<IGetLinkDetailsResponse | null>(null);
  const [paymentInfo, setPaymentInfo] = useState<ExtendedPaymentInfo | null>(
    null
  );
  const [isClaimingLink, setIsClaimingLink] = useState(false);
  const [destinationChainId, setDestinationChainId] = useState<string>("");
  const { address } = useAccount();
  const { toast } = useToast();

  const queryString = window.location.href;

  useEffect(() => {
    fetchLinkDetails(queryString, setDetails, setPaymentInfo);
  }, [queryString]);



  const handleClaim = async (txHash: string) => {
    if (!address || !details?.link) {
      toast({
        title: "Error",
        description: "Please connect your wallet first",
        variant: "destructive",
      });
      return;
    }

    setIsClaimingLink(true);
    try {
      const result = await claimPeanutLink(details.link, address);
      if (result) {
        toast({
          title: "Success",
          description: "Successfully claimed your roses! 🌹",
        });

        setPaymentInfo({
          ...paymentInfo!,
          claimed: true,
          transactionHash: txHash,
          chainId: paymentInfo?.chainId || '0',
          tokenSymbol: paymentInfo?.tokenSymbol || '',
          tokenAmount: paymentInfo?.tokenAmount || '',
          senderAddress: paymentInfo?.senderAddress || '',
          depositDate: paymentInfo?.depositDate || '',
          depositIndex: paymentInfo?.depositIndex || 0
        });
      }
    } catch (error) {
      console.error("Error updating claim status:", error);
      toast({
        title: "Error",
        description: "Failed to update claim status",
        variant: "destructive",
      });
    } finally {
      setIsClaimingLink(false);
    }
  };

  return (
    <main className="flex-1 flex flex-col h-screen p-10">
        <h1 className="text-2xl font-bold">Your secret is safe with us 🌹🌹🌹</h1>
        <p className="text-sm text-gray-500"> Find out who your valentine&apos;s, claim four gifts to unlock a special date</p>
        <Claim
        details={details!}
        paymentInfo={paymentInfo!}
        setPaymentInfo={setPaymentInfo}
        setDestinationChainId={() => {
        console.log("running");
        }}
        onClaimSuccess={handleClaim}
        isClaimingLink={isClaimingLink}
      />
    </main>
  );
}
