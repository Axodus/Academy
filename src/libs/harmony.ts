import { Wallet, JsonRpcProvider, Contract } from "ethers";
import { env } from "../config/env";
import PointerRegistry from "../abis/PointerRegistry.json" assert { type: "json" };
import PermissionRegistry from "../abis/PermissionRegistry.json" assert { type: "json" };

const provider = new JsonRpcProvider(env.rpc.harmony);
const wallet = new Wallet(process.env.PRIVATE_KEY as string, provider);

export const contracts = {
  pointer: new Contract((env as any).pointerRegistry, PointerRegistry as any, wallet),
  permission: new Contract((env as any).permissionRegistry, PermissionRegistry as any, provider),
};
