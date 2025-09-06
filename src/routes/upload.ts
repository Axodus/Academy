import { FastifyInstance } from "fastify";
import { z } from "zod";
import { gnfd } from "../libs/greenfield";

export default async function uploadRoutes(f: FastifyInstance) {
  f.addHook("onRequest", (f as any).authenticate);

  const Req = z.object({
    key: z.string().min(3),
    size: z.number().int().positive(),
    contentType: z.string().optional()
  });

  f.post("/upload", { schema: { body: Req } }, async (req, rep) => {
    const { key, size, contentType } = Req.parse(req.body);
    const { url, ttl } = await gnfd.getSignedUrl(key, "PUT", 900);
    return rep.send({ putUrl: url, ttl, uri: gnfd.uri(key), expectedSize: size, contentType });
  });

  const CommitReq = z.object({
    uri: z.string().startsWith("gnfd://"),
    sha256: z.string().regex(/^0x[0-9a-fA-F]{64}$/).optional(),
  });

  f.post("/upload/commit", { schema: { body: CommitReq } }, async (req, rep) => {
    const { uri, sha256 } = CommitReq.parse(req.body);
    const key = gnfd.keyFromUri(uri);
    const head = await gnfd.headObject(key).catch(() => ({} as any));
    const size = Number((head as any)?.ContentLength ?? 0);
    const result = { uri, sha256: sha256 ?? "0x", size };
    return rep.send(result);
  });
}
