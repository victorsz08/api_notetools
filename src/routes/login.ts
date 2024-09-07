import { Router } from "express";
import { authController } from "../controllers/login";


const router = Router();

router.post("/auth/login", authController);

export default router;