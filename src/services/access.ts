import { getAddress, keccak256, toUtf8Bytes } from "ethers";
import { contracts } from "../libs/harmony";

export async function canAccess(wallet: string, uri: string, op: "GET"|"PUT") {
  const who = getAddress(wallet);
  const resource = keccak256(toUtf8Bytes(uri));        // resource id = keccak(uri)
  const opCode   = op === "GET" ? "0x47455400" : "0x50555400";
  return Boolean(await contracts.permission.hasAccess(who, resource, opCode));
}
