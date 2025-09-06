import { createHash } from "crypto";

export function sha256Hex(buf: Buffer | Uint8Array) {
  const h = createHash("sha256").update(buf).digest("hex");
  return `0x${h}` as const;
}
