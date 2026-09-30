import { Router } from "express";
import { getScoreByRut } from "../controllers/score.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { authorizeRutAccess } from "../middlewares/rut-access.middleware";

export const scoreRouter = Router();

scoreRouter.get("/:rut", authenticate, authorizeRutAccess, getScoreByRut);
