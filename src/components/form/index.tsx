

import {
useForm
} from "react-hook-form"
import {
zodResolver
} from "@hookform/resolvers/zod"
import { formSchema, defaultValues, FormSchemaType } from './form-schema';
import { Form } from "@/components/ui/form"
import { MultiStepViewer } from "./multi-step-form"
import * as z from "zod";
import { createClient } from "@/utils/supabase/client";
import confetti from "canvas-confetti";
import { TransactionDetails } from "@/types";
import { BaseSepoliaTokens } from "@/constants/Tokens";
import { useState } from "react";
import { usePeanut } from "@/hooks/use-peanut";
import { useNetworkManager } from "@/hooks/use-dynamic-network";
import { useAccount } from "wagmi";
import { useToast } from "@/hooks/use-toast";
import { truncateAddress } from "@/utils/truncate-address";
import Overlay from "../overlay";


import React from "react"

export function CupidForm() {
    const {
        createPayLink,
        isLoading: isPeanutLoading,
        copyToClipboard,
      } = usePeanut();

    const [overlayVisible, setOverlayVisible] = useState(false);
    const [currentText, setCurrentText] = useState<string>("");
    const [tokenAmount, setTokenAmount] = useState<number>(0);
    const [transactionDetails, setTransactionDetails] = useState<TransactionDetails | null>(null);
    const { address } = useAccount();
    const currentChainId = useNetworkManager();
    const chainId = currentChainId as number;
    
    const { toast } = useToast();

  
    const supabase = createClient();

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
        triggerConfetti("💸❤️‍🔥💸");
    
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


    const formData = useForm<FormSchemaType>({
        resolver: zodResolver(formSchema),
        defaultValues,
    });

    const onValueChange = (tokenAmount: number) => {
        setTokenAmount(tokenAmount);
      };

    const handleSubmit = async (formData: any) => {
        console.log("Handle submit called with:", formData);
        
    
        setOverlayVisible(true);
        try {
          const tokenAddress = BaseSepoliaTokens[0].address;
          setCurrentText("Creating rose link...");
    
          // Generate peanut link first
          const linkResponse = await createPayLink(
            formData.amount_roses.toString(),
            tokenAddress,
            () => setCurrentText("Please be patient..."),
            () => setCurrentText("Rose link created successfully"),
            (error: Error) =>
              setCurrentText(`Failed to create link: ${error.message}`)
          );
    
          if (!linkResponse) {
            throw new Error("Failed to create peanut link");
          }
          console.log(linkResponse, "linkResponse");
          setTransactionDetails(linkResponse as TransactionDetails);
          console.log(
            linkResponse.paymentLink[0],
            "linkResponse.paymentLink[0]ddasdas"
          );
    
          // const rose = await createRoseSubmission({
          //   ...formData,
          //   amount_roses: tokenAmount.toString(),
          //   wallet_address_created_by: address,
          //   peanut_link: linkResponse.paymentLink[0],
          //   claimed: false,
          // });
    
          // if (!rose) {
          //   throw new Error("Failed to create rose submission");
          // }
          console.log(formData, "formData in HandleSubmit");
          console.log(formData.amount_roses.toString(), "tokenAmount in HandleSubmit");
          console.log(address, "address in HandleSubmit");
          console.log(linkResponse.paymentLink[0], "linkResponse.paymentLink[0] in HandleSubmit");
          const { data: submittedRose, error: roseError } = await supabase
            .from("roses")
            .insert([
              {
                ...formData,
                amount_roses: formData.amount_roses.toString(),
                wallet_address_created_by: address,
                peanut_link: linkResponse.paymentLink[0],
                claimed: false,
              },
            ])
            .select()
            .single();
          console.log(submittedRose, "submittedRose in HandleSubmit");
          console.log(roseError, "roseError in HandleSubmit");
          const { data: gameData, error: gameError } = await supabase
            .from("games")
            .insert([
              {
                roses_game: true,
                ascii_game: false,
                guess_game: false,
                poem_game: false,
                peanut_link: linkResponse.paymentLink[0],
              },
            ])
            .select()
            .single();
          console.log(gameData, "gameData in HandleSubmit");
          console.log(gameError, "gameError in HandleSubmit");
    
          const { data, error } = await supabase
            .from("peanut_link")
            .insert([
              {
                rose_id: submittedRose?.id,
                link: linkResponse.paymentLink[0],
                claimed: false,
                wallet_created: address as string,
                created_at: new Date().toISOString(),
              },
            ])
            .select()
            .single();
          console.log(data, "data");
          console.log(error, "error");
    
          const { error: roseError2 } = await supabase
            .from("roses")
            .update({ peanut_link: linkResponse.paymentLink[0] })
            .eq("id", submittedRose?.id);
    
          // const peanutLinkRecord = await createPeanutLink(
          //   rose.id,
          //   linkResponse.paymentLink[0],
          //   address as string,
          //   false
          // );
    
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
  
    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
          await handleSubmit(values);
        } catch (error) {
          console.error("Error in form submission:", error);
        }
      }  
    return (
      <div>
        <Form {...formData}>
          <form noValidate onSubmit={formData.handleSubmit(onSubmit)} className="flex flex-col p-2 md:p-5 w-full mx-auto rounded-md max-w-3xl gap-2 border">
            <MultiStepViewer formData={formData} loading={isPeanutLoading} onSubmit={onSubmit} tokenAmount={tokenAmount} setTokenAmount={function (amount: number): void {
                throw new Error("Function not implemented.");
            } }/>
          </form>
        </Form>
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
      </div>
    )
  }