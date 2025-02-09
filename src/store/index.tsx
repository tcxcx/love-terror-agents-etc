
import { Token } from "@/types";
import { create } from "zustand";

interface TransactionState {
    isLoading: boolean;
    error: string | null;
    setLoading: (isLoading: boolean) => void;
    setError: (error: string | null) => void;
  }

interface NetworkState {
    currentChainId: number | string | undefined;
    setCurrentChainId: (chainId: number | string | undefined) => void;
    isLoading: boolean;
    error: string | null;
    setLoading: (isLoading: boolean) => void;
    setError: (error: string | null) => void;
}


export interface PayLinkStore {
  amount: string;
  token: Token | null;
  chainId: number;
  setAmount: (amount: string) => void;
  setToken: (token: Token) => void;
  setChainId: (chainId: number) => void;
}

export const useTransactionStore = create<TransactionState>((set) => ({
    isLoading: false,
    error: null,
    setLoading: (isLoading) => set({ isLoading }),
    setError: (error) => set({ error }),
  }));


  export const useNetworkStore = create<NetworkState>((set) => ({
    currentChainId: undefined,
    setCurrentChainId: (chainId: number | string | undefined) =>
      set({ currentChainId: chainId }),
    isLoading: false,
    error: null,
    setLoading: (isLoading) => set({ isLoading }),
    setError: (error) => set({ error }),
  }));


export const usePayLinkStore = create<PayLinkStore>((set) => ({
  amount: '0',
  token: null,
  chainId: 1,
  setAmount: (amount) => set({ amount }),
  setToken: (token) => set({ token }),
  setChainId: (chainId) => set({ chainId }),
}));