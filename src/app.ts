import express from "express";
import { router } from "./routes";

export const app = express();

app.use(express.json());
app.use("/api", router);

app.use((_req, res) => {
  res.status(404).json({ error: "Not found" });
});
