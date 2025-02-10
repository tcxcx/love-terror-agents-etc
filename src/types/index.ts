import { Dispatch } from "react";
import { SetStateAction } from "react";
import type { Abi, Address, Hex } from "viem";

export interface ValentinesUser {
  id: number;
  wallet_address: string;
  name: string;
  created_at?: string;
}

export interface GameState {
  id: string;
  created_at?: string;
  roses_game: boolean;
  ascii_game: boolean;
  guess_game: boolean;
  poem_game: boolean;
  valentines_user_id?: number;
  roses?: Rose[];
  valentines_user?: ValentinesUser;
  claimed?: boolean;
}

export interface IGetLinkDetailsResponse {
    link: string;
    chainId: string;
    depositIndex: number;
    contractVersion: string;
    password: string;
    sendAddress: string;
    tokenType: string;
    tokenAddress: string;
    tokenDecimals: number;
    tokenSymbol: string;
    TokenName: string;
    tokenAmount: string;
    tokenId: number;
    claimed: boolean;
    depositDate: string;
    tokenURI: string;
  }

  export type Rose = {
    id: string;
    created_at: string;
    valentines_name: string;
    secret_admirer_name: string;
    secret_question: string;
    secret_answer: string;
    system_prompt: string;
    clue_1: string;
    clue_2?: string;
    clue_3?: string;
    clue_4?: string;
    clue_5?: string;
    clue_6?: string;
    clue_7?: string;
    poem_text: string;
    date_site: string;
    date_details?: string;
    calendly_link?: string;
    amount_roses: number;
    peanut_link?: string;
    claimed: boolean;
    game_id?: string;
    wallet_address_created_by?: string;
    peanut_links?: PeanutLink[];
  }
  
  export type PeanutLink = {
    id: string;
    created_at: string;
    rose_id: string;
    link: string;
    claimed: boolean;
    claimed_at?: string;
    claimed_by?: string;
    rose?: Rose;
  }

  export interface Token {
    address: Hex | string | `0x${string}`;
    chainId: number;
    decimals: number;
    payable?: boolean;
    name: string;
    symbol: string;
    image: string;
    isNative?: boolean;
  }

  export interface ExtendedPaymentInfo {
    chainId: number | string;
    tokenSymbol: string;
    tokenAmount: string;
    senderAddress: string;
    claimed: boolean;
    depositDate: string;
    transactionHash?: string;
    depositIndex: number;
  }

  export interface IGetLinkDetailsResponse {
    link: string;
    chainId: string;
    depositIndex: number;
    contractVersion: string;
    password: string;
    sendAddress: string;
    tokenType: string;
    tokenAddress: string;
    tokenDecimals: number;
    tokenSymbol: string;
    TokenName: string;
    tokenAmount: string;
    tokenId: number;
    claimed: boolean;
    depositDate: string;
    tokenURI: string;
  }

  export interface TransactionDetails {
    transactionHash: string;
    peanutLink: string;
    paymentLink: string;
  }

export type ChainList = 8453 | 84532  | undefined;
export interface WriteButtonProps {
  label: string;
  contractAddress: string;
  abi: any;
  functionName: string;
  args: any[];
  isNative?: boolean;
  nativeAmount?: string;
}

export interface TransactionDetailsDisplayProps {
  transactionDetails: TransactionDetails;
  chainId: number | undefined;
  handleCopy: (text: string, label: string) => void;
  handleShare: (platform: string) => void;
  truncateHash: (hash: string) => string;
}

export interface LinkUiFormProps {
  tokenAmount: number;
  handleValueChange: (usdAmount: number, tokenAmount: number) => void;
  availableTokens: Token[];
  setSelectedToken: Dispatch<SetStateAction<string>>;
  chainId: number | undefined;
  handleCreateLinkClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  isPeanutLoading: boolean;
}


export interface Chain {
  chainId: number;
  isMainnet: boolean;
  name: string;
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
    iconUrls: string[];
  };
  rpcUrls: string[];
  blockExplorerUrls: string[];
  chainName: string;
  vanityName: string;
  networkId: number;
  iconUrls: string[];
}

export interface CurrencyDisplayerProps {
  onValueChange: (value: number, formattedValue: number) => void;
  initialAmount?: number;
  availableTokens: Token[];
  onTokenSelect: (token: Token) => void;
  currentNetwork: number;
  tokenAmount?: number | string;
  size?: "sm" | "base" | "lg";
  action?: "default" | "pay";
  defaultToken?: Token;
}

export interface UseTokenBalanceProps {
  tokenAddress: Address;
  chainId: ChainList;
  address: Address;
  decimals: number;
  setBalance?: (balance: string) => void;
}

export interface FramedQRCodeProps {
  image: string;
  copyLink?: () => void;
  link: string;
  frameText?: string;
}

export interface ShareOptions {
  link: string;
  message: string;
}


export interface ExtendedPaymentInfo {
  chainId: number | string;
  tokenSymbol: string;
  tokenAmount: string;
  senderAddress: string;
  claimed: boolean;
  depositDate: string;
  transactionHash?: string;
  depositIndex: number;
}

export interface IGetLinkDetailsResponse {
  link: string;
  chainId: string;
  depositIndex: number;
  contractVersion: string;
  password: string;
  sendAddress: string;
  tokenType: string;
  tokenAddress: string;
  tokenDecimals: number;
  tokenSymbol: string;
  TokenName: string;
  tokenAmount: string;
  tokenId: number;
  claimed: boolean;
  depositDate: string;
  tokenURI: string;
}

export interface ChainSelectProps {
  value: string | null;
  onChange: (value: string) => void;
  chains: Chain[];
  label: string;
  chainId?: number | undefined | string;
  ccip?: boolean;
}

export interface PaymentInfoProps {
  paymentInfo: {
    chainId: number | string;
    tokenSymbol: string;
    tokenAmount: string;
    senderAddress: string;
    claimed: boolean;
    depositDate: string;
    transactionHash?: string;
    destinationChainId?: number;
    destinationChainName?: string;
  };
}