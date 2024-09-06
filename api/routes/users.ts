import { Router } from "express";
import { 
    createUserController, 
    deleteUserController, 
    findUserByIdController,
    findUsersController, 
    updatePasswordController, 
    updateUserController 
} from "../controllers/users";

const router = Router();


router
    .post("users", createUserController)
    .get("users", findUsersController)
    .get("users/:id", findUserByIdController)
    .put("users/:id", updateUserController)
    .put("users/password/:id", updatePasswordController)
    .delete("users/:id", deleteUserController)

export default router;