import "dotenv/config";

function num(v: string | undefined, d: number) {
  const n = Number(v);
  return Number.isFinite(n) ? n : d;
}

export const env = {
  appkitProjectId: process.env.APPKIT_PROJECT_ID ?? "reown_xxx",
  rpc: {
    ethereum: process.env.RPC_ETHEREUM ?? "",
    arbitrum: process.env.RPC_ARBITRUM ?? "",
    bnb: process.env.RPC_BNB ?? "",
    opbnb: process.env.RPC_OPBNB ?? "",
    harmony: process.env.RPC_HARMONY ?? ""
  },
  solanaRpc: process.env.RPC_SOLANA ?? "",
  jwtSecret: process.env.JWT_SECRET ?? "__strong_secret__",
  jwtTtlSeconds: num(process.env.JWT_TTL_SECONDS, 900),
  nonceTtlSeconds: num(process.env.NONCE_TTL_SECONDS, 300),
  corsOrigin: process.env.CORS_ORIGIN ?? "*",
  port: num(process.env.PORT, 8080)
} as const;
