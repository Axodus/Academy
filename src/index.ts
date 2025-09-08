import { buildApp } from "./app";
import { env } from "./config/env";

async function main() {
  const app = await buildApp();

  const onShutdown = async (signal: string) => {
    app.log.info({ signal }, "Shutting down...");
    try {
      await app.close();
      process.exit(0);
    } catch (err) {
      app.log.error({ err }, "Error during shutdown");
      process.exit(1);
    }
  };

  process.on("SIGINT", () => onShutdown("SIGINT"));
  process.on("SIGTERM", () => onShutdown("SIGTERM"));

  try {
    await app.listen({ host: "0.0.0.0", port: env.port });
    app.log.info({ port: env.port }, "API listening");
  } catch (err) {
    app.log.error({ err }, "Failed to start server");
    process.exit(1);
  }
}

main();
