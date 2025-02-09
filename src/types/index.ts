import type { Abi, Address, Hex } from "viem";

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
  }
  
  export type PeanutLink = {
    id: string;
    created_at: string;
    rose_id: string;
    link: string;
    claimed: boolean;
    claimed_at?: string;
    claimed_by?: string;
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