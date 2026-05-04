import { createAppKit } from "@reown/appkit/react";
import { EthersAdapter } from "@reown/appkit-adapter-ethers";
import { defineChain } from "@reown/appkit/networks";
import { JsonRpcProvider } from "ethers";
import { envOr } from "./env";

const RPC_ETHEREUM = envOr(".env-RPC_ETHEREUM", "https://eth.llamarpc.com")!;
const RPC_ARBITRUM = envOr(".env-RPC_ARBITRUM", "https://arb1.arbitrum.io/rpc")!;
const RPC_BNB = envOr(".env-RPC_BNB", "https://bsc-dataseed.binance.org")!;
const RPC_OPBNB = envOr(".env-RPC_OPBNB", "https://opbnb-mainnet-rpc.bnbchain.org")!;
const RPC_HARMONY = envOr(".env-RPC_HARMONY", "https://api.harmony.one");

const PROJECT_ID = envOr(".env-APPKIT_PROJECT_ID", envOr("VITE_PROJECT_ID", "demo-project-id"))!;
const APP_NAME = envOr(".env-APP_NAME", "Axodus Academy")!;
const APP_URL = envOr(".env-APP_URL", "http://localhost:5173")!;
const APP_ICON = envOr(".env-APP_ICON", "https://app.axodus.finance/icon.png")!;

export const CHAIN_IDS = {
  ethereum: Number(envOr(".env-CHAIN_ID_ETHEREUM", envOr("VITE_CHAIN_ID_ETHEREUM", "1"))),
  arbitrum: Number(envOr(".env-CHAIN_ID_ARBITRUM", envOr("VITE_CHAIN_ID_ARBITRUM", "42161"))),
  bnb: Number(envOr(".env-CHAIN_ID_BNB", envOr("VITE_CHAIN_ID_BNB", "56"))),
  opbnb: Number(envOr(".env-CHAIN_ID_OPBNB", envOr("VITE_CHAIN_ID_OPBNB", "204"))),
  harmony: Number(envOr(".env-CHAIN_ID_HARMONY", envOr("VITE_CHAIN_ID_HARMONY", "1666600000")))
} as const;

export const chainsEvm = {
  ethereum: defineChain({ id: CHAIN_IDS.ethereum, chainNamespace: "evm" as any, caipNetworkId: `eip155:${CHAIN_IDS.ethereum}`, name: "Ethereum", nativeCurrency: { name: "ETH", symbol: "ETH", decimals: 18 }, rpcUrls: { default: { http: [RPC_ETHEREUM] } } }),
  arbitrum: defineChain({ id: CHAIN_IDS.arbitrum, chainNamespace: "evm" as any, caipNetworkId: `eip155:${CHAIN_IDS.arbitrum}`, name: "Arbitrum One", nativeCurrency: { name: "ETH", symbol: "ETH", decimals: 18 }, rpcUrls: { default: { http: [RPC_ARBITRUM] } } }),
  bnb: defineChain({ id: CHAIN_IDS.bnb, chainNamespace: "evm" as any, caipNetworkId: `eip155:${CHAIN_IDS.bnb}`, name: "BNB Smart Chain", nativeCurrency: { name: "BNB", symbol: "BNB", decimals: 18 }, rpcUrls: { default: { http: [RPC_BNB] } } }),
  opbnb: defineChain({ id: CHAIN_IDS.opbnb, chainNamespace: "evm" as any, caipNetworkId: `eip155:${CHAIN_IDS.opbnb}`, name: "opBNB", nativeCurrency: { name: "BNB", symbol: "BNB", decimals: 18 }, rpcUrls: { default: { http: [RPC_OPBNB] } } }),
  harmony: RPC_HARMONY ? defineChain({ id: CHAIN_IDS.harmony, chainNamespace: "evm" as any, caipNetworkId: `eip155:${CHAIN_IDS.harmony}`, name: "Harmony", nativeCurrency: { name: "ONE", symbol: "ONE", decimals: 18 }, rpcUrls: { default: { http: [RPC_HARMONY] } } }) : undefined
};

const defaultRpc = RPC_ETHEREUM;
const defaultChainId = CHAIN_IDS.ethereum;
const defaultProvider = new JsonRpcProvider(defaultRpc, defaultChainId);

const networks = [
  chainsEvm.ethereum,
  chainsEvm.arbitrum,
  chainsEvm.bnb,
  chainsEvm.opbnb,
  ...(chainsEvm.harmony ? [chainsEvm.harmony] : [])
].filter(Boolean) as [ReturnType<typeof defineChain>, ...ReturnType<typeof defineChain>[]];

export const appKit = createAppKit({
  adapters: [new EthersAdapter()],
  projectId: PROJECT_ID,
  metadata: { name: APP_NAME, description: "Axodus Academy WalletConnect/AppKit", url: APP_URL, icons: [APP_ICON] },
  networks,
  features: { analytics: false }
});

export type EvmConnectResult = { address: string; chainId: number };

export async function connectEvm(): Promise<EvmConnectResult> {
  // Open the app kit and await the connection state directly
  const state: any = await appKit.open();
  if (!state?.address || !state?.chainId) {
    throw new Error("Failed to connect or retrieve address/chainId from AppKit");
  }
  return { address: String(state.address), chainId: Number(state.chainId) };
}

declare global {
  interface Window {
    solana?: {
      isPhantom?: boolean;
      connect: () => Promise<{ publicKey: { toBase58(): string } }>;
      signMessage?: (msg: Uint8Array, encoding: string) => Promise<{ signature: Uint8Array }>;
    };
  }
}

export type SolanaConnectResult = { pubkey: string };

export async function connectSolana(): Promise<SolanaConnectResult> {
  if (!window.solana) throw new Error("Solana provider not found. Install Phantom.");
  const res = await window.solana.connect();
  const pubkey = res.publicKey.toBase58();
  return { pubkey };
}

export async function signSolanaMessage(message: string): Promise<string> {
  if (!window.solana?.signMessage) throw new Error("Wallet does not support signMessage");
  const bytes = new TextEncoder().encode(message);
  const { signature } = await window.solana.signMessage(bytes, "utf8");
  const b64 = btoa(String.fromCharCode(...Array.from(signature)));
  return b64;
}
