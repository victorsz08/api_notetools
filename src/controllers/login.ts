import { Request, Response } from "express";
import { authLogin } from "../services/auth/login";
import { Errors } from "../Errors/custom-error";


export async function authController(request: Request, response: Response){
    const { username, password } = request.body;

    try {
        const user = await authLogin(username, password);

        return response.status(200).send(user);
    } catch (error) {
        if(error instanceof Errors){
            return response.status(error.statusCode).send({ message: error.message });
        };

        return response.status(500).send({ error: `[ERROR_SERVER]:${error}`})
    };
};