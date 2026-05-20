import Fastify from "fastify";
import jwt from "@fastify/jwt";
import { env } from "./config/env";
import academyRoutes from "./routes/academy";
import authRoutes from "./routes/auth";
import healthRoutes from "./routes/health";

export async function buildApp() {
  const app = Fastify({ logger: { level: "info" } });

  await app.register(jwt, { secret: env.jwtSecret });
  app.decorate("authenticate", async (req: any, rep: any) => {
    try { await req.jwtVerify(); }
    catch { return rep.code(401).send({ error: "unauthorized" }); }
  });

  await app.register(healthRoutes);
  await app.register(authRoutes);
  await app.register(academyRoutes);

  return app;
}

declare module "fastify" {
  interface FastifyInstance { authenticate: any; }
}
