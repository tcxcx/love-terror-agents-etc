"use client";

import { useState } from "react";
import { usePeanut } from "@/hooks/use-peanut";
import { useToast } from "@/hooks/use-toast";
import LinkUiForm from "@/components/create-link-input";
import Overlay from "@/components/overlay";
import { Token, TransactionDetails } from "@/types";
import confetti from "canvas-confetti";
import { useAccount } from "wagmi";
import { useGetTokensOrChain } from "@/hooks/use-tokens-or-chain";
import { useNetworkManager } from "@/hooks/use-dynamic-network";
import { truncateAddress } from "@/utils/truncate-address";
import {
  createRoseSubmission,
  createPeanutLink,
} from "@/utils/supabase/mutations/client";
import { BaseSepoliaTokens } from "@/constants/Tokens";

interface RoseLinkFormProps {
  formData: any;
  onSubmitForm: (
    handler: (data: any) => Promise<void>
  ) => (e: React.BaseSyntheticEvent) => Promise<void>;
}

export default function RoseLinkForm({
  formData,
  onSubmitForm,
}: RoseLinkFormProps) {
  const { toast } = useToast();
  const { address } = useAccount();
  const currentChainId = useNetworkManager();
  const chainId = currentChainId as number;

  const {
    createPayLink,
    isLoading: isPeanutLoading,
    copyToClipboard,
  } = usePeanut();

  const [overlayVisible, setOverlayVisible] = useState(false);
  const [transactionDetails, setTransactionDetails] =
    useState<TransactionDetails | null>(null);
  const [currentText, setCurrentText] = useState<string>("");
  const [tokenAmount, setTokenAmount] = useState<number>(0);
  const onValueChange = (usdAmount: number, tokenAmount: number) => {
    setTokenAmount(tokenAmount);
  };

  // RoseLinkForm.tsx
  console.log(tokenAmount, "tokenAmount");
  const handleSubmit = async (formData: any) => {
    console.log(formData, "formData");
    if (!formData.formState.isValid || !address) {
      toast({
        title: "Form Error",
        description:
          "Please connect your wallet and fill out all required fields",
        variant: "destructive",
      });
      return;
    }

    setOverlayVisible(true);
    try {
      const tokenAddress = BaseSepoliaTokens[0].address;
      setCurrentText("Creating rose link...");

      // Generate peanut link first
      const linkResponse = await createPayLink(
        tokenAmount.toString(),
        tokenAddress,
        () => setCurrentText("Please be patient..."),
        () => setCurrentText("Rose link created successfully"),
        (error: Error) =>
          setCurrentText(`Failed to create link: ${error.message}`)
      );

      if (!linkResponse) {
        throw new Error("Failed to create peanut link");
      }

      setTransactionDetails(linkResponse as TransactionDetails);

      // Create rose submission with wallet address and peanut link
      const rose = await createRoseSubmission({
        ...formData,
        amount_roses: tokenAmount.toString(),
        wallet_address_created_by: address,
        peanut_link: linkResponse.paymentLink,
        claimed: false,
      });

      if (!rose) {
        throw new Error("Failed to create rose submission");
      }

      // Create peanut link record
      const peanutLinkRecord = await createPeanutLink(
        rose.id,
        linkResponse.paymentLink
      );

      if (!peanutLinkRecord) {
        throw new Error("Failed to record peanut link");
      }

      triggerConfetti("😍");
    } catch (error: any) {
      console.error("Error in submission process:", error);
      setOverlayVisible(false);
      toast({
        title: "Failed to create rose",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setOverlayVisible(true);
    }
  };

  const handleCloseOverlay = () => {
    setOverlayVisible(false);
  };

  const handleShare = (platform: string) => {
    const url = transactionDetails?.paymentLink;
    if (typeof window === "undefined") return;

    if (platform === "whatsapp") {
      window.open(
        `https://wa.me/?text=${encodeURIComponent(url || "")}`,
        "_blank"
      );
    } else if (platform === "telegram") {
      window.open(
        `https://t.me/share/url?url=${encodeURIComponent(url || "")}`,
        "_blank"
      );
    }
  };

  const handleCopy = (text: string, label: string) => {
    copyToClipboard(text);
    triggerConfetti("💸👻💸");

    toast({
      title: "Copied to clipboard",
      description: `${label} copied to clipboard so you can share it with your Valentines`,
    });
  };

  const triggerConfetti = (emoji: string) => {
    const scalar = 4;
    const confettiEmoji = confetti.shapeFromText({ text: emoji, scalar });

    const defaults = {
      spread: 360,
      ticks: 60,
      gravity: 0,
      decay: 0.96,
      startVelocity: 20,
      shapes: [confettiEmoji],
      scalar,
    };

    const shoot = () => {
      confetti({ ...defaults, particleCount: 30 });
      confetti({ ...defaults, particleCount: 5 });
      confetti({
        ...defaults,
        particleCount: 15,
        scalar: scalar / 2,
        shapes: ["circle"],
      });
    };

    setTimeout(shoot, 0);
    setTimeout(shoot, 100);
    setTimeout(shoot, 200);
  };

  return (
    <section className="mx-auto h-full flex flex-col items-center">
      <LinkUiForm
        handleValueChange={onValueChange}
        handleCreateLinkClick={onSubmitForm(handleSubmit)}
        isPeanutLoading={isPeanutLoading}
      />
      {overlayVisible && (
        <Overlay
          handleCloseOverlay={handleCloseOverlay}
          currentText={currentText}
          transactionDetails={transactionDetails}
          chainId={chainId}
          handleCopy={handleCopy}
          handleShare={handleShare}
          truncateHash={truncateAddress}
        />
      )}
    </section>
  );
}
