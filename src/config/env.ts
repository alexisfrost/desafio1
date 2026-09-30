import type { SignOptions } from "jsonwebtoken";

const jwtSecret = process.env.JWT_SECRET;

if (!jwtSecret) {
  throw new Error("JWT_SECRET is not set. Copy .env.example to .env and define it.");
}

export const env = {
  port: Number(process.env.PORT) || 3000,
  jwtSecret,
  jwtExpiresIn: (process.env.JWT_EXPIRES_IN || "1h") as NonNullable<SignOptions["expiresIn"]>,
  // Extra allowed origins on top of localhost, e.g. "https://app.example.com,https://admin.example.com".
  corsOrigins: (process.env.CORS_ORIGINS ?? "")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean),
};
