import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: { port: 5173, host: true },
  test: {
    exclude: ["node_modules/**", "dist/**", "tests/e2e/**"],
    testTimeout: 20_000,
    hookTimeout: 20_000
  }
} as any);
