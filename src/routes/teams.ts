import { Router } from "express";
import { addUserTeamController, createOwnerTeamController, createTeamController, createUserTeamController, deleteTeamController, findTeamByIdController, findTeamsController, updateTeamController } from "../controllers/teams";
import { updateTeams } from "../services/teams";

const router = Router();



router
    .post("/teams", createTeamController)
    .post("/team/owner", createOwnerTeamController)
    .post("/teams/user", createUserTeamController)
    .put("/teams", updateTeamController)
    .put("/teams/user/:id", addUserTeamController)
    .get("/teams", findTeamsController)
    .get("/teams/:id", findTeamByIdController)
    .delete("/teams/:id", deleteTeamController)

export default router;