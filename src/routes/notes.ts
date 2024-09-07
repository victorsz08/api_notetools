import { Router } from "express";
import { createNotesController, findNotesController } from "../controllers/notes" ;

const router = Router();

router
    .post("/notes", createNotesController)
    .get("/notes", findNotesController)

export default router;