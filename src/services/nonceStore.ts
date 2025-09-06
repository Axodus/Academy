const mem = new Map<string, { nonce: `0x${string}`; ttl: number }>();

export const NonceStore = {
  async put(wallet: string, nonce: `0x${string}`, ttl: number) {
    mem.set(wallet.toLowerCase(), { nonce, ttl });
  },
  async get(wallet: string) {
    return mem.get(wallet.toLowerCase()) ?? null;
  },
  async consume(wallet: string) {
    mem.delete(wallet.toLowerCase());
  }
};
