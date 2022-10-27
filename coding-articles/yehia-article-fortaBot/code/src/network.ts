export interface NetworkData {
  address: string;
  minimumDepositAmount: number;
  blacklistedAddresses: string[];
}

export const networkData: Record<number, NetworkData> = {
  80001: {
    address: "0xa87db9fe057cff6e296586bec6a6982a5a9b44b0",
    minimumDepositAmount: 0.01,
    blacklistedAddresses: [
      "0x7c71a3d85a8d620eeab9339cce776ddc14a8129c",
      "0x17156c0cf9701b09114cb3619d9f3fd937caa3a8",
    ],
  },
/**
   Bonus: Add Görli network here, note that for  Ethereum 0.01 ETH maybe a good amount so the minimumDepositAmount should be less than 0.01 ETH
 */
};
