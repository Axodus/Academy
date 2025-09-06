import "dotenv/config";

export const env = {
  nodeEnv: process.env[".env-NODE_ENV"] ?? "development",
  port: Number(process.env[".env-PORT"] ?? 8080),

  jwtSecret: process.env[".env-JWT_SECRET"] ?? "change-me",
  jwtTtl: process.env[".env-JWT_TTL"] ?? "10m",

  chainId: Number(process.env[".env-CHAIN_ID"] ?? 1666600000),
  rpcUrl: process.env[".env-RPC_URL"] ?? "https://api.harmony.one",
  pointerRegistry: process.env[".env-POINTER_REGISTRY"] ?? "0x0000000000000000000000000000000000000001",
  permissionRegistry: process.env[".env-PERMISSION_REGISTRY"] ?? "0x0000000000000000000000000000000000000002",
  privateKey: process.env[".env-PRIVATE_KEY"] ?? "0x" + 0000000000000000000000000000000000000000000000000000000000000000,

  gnfd: {
    endpoint: process.env[".env-GREENFIELD_ENDPOINT"] ?? "https://greenfield-chain-endpoint",
    bucket: process.env[".env-GREENFIELD_BUCKET"] ?? "axodus-cms",
    accessKey: process.env[".env-GREENFIELD_ACCESS_KEY"] ?? "gnfd-ak",
    secretKey: process.env[".env-GREENFIELD_SECRET_KEY"] ?? "gnfd-sk",
    region: process.env[".env-GREENFIELD_REGION"] ?? "ap-southeast-1",
    signTtl: Number(process.env[".env-GREENFIELD_SIGN_TTL"] ?? 900),
  },

  enableMetrics: (process.env[".env-ENABLE_METRICS"] ?? "true") === "true",
} as const;
