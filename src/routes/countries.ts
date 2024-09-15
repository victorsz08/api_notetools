import { Router } from "express";
import { createManyCountriesController, findCountriesController } from "../controllers/countries";

const router = Router();


router.get("/countries", findCountriesController);


export default router;