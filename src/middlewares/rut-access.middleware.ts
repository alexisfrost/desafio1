import type { NextFunction, Request, Response } from "express";
import { normalizeRut } from "../utils/rut";

// Must run after `authenticate`. Admins can access any rut; users only their own.
export function authorizeRutAccess(req: Request<{ rut: string }>, res: Response, next: NextFunction) {
  const user = req.user;

  if (!user) {
    res.status(401).json({ error: "Not authenticated" });
    return;
  }

  if (user.role === "admin" || normalizeRut(user.rut) === normalizeRut(req.params.rut)) {
    next();
    return;
  }

  res.status(403).json({ error: "You can only access your own rut" });
}
