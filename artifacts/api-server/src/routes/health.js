import { Router } from "express";
import { mongoose } from "@workspace/db";
import { HealthCheckResponse } from "@workspace/api-zod";

const router = Router();

router.get("/healthz", (_req, res) => {
  const dbConnected = mongoose.connection.readyState === 1;
  const data = HealthCheckResponse.parse({
    status: dbConnected ? "ok" : "degraded",
  });
  res.json(data);
});

export default router;
