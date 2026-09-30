import { Router } from "express";
import { authRouter } from "./auth.routes";
import { scoreRouter } from "./score.routes";

export const router = Router();

router.use("/login", authRouter);
router.use("/score", scoreRouter);
