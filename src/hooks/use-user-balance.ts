import { UseTokenBalanceProps, ChainList } from "@/types";
import { useBalance, UseBalanceReturnType } from "wagmi";

export function useTokenBalance({
  tokenAddress,
  chainId,
  address,
  setBalance: externalSetBalance,
}: UseTokenBalanceProps): UseBalanceReturnType {
  let balance;
  if (tokenAddress !== "0x0000000000000000000000000000000000000000") {
    balance = useBalance({
      address: address,
      token: tokenAddress,
      chainId: chainId,
    });
  } else {
    balance = useBalance({
      address: address,
      chainId: chainId,
    });
  }

  console.log("balance in use-user-balance", balance);

  return balance;
}
