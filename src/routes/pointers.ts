import { FastifyInstance } from "fastify";
import { z } from "zod";
import { contracts } from "../libs/harmony";

export default async function pointerRoutes(f: FastifyInstance) {
  f.addHook("onRequest", (f as any).authenticate);

  const SetReq = z.object({
    sha256: z.string().regex(/^0x[0-9a-fA-F]{64}$/),
    uri: z.string().startsWith("gnfd://")
  });

  f.post("/pointers", { schema: { body: SetReq } }, async (req, rep) => {
    const { sha256, uri } = SetReq.parse(req.body);
    const tx = await contracts.pointer.setPointer(sha256, uri);
    await tx.wait();
    const txHash = tx.hash;
    return rep.send({ txHash, pointerId: `${sha256}:${uri}` });
  });

  f.get("/pointers/:wallet", async (req, rep) => {
    const wallet = (req.params as any).wallet;
    const [hash, uri, timestamp] = await contracts.pointer.getPointer(wallet);
    return rep.send({ wallet, sha256: hash, uri, timestamp: Number(timestamp) });
  });
}
