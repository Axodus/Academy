export function envOr(key: string, fallback?: string) {
  // @ts-expect-error index access
  const v = import.meta.env?.[key] ?? import.meta.env?.[key.replace(".env-", "VITE_")];
  return (v ?? fallback) as string | undefined;
}
