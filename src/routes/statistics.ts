import { Router } from "express";
import { statistcsWeekController, statisticsMonthController } from "../controllers/statistics";

const router = Router();

router
    .get("/contracts/statistics/month", statisticsMonthController)
    .get("/contracts/statistics/week", statistcsWeekController)


export default router;