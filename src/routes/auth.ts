import { FastifyInstance } from "fastify";
import { z } from "zod";
import { env } from "../config/env";
import { NonceStore } from "../services/nonceStore";
import { buildLoginMessage, verifyEvmSignature, verifySolanaSignature } from "../libs/signer";
import { signLoginJwt } from "../libs/jwt";

const NonceReq = z.object({
  network: z.enum(["evm","solana"]),
  address: z.string().optional(),
  pubkey: z.string().optional(),
  chainId: z.number().int().optional()
});

const VerifyEvmReq = z.object({
  network: z.literal("evm"),
  address: z.string(),
  chainId: z.number().int(),
  nonce: z.string(),
  signature: z.string()
});

const VerifySolReq = z.object({
  network: z.literal("solana"),
  pubkey: z.string(),
  nonce: z.string(),
  signature: z.string()
});

export default async function authRoutes(f: FastifyInstance) {
  f.post("/auth/nonce", async (req, rep) => {
    const body = NonceReq.parse(req.body);
    const now = Math.floor(Date.now()/1000);

    const nonce = crypto.randomUUID();
    const message = buildLoginMessage(nonce, now);

    const rec = NonceStore.put({
      nonce,
      network: body.network,
      hint: body.network === "evm" ? body.address : body.pubkey,
      expiresAt: now + env.nonceTtlSeconds,
      message
    });

    return rep.send({ nonce: rec.nonce, message: rec.message });
  });

  f.post("/auth/verify", async (req, rep) => {
    const asEvm = VerifyEvmReq.safeParse(req.body);
    const asSol = VerifySolReq.safeParse(req.body);

    if (!asEvm.success && !asSol.success) {
      return rep.code(400).send({ error: "bad_request" });
    }

    if (asEvm.success) {
      const { address, nonce, signature, chainId } = asEvm.data;
      const rec = NonceStore.get(nonce);
      if (!rec || rec.network !== "evm") return rep.code(401).send({ error: "nonce_invalid" });
      if (rec.expiresAt < Math.floor(Date.now()/1000)) {
        NonceStore.consume(nonce);
        return rep.code(401).send({ error: "nonce_expired" });
      }

      const ok = verifyEvmSignature({ address, signature, message: rec.message });
      if (!ok) return rep.code(401).send({ error: "signature_invalid" });

      NonceStore.consume(nonce);

      const jwt = signLoginJwt({ sub: address, net: "evm", kind: "evm", chainId, aud: "axodus-learn2win", kid: "auth-v1" });
      return rep.send({ jwt, user: { id: address, evm: address, sol: null } });
    }

    if (asSol.success) {
      const { pubkey, nonce, signature } = asSol.data;
      const rec = NonceStore.get(nonce);
      if (!rec || rec.network !== "solana") return rep.code(401).send({ error: "nonce_invalid" });
      if (rec.expiresAt < Math.floor(Date.now()/1000)) {
        NonceStore.consume(nonce);
        return rep.code(401).send({ error: "nonce_expired" });
      }

      const ok = verifySolanaSignature({ pubkey, signature, message: rec.message });
      if (!ok) return rep.code(401).send({ error: "signature_invalid" });

      NonceStore.consume(nonce);

      const jwt = signLoginJwt({ sub: pubkey, net: "solana", kind: "solana", aud: "axodus-learn2win", kid: "auth-v1" });
      return rep.send({ jwt, user: { id: pubkey, evm: null, sol: pubkey } });
    }
  });
}
