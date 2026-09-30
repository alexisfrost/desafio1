import type { Request, Response } from "express";
import { env } from "../config/env";
import { users } from "../mocks/users.mock";
import { signToken } from "../utils/jwt";

export function login(req: Request, res: Response) {
  const { username, password } = req.body ?? {};

  if (typeof username !== "string" || typeof password !== "string") {
    res.status(400).json({ error: "username and password are required" });
    return;
  }

  const user = users.find((u) => u.username === username && u.password === password);

  if (!user) {
    res.status(401).json({ error: "Invalid credentials" });
    return;
  }

  const token = signToken({
    sub: user.id,
    role: user.role,
    rut: user.role === "user" && user.rut ? user.rut : "none",
  });

  res.json({ token, tokenType: "Bearer", expiresIn: env.jwtExpiresIn });
}
