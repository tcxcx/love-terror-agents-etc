"use client";

import React, { useState } from "react";
import PaymentDetails from "@/components/peanut/card/details";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { ExtendedPaymentInfo, IGetLinkDetailsResponse } from "@/types";
import { Button } from "@/components/ui/button";
import { usePeanut } from "@/hooks/use-peanut";
import { useDestinationToken } from "@/hooks/use-destination-chain";
import { getChainInfoByChainId } from "@/components/peanut/claim/claim-info";
import { toast } from "@/hooks/use-toast";
import { ChainSelect } from "@/components/chain-select";
import * as chains from "@/constants/Chains";
import { Input } from "@/components/ui/input";

interface ClaimInfoProps {
  paymentInfo: ExtendedPaymentInfo;
  setPaymentInfo: (paymentInfo: ExtendedPaymentInfo | null) => void;
  destinationChainId?: string;
  setDestinationChainId?: (destinationChainId: string) => void;
  details: IGetLinkDetailsResponse;
  onClaimSuccess: (txHash: string) => void;
  isClaimingLink?: boolean;
}

export default function ClaimInfo({
  paymentInfo,
  setPaymentInfo,
  details,
  destinationChainId = "",
  setDestinationChainId,
  onClaimSuccess,
  isClaimingLink,
}: ClaimInfoProps) {
  const [inProgress, setInProgress] = useState(false);
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [currentText, setCurrentText] = useState("");
  const [transactionDetails, setTransactionDetails] = useState<string | null>(
    null
  );
  const [otherWalletAddress, setOtherWalletAddress] = useState<string>("");
  const getDestinationTokenAddress = useDestinationToken();
  const [isMultiChain, setIsMultiChain] = useState(false);
  const [isOtherWallet, setIsOtherWallet] = useState(false);

  const {
    isLoading: isPeanutLoading,
    claimPayLinkXChain,
    claimPayLink,
  } = usePeanut();

  if (!paymentInfo) return null;

  const handleClaim = async () => {
    setInProgress(true);
    setOverlayVisible(true);
    setCurrentText("Starting to claim your roses 🌹🌹🌹");

    if (paymentInfo?.claimed) {
      toast({
        title: "Already Claimed",
        description: "You have already claimed your roses 🌹🌹🌹",
      });
      setCurrentText("You have already claimed your roses 🌹🌹🌹");
      return;
    }

    try {
      let txHash;
      if (destinationChainId) {
        // Handle cross-chain claim
        const sourceChainInfo = getChainInfoByChainId(paymentInfo.chainId);
        const isMainnet = sourceChainInfo.isMainnet;
        const destinationToken = await getDestinationTokenAddress(
          paymentInfo.tokenSymbol,
          destinationChainId
        );

        txHash = await claimPayLinkXChain(
          details?.link || "",
          destinationChainId,
          destinationToken,
          () => setCurrentText("Claiming your roses 🌹🌹🌹"),
          () => setCurrentText("Almost done 🌹🌹🌹"),
          (error: Error) => setCurrentText(`Error: ${error.message}`),
          () => setCurrentText("Claiming your roses 🌹🌹🌹"),
          isMainnet
        );
      } else {
        // Handle regular claim
        txHash = await claimPayLink(
          details?.link || "",
          () => setCurrentText("Claiming your roses 🌹🌹🌹"),
          () => setCurrentText("Patience... Claiming your roses 🌹🌹🌹"),
          (error: Error) => setCurrentText(`Error: ${error.message}`),
          () => setCurrentText("Almost done 🌹🌹🌹"),
          otherWalletAddress
        );
      }

      if (txHash) {
        await onClaimSuccess(txHash);
      }
    } catch (error) {
      console.error("Error claiming:", error);
      setCurrentText("Error claiming your roses");
    } finally {
      setInProgress(false);
    }
  };

  return (
    <section className="flex w-full h-auto flex-col justify-between rounded-2xl border bg-background p-5">
      <div className="flex w-full md:h-[200px] lg:h-[300px] flex-col justify-between rounded-2xl">
        <div className="p-5">
          <div className="flex items-center justify-between text-xs w-full">
            <span className="text-xl">💸💸💸</span>
            <span>Claim your roses 🌹🌹🌹</span>
          </div>
          <div className="text-center flex py-2 w-full justify-center">
            {paymentInfo && (
              <>
                <PaymentDetails paymentInfo={paymentInfo} />
              </>
            )}
          </div>
        </div>
      </div>
      <div className=" inline-flex">
        {!paymentInfo?.claimed && (
          <div className="flex items-center justify-start p-4 space-x-2">
            <Switch
              id="multi-chain-link"
              checked={isMultiChain}
              onCheckedChange={() => setIsMultiChain(!isMultiChain)}
            />
            <Label htmlFor="multi-chain-link" className="text-xs">
              Multi-Chain
            </Label>
          </div>
        )}
        {!paymentInfo?.claimed && (
          <div className="flex items-center justify-end p-4 space-x-2">
            <Switch
              id="other-wallet"
              checked={isOtherWallet}
              onCheckedChange={() => setIsOtherWallet(!isOtherWallet)}
            />
            <Label htmlFor="other-wallet" className="text-xs">
              Other Wallet
            </Label>
          </div>
        )}
      </div>
      <div className="flex flex-col w-10/12 gap-4 items-center justify-center m-auto">
        {isMultiChain && (
          <ChainSelect
            chains={Object.values(chains)}
            label="Select Chain"
            value={destinationChainId}
            onChange={(selectedChainId: string) => {
              setDestinationChainId?.(selectedChainId);
            }}
          />
        )}

        {isOtherWallet && (
          <Input
            type="text"
            placeholder="Enter Wallet Address"
            value={otherWalletAddress}
            onChange={(e) => setOtherWalletAddress(e.target.value)}
          />
        )}
      </div>

      <div className="flex items-center justify-center p-4 space-x-2">
        <Button
          size={"lg"}
          className="mt-5 flex items-center gap-2 self-end w-full bg-pink-600"
          onClick={handleClaim}
          disabled={paymentInfo.claimed || isPeanutLoading}
        >
          Claim
          <span className="text-xl">🌹🌹🌹</span>
        </Button>
      </div>
    </section>
  );
}
