export function envOr(key: string, fallback?: string) {
  const viteEnv = import.meta.env as Record<string, string | undefined>;
  const v = viteEnv[key] ?? viteEnv[key.replace(".env-", "VITE_")];
  return (v ?? fallback) as string | undefined;
}
