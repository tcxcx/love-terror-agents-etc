import {
    BaseSepoliaTokens,
    BaseTokens,
  } from "@/utils/constants/Tokens";
  import {
    Base,
    BaseSepolia,
  } from "@/utils/constants/Chains";
  import { IS_MAINNET as isMainnet } from "@/utils/constants/Env";
  
  export const useGetTokensOrChain = (
    chainId: number,
    type: "tokens" | "chain"
  ) => {
    if (type === "tokens" && !isMainnet) {
      if (chainId === 84532) return BaseSepoliaTokens;
    }
    if (type === "tokens" && isMainnet) {
      if (chainId === 8453) return BaseTokens;
    }
    if (type === "chain" && !isMainnet) {
      if (chainId === 84532) return BaseSepolia;

    }
    if (type === "chain" && isMainnet) {
      if (chainId === 84532) return BaseSepolia;
    }
  };
  