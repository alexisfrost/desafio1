import type { CorsOptions } from "cors";
import { env } from "./env";

const LOCALHOST_HOSTNAMES = new Set(["localhost", "127.0.0.1", "[::1]"]);

// Any http(s) origin on localhost, on any port.
function isLocalhostOrigin(origin: string): boolean {
  try {
    const { protocol, hostname } = new URL(origin);
    return (protocol === "http:" || protocol === "https:") && LOCALHOST_HOSTNAMES.has(hostname);
  } catch {
    return false;
  }
}

export const corsOptions: CorsOptions = {
  origin(origin, callback) {
    // Requests without an Origin header (curl, Postman, same-origin) are not subject to CORS.
    if (!origin || isLocalhostOrigin(origin) || env.corsOrigins.includes(origin)) {
      callback(null, true);
      return;
    }
    callback(null, false);
  },
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
