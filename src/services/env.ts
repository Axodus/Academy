export function envOr(key: string, fallback?: string) {
  // @ts-expect-error index access
  const e = import.meta.env?.[key] ?? import.meta.env?.[key.replace(".env-","VITE_")];
  return (e ?? fallback) as string | undefined;
}
