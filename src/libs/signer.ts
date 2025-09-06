import { recoverAddress, TypedDataEncoder, getAddress, hexlify, randomBytes } from "ethers";
import { env } from "../config/env";
import { EIP712_DOMAIN, EIP712_TYPES } from "../types/eip712";
import { NonceStore } from "../services/nonceStore";

export function newNonce(): `0x${string}` {
  return hexlify(randomBytes(32)) as `0x${string}`;
}

export function loginTypedData(wallet: string, nonce: `0x${string}`, ttlSec: number) {
  const domain = EIP712_DOMAIN(env.chainId);
  const message = { wallet: getAddress(wallet), nonce, ttl: BigInt(ttlSec) };
  return { domain, types: EIP712_TYPES, primaryType: "Login" as const, message };
}

export async function verifyLoginSignature(
  wallet: string,
  signature: `0x${string}`,
  nonce: `0x${string}`
) {
  const rec = await NonceStore.get(wallet);
  if (!rec || rec.nonce !== nonce) return { ok: false, reason: "nonce_mismatch" };
  if (Date.now() / 1000 > rec.ttl) return { ok: false, reason: "nonce_expired" };

  const typed = loginTypedData(wallet, nonce, rec.ttl);
  const digest = TypedDataEncoder.hash(typed.domain, typed.types as any, typed.message);
  const recovered = await recoverAddress(digest, signature);
  const ok = getAddress(recovered) === getAddress(wallet);

  if (ok) await NonceStore.consume(wallet); // anti-replay
  return { ok, reason: ok ? undefined : "bad_signature" };
}
