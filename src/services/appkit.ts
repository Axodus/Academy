import { createAppKit } from "@reown/appkit/react";
import { EthersAdapter } from "@reown/appkit-adapter-ethers";
import { defineChain } from "@reown/appkit/networks";
import { JsonRpcProvider } from "ethers";
import { envOr } from "./env";

export const CHAIN_ID = Number(envOr("CHAIN_ID", "1666600000"));
const RPC_URL = envOr("RPC_URL", "https://api.harmony.one");
const PROJECT_ID = envOr("PROJECT_ID", "demo-project-id")!;

export const harmony = defineChain({
  id: CHAIN_ID,
  name: "Harmony",
  nativeCurrency: { name: "ONE", symbol: "ONE", decimals: 18 },
  rpcUrls: { default: { http: [RPC_URL!] } }
});

const provider = new JsonRpcProvider(RPC_URL!, CHAIN_ID);

export const appKit = createAppKit({
  adapters: [new EthersAdapter({ rpcProvider: provider })],
  projectId: PROJECT_ID,
  metadata: {
    name: envOr("APP_NAME", "Axodus Academy")!,
    description: "Axodus Academy WalletConnect integration",
    url: envOr("APP_URL", "http://localhost:5173")!,
    icons: [envOr("APP_ICON","https://app.axodus.finance/icon.png")!]
  },
  networks: [harmony],
  features: { analytics: false }
});

export function getRpcProvider() {
  return provider;
}
