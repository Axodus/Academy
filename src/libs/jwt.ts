import jwt from "jsonwebtoken";
import { env } from "../config/env";

export function signLoginJwt(claims: {
  sub: string;
  net: "evm" | "solana";
  chainId?: number;
  kind: "evm" | "solana";
  aud?: string;
  kid?: string;
}) {
  const payload: any = { sub: claims.sub, net: claims.net, kind: claims.kind };
  if (claims.chainId !== undefined) payload.chainId = claims.chainId;
  if (claims.aud) payload.aud = claims.aud;
  if (claims.kid) payload.kid = claims.kid;
  return jwt.sign(payload, env.jwtSecret, { expiresIn: env.jwtTtlSeconds });
}
