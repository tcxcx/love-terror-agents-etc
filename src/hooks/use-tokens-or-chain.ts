import { BaseSepoliaTokens, BaseTokens } from "@/constants/Tokens";
import { IS_MAINNET as isMainnet } from "@/constants/Env";

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
};
