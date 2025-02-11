import type { Token } from "@/types";
import { Hex } from "viem";

export const NATIVE_TOKEN_ADDRESS =
  "0x0000000000000000000000000000000000000000" as Hex;
////////////////////////////// TOKEN ORDER IS IMPORTANT //////////////////////////////
////////////////////////////// TOKEN ORDER IS IMPORTANT //////////////////////////////
////////////////////////////// TOKEN ORDER IS IMPORTANT //////////////////////////////
////////////////////////////// TOKEN ORDER IS IMPORTANT //////////////////////////////

////////////////////////////// TOKEN ORDER IS IMPORTANT //////////////////////////////
export const BaseSepoliaTokens: Token[] = [
  {
    address: NATIVE_TOKEN_ADDRESS,
    chainId: 84532,
    decimals: 18,
    name: "Ethereum",
    payable: false,
    symbol: "ETH",
    image:
      "https://dynamic-assets.coinbase.com/dbb4b4983bde81309ddab83eb598358eb44375b930b94687ebe38bc22e52c3b2125258ffb8477a5ef22e33d6bd72e32a506c391caa13af64c00e46613c3e5806/asset_icons/4113b082d21cc5fab17fc8f2d19fb996165bcce635e6900f7fc2d57c4ef33ae9.png",
  },
  {
    address: "0x036CbD53842c5426634e7929541eC2318f3dCF7e" as Hex,
    chainId: 84532,
    decimals: 6,
    name: "USDC",
    symbol: "USDC",
    payable: true,
    image:
      "https://dynamic-assets.coinbase.com/3c15df5e2ac7d4abbe9499ed9335041f00c620f28e8de2f93474a9f432058742cdf4674bd43f309e69778a26969372310135be97eb183d91c492154176d455b8/asset_icons/9d67b728b6c8f457717154b3a35f9ddc702eae7e76c4684ee39302c4d7fd0bb8.png",
  },
  {
    address: "0x036CbD53842c5426634e7929541eC2318f3dCF7e" as Hex,
    chainId: 84532,
    decimals: 18,
    name: "LOVE",
    payable: true,
    symbol: "LOVE",
    image: "/images/pixel-roses.png",
  },
];
////////////////////////////// TOKEN ORDER IS IMPORTANT //////////////////////////////

export const BaseTokens: Token[] = [
  {
    address: NATIVE_TOKEN_ADDRESS,
    chainId: 84532,
    decimals: 18,
    name: "Ethereum",
    payable: false,
    symbol: "ETH",
    image:
      "https://dynamic-assets.coinbase.com/dbb4b4983bde81309ddab83eb598358eb44375b930b94687ebe38bc22e52c3b2125258ffb8477a5ef22e33d6bd72e32a506c391caa13af64c00e46613c3e5806/asset_icons/4113b082d21cc5fab17fc8f2d19fb996165bcce635e6900f7fc2d57c4ef33ae9.png",
  },
  {
    address: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913" as Hex,
    chainId: 8453,
    decimals: 6,
    name: "USDC",
    payable: true,
    symbol: "USDC",
    image:
      "https://dynamic-assets.coinbase.com/3c15df5e2ac7d4abbe9499ed9335041f00c620f28e8de2f93474a9f432058742cdf4674bd43f309e69778a26969372310135be97eb183d91c492154176d455b8/asset_icons/9d67b728b6c8f457717154b3a35f9ddc702eae7e76c4684ee39302c4d7fd0bb8.png",
  },
  {
    address: "0x036CbD53842c5426634e7929541eC2318f3dCF7e" as Hex,
    chainId: 8453,
    decimals: 18,
    name: "LOVE",
    payable: true,
    symbol: "LOVE",
    image: "/images/pixel-roses.png",
  },
];

export const allTokens = [...BaseSepoliaTokens, ...BaseTokens];
