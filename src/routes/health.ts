import { FastifyInstance } from "fastify";

export default async function healthRoutes(f: FastifyInstance) {
  f.get("/healthz", async (_req, rep) => rep.send({ status: "ok", ts: Date.now() }));
  f.get("/metrics", async (_req, rep) => {
    rep.header("content-type", "text/plain; version=0.0.4");
    return rep.send(`# HELP cms_up 1 if up
# TYPE cms_up gauge
cms_up 1
`);
  });
}
