import { verifyMessage, getAddress } from "ethers";
import nacl from "tweetnacl";
import bs58 from "bs58";

export function buildLoginMessage(nonce: string, ts: number) {
  return `Sign this message to login: ${nonce} @ ${ts}`;
}

export function verifyEvmSignature(params: { address: string; signature: string; message: string }) {
  const rec = verifyMessage(params.message, params.signature);
  return getAddress(rec) === getAddress(params.address);
}

export function verifySolanaSignature(params: { pubkey: string; signature: string; message: string }) {
  const pk = bs58.decode(params.pubkey);
  const sig = Buffer.from(params.signature, "base64");
  const msg = new TextEncoder().encode(params.message);
  return nacl.sign.detached.verify(msg, sig, pk);
}
