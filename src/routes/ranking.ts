import { Router } from "express";
import { findRankingController, findStatisticsController } from "../controllers/ranking";


const router = Router();

router
    .get("/ranking", findRankingController)
    .get("/ranking/statistics", findStatisticsController)

export default router;