import { Router } from "express";
import { 
    createContractController, 
    deleteContractController, 
    findAllContractsController, 
    findContractByIdController, 
    findContractsController, 
    updateContractController 
} from "../controllers/contracts";


const router = Router();

router
    .post("/contract/:id", createContractController)
    .get("/contracts", findContractsController)
    .get("/contracts/all", findAllContractsController)
    .get("/contracts/:id", findContractByIdController)
    .put("/contracts/:id", updateContractController)
    .delete("/contract/:id", deleteContractController)

export default router;