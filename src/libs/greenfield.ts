import { env } from "../config/env";

/**
 * Minimal wrapper to abstract Greenfield S3-compatible operations.
 * Replace internals with official Greenfield JS SDK or S3 client for GNFD gateway.
 */
export const gnfd = {
  bucket: ((env as any).gnfd?.bucket ?? (env as any).gnfdBucket ?? "gnfd"),

  async putObject(_key: string, _body: Buffer | Uint8Array, _contentType?: string) {
    throw new Error("putObject not implemented");
  },

  async headObject(_key: string) {
    throw new Error("headObject not implemented");
  },

  async getSignedUrl(key: string, method: "GET" | "PUT", ttlSec: number) {
    // placeholder URL; replace with real Greenfield signed URL generation
    return { url: `https://gnfd.local/${this.bucket}/${key}?method=${method}&ttl=${ttlSec}`, ttl: ttlSec };
  },

  uri(key: string) {
    return `gnfd://${this.bucket}/${key}`;
  },

  keyFromUri(uri: string) {
    const parts = uri.replace("gnfd://", "").split("/");
    const bucket = parts.shift();
    if (bucket !== this.bucket) throw new Error("bucket mismatch");
    return parts.join("/");
  }
};
