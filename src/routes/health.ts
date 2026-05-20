import { FastifyInstance } from "fastify";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

export default async function healthRoutes(f: FastifyInstance) {
  f.get("/healthz", async (_req, rep) => rep.send({ status: "ok", ts: Date.now() }));
  f.get("/readiness", async (_req, rep) => rep.send({
    status: "ready",
    service: "axodus-academy",
    mode: "integration-readiness",
    contractWritesEnabled: false,
    rewardExecutionEnabled: false,
    ts: Date.now()
  }));
  f.get("/openapi.json", async (_req, rep) => {
    const spec = await readFile(resolve(process.cwd(), "academy.openapi.json"), "utf8");
    rep.header("content-type", "application/json");
    return rep.send(spec);
  });
  f.get("/metrics", async (_req, rep) => {
    rep.header("content-type", "text/plain; version=0.0.4");
    return rep.send(`# HELP cms_up 1 if up
# TYPE cms_up gauge
cms_up 1
`);
  });
}
