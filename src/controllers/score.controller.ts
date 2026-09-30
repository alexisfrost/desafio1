import type { Request, Response } from "express";
import { scores } from "../mocks/scores.mock";
import { normalizeRut } from "../utils/rut";

export function getScoreByRut(req: Request<{ rut: string }>, res: Response) {
  const rut = normalizeRut(req.params.rut);
  const entry = scores.find((s) => normalizeRut(s.rut) === rut);

  if (!entry) {
    res.status(404).json({ error: "Score not found for the given rut" });
    return;
  }

  res.json({ rut: entry.rut, score: entry.score, fecha: entry.fecha });
}
