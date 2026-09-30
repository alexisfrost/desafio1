import jwt from "jsonwebtoken";
import { env } from "../config/env";
import type { AuthPayload } from "../types/auth";

const ALGORITHM = "HS256";

export function signToken(payload: AuthPayload): string {
  const { sub, ...claims } = payload;
  return jwt.sign(claims, env.jwtSecret, {
    algorithm: ALGORITHM,
    subject: sub,
    expiresIn: env.jwtExpiresIn,
  });
}

// Throws TokenExpiredError / JsonWebTokenError when the signature or expiration is invalid.
export function verifyToken(token: string): AuthPayload {
  const decoded = jwt.verify(token, env.jwtSecret, { algorithms: [ALGORITHM] });

  if (typeof decoded === "string" || !decoded.sub || !decoded.role || !decoded.rut) {
    throw new jwt.JsonWebTokenError("Malformed token payload");
  }

  return { sub: decoded.sub, role: decoded.role, rut: decoded.rut };
}
