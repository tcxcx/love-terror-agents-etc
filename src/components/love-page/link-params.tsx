"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { fetchLinkDetails } from "@/utils/local-storage";
import { IGetLinkDetailsResponse, ExtendedPaymentInfo } from "@/types";

interface LinkState {
  peanutLink: string | null;
  isLoading: boolean;
  isValidLink: boolean;
  isClaimed: boolean;
  details: IGetLinkDetailsResponse | null;
  paymentInfo: ExtendedPaymentInfo | null;
}

export function LoveLink() {
  const searchParams = useSearchParams();
  const claimId = searchParams?.toString() || "";

  const [state, setState] = useState<LinkState>({
    peanutLink: null,
    isLoading: true,
    isValidLink: false,
    isClaimed: false,
    details: null,
    paymentInfo: null,
  });

  useEffect(() => {
    async function getLinkDetails() {
      try {
        if (!claimId) {
          setState((prev) => ({
            ...prev,
            isLoading: false,
            isValidLink: false,
          }));
          return;
        }

        const baseUrl = process.env.NEXT_PUBLIC_URL || "http://localhost:3000";
        const fullUrl = `${baseUrl}/love?${claimId}`;

        await fetchLinkDetails(
          fullUrl,
          (linkDetails) => {
            setState((prev) => ({
              ...prev,
              details: linkDetails,
              isValidLink: true,
              peanutLink: fullUrl,
            }));
          },
          (paymentInfo) => {
            setState((prev) => ({
              ...prev,
              paymentInfo,
              isClaimed: Boolean(paymentInfo?.claimed),
            }));
          }
        );
      } catch (error) {
        console.error("Error fetching link details:", error);
        setState((prev) => ({
          ...prev,
          isValidLink: false,
        }));
      } finally {
        setState((prev) => ({ ...prev, isLoading: false }));
      }
    }

    getLinkDetails();
  }, [searchParams]);

  return {
    peanutLink: state.peanutLink,
    isLoading: state.isLoading,
    isValidLink: state.isValidLink,
    isClaimed: state.isClaimed,
    details: state.details,
    paymentInfo: state.paymentInfo,
  };
}
