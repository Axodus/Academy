type NonceRecord = {
  nonce: string;
  network: "evm" | "solana";
  hint?: string;
  expiresAt: number;
  message: string;
};

const byNonce = new Map<string, NonceRecord>();

export const NonceStore = {
  put(rec: NonceRecord) {
    byNonce.set(rec.nonce, rec);
    return rec;
  },
  get(nonce: string) {
    return byNonce.get(nonce) ?? null;
  },
  consume(nonce: string) {
    byNonce.delete(nonce);
  },
  sweep(nowSec = Math.floor(Date.now() / 1000)) {
    for (const [k, v] of byNonce.entries()) {
      if (v.expiresAt <= nowSec) byNonce.delete(k);
    }
  }
};
