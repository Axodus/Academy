import { FastifyInstance } from "fastify";
import { z } from "zod";
import { newNonce, loginTypedData, verifyLoginSignature } from "../libs/signer";
import { NonceStore } from "../services/nonceStore";
import { env } from "../config/env";
import { signJwt } from "../libs/jwt";

export default async function authRoutes(f: FastifyInstance) {
  const WalletSchema = z.object({ wallet: z.string().regex(/^0x[a-fA-F0-9]{40}$/) });

  f.post("/auth/nonce", { schema: { body: WalletSchema } }, async (req, rep) => {
    const { wallet } = WalletSchema.parse(req.body);
    const nonce = newNonce();
    const ttl = Math.floor(Date.now()/1000) + 300; // 5 min
    await NonceStore.put(wallet, nonce, ttl);
    const typedData = loginTypedData(wallet, nonce, ttl);
    return rep.send({ wallet, nonce, typedData });
  });

  const VerifySchema = z.object({
    wallet: z.string().regex(/^0x[a-fA-F0-9]{40}$/),
    signature: z.string().regex(/^0x[0-9a-fA-F]+$/)
  });

  f.post("/auth/verify", { schema: { body: VerifySchema } }, async (req, rep) => {
    const { wallet, signature } = VerifySchema.parse(req.body);
    const rec = await NonceStore.get(wallet);
    if (!rec) return rep.code(401).send({ error: "unauthorized", reason: "missing_nonce" });
    const { ok, reason } = await verifyLoginSignature(wallet, signature as `0x${string}`, rec.nonce);
    if (!ok) return rep.code(401).send({ error: "unauthorized", reason });
    await NonceStore.consume(wallet);
    const token = signJwt({ sub: wallet, typ: "access" });
    const expiresIn = typeof env.jwtTtl === "string" ? 600 : Number(env.jwtTtl);
    return rep.send({ token, expiresIn });
  });
}
