import { buildApp } from "./app";
import { env } from "./config/env";

buildApp().then(app => {
  app.listen({ port: env.port, host: "0.0.0.0" }).then(() => {
    app.log.info(`API up on :${env.port}`);
  }).catch(err => {
    app.log.error(err, "Failed to start");
    process.exit(1);
  });
});
