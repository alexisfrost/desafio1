import { Router } from "express";
import { getScoreByRut } from "../controllers/score.controller";

export const scoreRouter = Router();

scoreRouter.get("/:rut", getScoreByRut);
