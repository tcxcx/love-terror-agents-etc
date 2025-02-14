"use client";

import { useEffect } from "react";
import { parseAsBoolean, useQueryState } from "nuqs";
import { fetchLinkDetails } from "@/utils/local-storage";
import { IGetLinkDetailsResponse, ExtendedPaymentInfo } from "@/types";


export function LoveLink() {
  const [claimId] = useQueryState("love");
  const [peanutLink, setPeanutLink] = useQueryState("peanutLink");
  const [isLoading, setIsLoading] = useQueryState("isLoading", parseAsBoolean);
  const [isValidLink, setIsValidLink] = useQueryState("isValidLink", parseAsBoolean);
  const [isClaimed, setIsClaimed] = useQueryState("isClaimed", parseAsBoolean);
  const [details, setDetails] = useQueryState("details", {
    defaultValue: null,
    parse: (value: string | null) => (value === "null" ? null : JSON.parse(value ?? "null")),
    serialize: (value: IGetLinkDetailsResponse | null) => 
      value === null ? "null" : JSON.stringify(value),
  });
  const [paymentInfo, setPaymentInfo] = useQueryState("paymentInfo", {
    defaultValue: null,
    parse: (value: string | null) => (value === "null" ? null : JSON.parse(value ?? "null")),
    serialize: (value: ExtendedPaymentInfo | null) => 
      value === null ? "null" : JSON.stringify(value),
  });

  useEffect(() => {
    async function getLinkDetails() {
      try {
        if (!claimId) {
          setIsLoading(false);
          setIsValidLink(false);
          return;
        }

        const baseUrl = process.env.NEXT_PUBLIC_URL || "https://cringy-cupid.com";
        const fullUrl = `${baseUrl}/love?claimId=${claimId}`;

        await fetchLinkDetails(
          fullUrl,
          (linkDetails) => {
            setDetails(linkDetails);
            setIsValidLink(true);
            setPeanutLink(fullUrl);
          },
          (paymentInfoData) => {
            setPaymentInfo(paymentInfoData);
            setIsClaimed(Boolean(paymentInfoData?.claimed));
          }
        );
      } catch (error) {
        console.error("Error fetching link details:", error);
        setIsValidLink(false);
      } finally {
        setIsLoading(false);
      }
    }

    getLinkDetails();
  }, [claimId, setDetails, setIsLoading, setIsValidLink, setPeanutLink, setPaymentInfo, setIsClaimed]);

  return {
    peanutLink,
    isLoading: Boolean(isLoading),
    isValidLink: Boolean(isValidLink),
    isClaimed: Boolean(isClaimed),
    details,
    paymentInfo,
  };
}