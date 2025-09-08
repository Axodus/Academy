import Fastify from "fastify";
import pino from "pino";
import jwt from "@fastify/jwt";
import { env } from "./config/env";
import authRoutes from "./routes/auth";

export async function buildApp() {
  const app = Fastify({ logger: pino({ level: "info" }) });

  await app.register(jwt, { secret: env.jwtSecret });
  app.decorate("authenticate", async (req: any, rep: any) => {
    try { await req.jwtVerify(); }
    catch { return rep.code(401).send({ error: "unauthorized" }); }
  });

  await app.register(authRoutes);

  return app;
}

declare module "fastify" {
  interface FastifyInstance { authenticate: any; }
}
