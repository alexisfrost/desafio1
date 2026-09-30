import type { NextFunction, Request, Response } from "express";
import { TokenExpiredError } from "jsonwebtoken";
import { verifyToken } from "../utils/jwt";

export function authenticate(req: Request, res: Response, next: NextFunction) {
  const [scheme, token] = req.headers.authorization?.split(" ") ?? [];

  if (scheme !== "Bearer" || !token) {
    res.status(401).json({ error: "Missing or malformed Authorization header" });
    return;
  }

  try {
    req.user = verifyToken(token);
    next();
  } catch (err) {
    const error = err instanceof TokenExpiredError ? "Token expired" : "Invalid token";
    res.status(401).json({ error });
  }
}
