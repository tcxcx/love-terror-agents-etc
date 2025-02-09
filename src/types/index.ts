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