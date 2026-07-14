import { Router } from "express";
import healthRouter from "./health.js";
import leadsRouter from "./leads.js";

const router = Router();

router.use(healthRouter);
router.use(leadsRouter);

export default router;
