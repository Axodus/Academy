import { FastifyInstance } from "fastify";
import { z } from "zod";
import { gnfd } from "../libs/greenfield";
import { canAccess } from "../services/access";
import { env } from "../config/env";

export default async function signedUrlRoutes(f: FastifyInstance) {
  f.addHook("onRequest", (f as any).authenticate);

  const Req = z.object({
    uri: z.string().startsWith("gnfd://"),
    op: z.enum(["get","put"]).default("get")
  });

  f.post("/signed-url", { schema: { body: Req } }, async (req, rep) => {
    const { uri, op } = Req.parse(req.body);
    const wallet = (req as any).user.sub as string;

    const allowed = await canAccess(wallet, uri, op.toUpperCase() as "GET"|"PUT");
    if (!allowed) return rep.code(403).send({ error: "forbidden" });

    const key = gnfd.keyFromUri(uri);
    const { url, ttl } = await gnfd.getSignedUrl(key, op.toUpperCase()==="GET"?"GET":"PUT",  env.gnfd.signTtl);
    return rep.send({ url, ttl });
  });
}
