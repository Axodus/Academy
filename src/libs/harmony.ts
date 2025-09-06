import { Wallet, JsonRpcProvider, Contract } from "ethers";
import { env } from "../config/env";
import PointerRegistry from "../abis/PointerRegistry.json" assert { type: "json" };
import PermissionRegistry from "../abis/PermissionRegistry.json" assert { type: "json" };

const provider = new JsonRpcProvider(env.rpcUrl, env.chainId);
const wallet = new Wallet(env.privateKey, provider);

export const contracts = {
  pointer: new Contract(env.pointerRegistry, PointerRegistry as any, wallet),
  permission: new Contract(env.permissionRegistry, PermissionRegistry as any, provider),
};
