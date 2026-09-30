import type { Request, Response } from "express";
import { users } from "../mocks/users.mock";

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

  res.json({
    sub: user.id,
    role: user.role,
    rut: user.role === "user" && user.rut ? user.rut : "none",
  });
}
