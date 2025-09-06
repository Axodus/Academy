export const EIP712_DOMAIN = (chainId: number) => ({
  name: "Axodus CMS",
  version: "1",
  chainId,
  verifyingContract: "0x0000000000000000000000000000000000000000"
});

export const EIP712_TYPES = {
  Login: [
    { name: "wallet", type: "address" },
    { name: "nonce",  type: "bytes32"  },
    { name: "ttl",    type: "uint64"   }
  ]
} as const;
