import { Chain } from "@/types";
import * as Chains from "@/utils/constants/Chains";

const BLOCKSCOUT_EXPLORERS: Record<number, string> = {
    1: "https://eth.blockscout.com",
    10: "https://optimism.blockscout.com",
    420: "https://optimism-sepolia.blockscout.com",
    42220: "https://celo.blockscout.com",
    44787: "https://alfajores.blockscout.com",
    8453: "https://base.blockscout.com",
    84532: "https://base-sepolia.blockscout.com",
    34443: "https://mode.blockscout.com",
    919: "https://mode-testnet.blockscout.com",
    11155111: "https://sepolia.blockscout.com",
  };
  
  export function getBlockExplorerUrl(chain: Chain): string {
    return BLOCKSCOUT_EXPLORERS[chain.chainId] || chain.rpcUrls[0] || "";
  }
  export function isValidAmount(value: string) {
    if (value === "") {
      return true;
    }
    const regex = /^[0-9]*\.?[0-9]*$/;
    return regex.test(value);
  }
  
  export function getRoundedAmount(balance: string, fractionDigits: number) {
    if (balance === "0") {
      return balance;
    }
    const parsedBalance = Number.parseFloat(balance);
    const result = Number(parsedBalance)
      ?.toFixed(fractionDigits)
      .replace(/0+$/, "");
  
    if (parsedBalance > 0 && Number.parseFloat(result) === 0) {
      return "0";
    }
  
    return result;
  }


export function getBlockExplorerUrlByChainId(chainId: number): string {
    return BLOCKSCOUT_EXPLORERS[chainId] || "";
  }

  export const getAllChains = () => {
    return Object.values(Chains);
  };
  