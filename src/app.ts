import express from "express";
import swaggerUi from "swagger-ui-express";
import { openApiSpec } from "./docs/openapi";
import { router } from "./routes";

export const app = express();

app.use(express.json());
app.use("/api", router);

app.get("/docs.json", (_req, res) => {
  res.json(openApiSpec);
});
app.use("/docs", swaggerUi.serve, swaggerUi.setup(openApiSpec));

app.use((_req, res) => {
  res.status(404).json({ error: "Not found" });
});
