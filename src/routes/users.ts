import { Router } from "express";
import { 
    createUserController, 
    deleteUserController, 
    findUserByIdController,
    findUsersController, 
    resetPasswordController, 
    updatePasswordController, 
    updateUserController 
} from "../controllers/users";

const router = Router();

router
    .post("/users", createUserController)
    .get("/users", findUsersController)
    .get("/users/:id", findUserByIdController)
    .put("/user/access-user", updateUserController)
    .put("/users/:id", updateUserController)
    .put("/users/resetpassword/:id", resetPasswordController)
    .put("/users/password/:id", updatePasswordController)
    .delete("/users/:id", deleteUserController)

export default router;