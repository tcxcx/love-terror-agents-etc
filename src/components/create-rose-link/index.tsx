"use client";

import { useEffect, useState } from "react";
import { usePeanut } from "@/hooks/use-peanut";
import { useToast } from "@/hooks/use-toast";
import LinkUiForm from "@/components/create-link-input";
import Overlay from "@/components/overlay";
import { TransactionDetails } from "@/types";
import confetti from "canvas-confetti";
import { useAccount } from "wagmi";
import { useNetworkManager } from "@/hooks/use-dynamic-network";
import { truncateAddress } from "@/utils/truncate-address";

import { BaseSepoliaTokens } from "@/constants/Tokens";
import supabase from "@/utils/supabase/client";

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
  const [userLoggedIn, setUserLoggedIn] = useState<any>(null);
  const [userId, setUserId] = useState<string>("");

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUserLoggedIn(user);
      setUserId(user?.id!);
    };
    getUser();
  }, []);



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

  const handleSubmit = async (formData: any) => {
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

      const { data: gameData, error: gameError } = await supabase
        .from("games")
        .insert([
          {
            roses_game: true,
            ascii_game: false,
            guess_game: false,
            poem_game: false,
            peanut_link: linkResponse.paymentLink
          },
        ])
        .select()
        .single();

      const { data: submittedRose, error: roseError } = await supabase
        .from("roses")
        .insert([
          {
            ...formData,
            game_id: gameData.id,
          },
        ])
        .select()
        .single();

      console.log(submittedRose, "submittedRose");
      console.log(gameData, "gameData");
      console.log(roseError, "roseError");
      console.log(gameError, "gameError");

      const { data, error } = await supabase
        .from("peanut_link")
        .insert([
          {
            rose_id: submittedRose.id,
            link: linkResponse.paymentLink,
            claimed: false,
            created_at: new Date().toISOString(),
          },
        ])
        .select()
        .single();
      console.log(data, "data");
      console.log(error, "error");

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