import { ExtendedPaymentInfo, IGetLinkDetailsResponse } from "@/types";
import { getLinkDetails } from "@squirrel-labs/peanut-sdk";

export const formatCurrency = (
    value: bigint | number,
    options?: Intl.NumberFormatOptions
  ) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 2,
      ...options,
    }).format(Number(value));
  };
  
  export const formatToken = (
    value: bigint | number,
    options?: Intl.NumberFormatOptions
  ) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      maximumFractionDigits: 6,
      ...options,
    }).format(Number(value));
  };
  
  export const fetchLinkDetails = async (
    link: string,
    setDetails?: (details: IGetLinkDetailsResponse) => void,
    setPaymentInfo?: (paymentInfo: ExtendedPaymentInfo) => void,
  ) => {
    try {
      const details = (await getLinkDetails({
        link,
      })) as unknown as IGetLinkDetailsResponse;
      setDetails && setDetails(details);
      const extendedPaymentInfo: ExtendedPaymentInfo = {
        chainId: details.chainId,
        tokenSymbol: details.tokenSymbol,
        tokenAmount: details.tokenAmount,
        senderAddress: details.sendAddress,
        claimed: details.claimed,
        depositDate: details.depositDate,
        depositIndex: details.depositIndex,
      };
      setPaymentInfo && setPaymentInfo(extendedPaymentInfo);
    } catch (error: any) {
      console.error("Error fetching link details:", error.message);
    }
  };
  
  export const fetchLinkDetail = async (
    link: string,
  ) => {
    try {
      const details = (await getLinkDetails({
        link,
      })) as unknown as IGetLinkDetailsResponse;
      const extendedPaymentInfo: ExtendedPaymentInfo = {
        chainId: details.chainId,
        tokenSymbol: details.tokenSymbol,
        tokenAmount: details.tokenAmount,
        senderAddress: details.sendAddress,
        claimed: details.claimed,
        depositDate: details.depositDate,
        depositIndex: details.depositIndex,
      };
      return extendedPaymentInfo;
    } catch (error: any) {
      console.error("Error fetching link details:", error.message);
    }
  };
  
  export const saveClaimedLinkToLocalStorage = ({
    address,
    data,
  }: {
    address: string;
    data: ExtendedPaymentInfo;
  }) => {
    try {
      if (typeof localStorage === "undefined") return;
  
      const key = `${address} - claimed links`;
  
      const storedData = localStorage.getItem(key);
  
      let dataArr: ExtendedPaymentInfo[] = [];
      if (storedData) {
        dataArr = JSON.parse(storedData) as ExtendedPaymentInfo[];
      }
  
      dataArr.push(data);
  
      localStorage.setItem(key, JSON.stringify(dataArr));
    } catch (error) {
      console.error("Error adding data to localStorage:", error);
    }
  };
  
  export const saveCreatedLinkToLocalStorage = ({
    address,
    data,
  }: {
    address: string;
    data: {
      link: string;
      txHash: string;
      depositDate: string;
      linkDetails?: IGetLinkDetailsResponse;
    };
  }) => {
    try {
      if (typeof localStorage === "undefined") return;
  
      const key = `${address} - created links`;
  
      const storedData = localStorage.getItem(key);
  
      let dataArr: {
        link: string;
        txHash: string;
        depositDate: string;
        linkDetails?: IGetLinkDetailsResponse;
      }[] = [];
      if (storedData) {
        dataArr = JSON.parse(storedData) as {
          link: string;
          txHash: string;
          depositDate: string;
          linkDetails?: IGetLinkDetailsResponse;
        }[];
      }
  
      dataArr?.push(data);
  
      localStorage.setItem(key, JSON.stringify(dataArr));
    } catch (error) {
      console.error("Error adding data to localStorage:", error);
    }
  };
  
  export const getClaimedLinksFromLocalStorage = ({
    address = undefined,
  }: {
    address?: string;
  }) => {
    try {
      if (typeof localStorage === "undefined") return;
  
      let storedData;
      if (address) {
        const key = `${address} - claimed links`;
        storedData = localStorage.getItem(key);
      } else {
        const partialKey = "claimed links";
        const matchingItems = [];
  
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (key && key.includes(partialKey)) {
            const item = localStorage.getItem(key);
            if (!item) break;
            const value = JSON.parse(item);
            matchingItems.push(...value);
          }
        }
        storedData = JSON.stringify(matchingItems);
      }
  
      let data: ExtendedPaymentInfo[] = [];
      if (storedData) {
        data = JSON.parse(storedData) as ExtendedPaymentInfo[];
      }
  
      return data;
    } catch (error) {
      console.error("Error getting data from localStorage:", error);
    }
  };
  
  export const getAllLinksFromLocalStorage = ({
    address,
  }: {
    address: string;
  }) => {
    try {
      if (typeof localStorage === "undefined") return;
  
      const localStorageData: {
        address: string;
        hash: string;
        idx?: string;
        link: string;
      }[] = [];
  
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
  
        if (
          key === `${address} - created links` ||
          key === `${address} - claimed links`
        ) {
        } else if (key !== null && key?.includes(address)) {
          const value = localStorage.getItem(key);
          if (
            value !== null &&
            !key.includes("- raffle -") &&
            !key.includes("saving giga-link for address:") &&
            !key.includes("saving temp") &&
            value.includes("/love")
          ) {
            const x = {
              address: key.split("-")[0].trim(),
              hash: key.split("-")[1]?.trim() ?? "",
              idx: key.split("-")[2]?.trim() ?? "",
              link: value.replaceAll('"', ""),
            };
            localStorageData.push(x);
          }
        }
      }
      return localStorageData;
    } catch (error) {
      console.error("Error getting data from localStorage:", error);
    }
  };