import { Log } from "./logger";

export const AUTH_TOKEN = process.env.NEXT_PUBLIC_AUTH_TOKEN ?? "";

export const USE_MOCK_DATA = !AUTH_TOKEN;

export const AUTH_HEADER_NAME = "Authorization";

export function getAuthHeader(): string {
  if (!AUTH_TOKEN) {
    Log("frontend", "warn", "config", "No AUTH_TOKEN configured — requests may fail with 401");
    return "";
  }
  return `Bearer ${AUTH_TOKEN}`;
}

export const DEFAULT_LIMIT = 100;

export const DEFAULT_PAGE = 1;

Log("frontend", "info", "config", `App config loaded — USE_MOCK_DATA=${USE_MOCK_DATA}, hasAuthToken=${!!AUTH_TOKEN}`);
