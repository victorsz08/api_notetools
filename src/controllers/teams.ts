import { Request, Response } from "express";
import { createTeam, deleteTeam, findTeamById, findTeams, updateTeams } from "../services/teams";
import { Errors } from "../Errors/custom-error";


export async function createTeamController(request: Request, response: Response){
    const data = request.body;

    try {
        const team = await createTeam(data);

        return response.status(201).send(team);
    } catch (error) {
        if(error instanceof Errors){
            return response.status(error.statusCode).send({ message: error.message });
        };

        return response.status(500).send({ error: `[ERROR_SERVER]: ${error}` });
    };
};

export async function findTeamsController(request:Request, response: Response){
    const { search } = request.query;

    try {
        const teams = await findTeams(search);

        return response.status(200).send(teams);
    } catch (error) {
        if(error instanceof Errors){
            return response.status(error.statusCode).send({ message: error.message });
        };

        return response.status(500).send({ error: `[ERROR_SERVER]: ${error}` });
    };
};

export async function findTeamByIdController(request: Request, response: Response){
    const { id } = request.params;

    try {
        const team = await findTeamById(id);

        return response.status(200).send(team);
    } catch (error) {
        if(error instanceof Errors){
            return response.status(error.statusCode).send({ message: error.message });
        };

        return response.status(500).send({ error: `[ERROR_SERVER]: ${error}` });
    };
};

export async function updateTeamController(request: Request, response: Response){
    const { id } = request.params;
    const data = request.body;

    try {
        const team = await updateTeams(id, data);

        return response.status(200).send(team);
    } catch (error) {
        if(error instanceof Errors){
            return response.status(error.statusCode).send({ message: error.message });
        };

        return response.status(500).send({ error: `[ERROR_SERVER]: ${error}` });
    };
};

export async function deleteTeamController(request: Request, response: Response){
    const { id } = request.params;

    try {
        await deleteTeam(id);

        return response.status(200).send({ message: "success" });
    } catch (error) {
        if(error instanceof Errors){
            return response.status(error.statusCode).send({ message: error.message });
        };

        return response.status(500).send({ error: `[ERROR_SERVER]: ${error}` });
    }
}