import axios from "axios";
import { envOr } from "./env";

const API_URL = envOr(".env-API_URL", (import.meta as any).env?.VITE_API_URL || "http://localhost:8080");
export const api = axios.create({ baseURL: API_URL, timeout: 20000 });

export function setBearer(token?: string) {
  if (token) api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  else delete api.defaults.headers.common["Authorization"];
}
