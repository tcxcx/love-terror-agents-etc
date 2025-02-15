export const Base = {
  chainId: 8453,
  isMainnet: true,
  name: "Base",
  nativeCurrency: {
    name: "Base",
    symbol: "ETH",
    decimals: 18,
    iconUrls: ["https://app.dynamic.xyz/assets/networks/base.svg"],
  },
  rpcUrls: [
    `https://base-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`,
  ],
  blockExplorerUrls: ["https://base.blockscout.com"],
  chainName: "Base",
  vanityName: "Base",
  networkId: 8453,
  iconUrls: ["https://app.dynamic.xyz/assets/networks/base.svg"],
};

export const Avalanche = {
  chainId: 43114,
  isMainnet: true,
  name: "Avalanche",
  blockExplorerUrls: ["https://snowtrace.io/"],
  nativeCurrency: {
    name: "Avalanche",
    symbol: "AVAX",
    decimals: 18,
    iconUrls: ["https://app.dynamic.xyz/assets/networks/avax.svg"],
  },
  rpcUrls: ["https://rpc.ankr.com/avalanche"],
  vanityName: "Avalanche ",
  chainName: "Avalanche",
  networkId: 43114,
  iconUrls: ["https://app.dynamic.xyz/assets/networks/avax.svg"],
};
