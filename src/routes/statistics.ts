import { Router } from "express";
import { salesWeekController, statistcsWeekController, statisticsMonthController } from "../controllers/statistics";

const router = Router();

router
    .get("/contracts/statistics/month", statisticsMonthController)
    .get("/contracts/statistics/week", statistcsWeekController)
    .get("/contracts/sales", salesWeekController)


export default router;