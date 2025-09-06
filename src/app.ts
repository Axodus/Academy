import Fastify from "fastify";
import pino from "pino";
import { env } from "./config/env";
import authRoutes from "./routes/auth";
import uploadRoutes from "./routes/upload";
import pointerRoutes from "./routes/pointers";
import signedUrlRoutes from "./routes/signedUrl";
import healthRoutes from "./routes/health";
import jwt from "@fastify/jwt";

export async function buildApp() {
  const app = Fastify({ logger: pino({ level: "info" }) });

  await app.register(jwt, { secret: env.jwtSecret });

  app.decorate("authenticate", async (req: any, rep: any) => {
    try { await req.jwtVerify(); } catch { return rep.code(401).send({ error: "unauthorized" }); }
  });

  await app.register(authRoutes);
  await app.register(uploadRoutes);
  await app.register(pointerRoutes);
  await app.register(signedUrlRoutes);
  await app.register(healthRoutes);

  return app;
}

declare module "fastify" {
  interface FastifyInstance {
    authenticate: any;
  }
}
