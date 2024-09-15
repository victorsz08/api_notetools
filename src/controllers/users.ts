import { Response, Request } from "express";
import { UpdatePassword, UserProps } from "../types/index";
import { Errors } from "../Errors/custom-error";
import { createUser, deleteUser, getUserById, getUsers, resetPassword, updateAccessUser, updatePassword, updateUser } from "../services/users/index";



export async function createUserController(request: Request, response: Response){
    const data: UserProps = request.body;

    try {
        const user = await createUser(data);

        return response.status(201).send(user);
    } catch (error) {
        if(error instanceof Errors){
            return response.status(error.statusCode).send({ message: error.message });
        };

        return response.status(500).send({ message: `[ERROR_SERVER]: ${error}` });
    }
};

export async function findUsersController(request: Request, response: Response){
    const query = request.query;

    try {
        const users = await getUsers(query);

        return response.status(200).send(users);
    } catch (error) {
        if(error instanceof Errors){
            return response.status(error.statusCode).send({ message: error.message });
        };

        return response.status(500).send({ message: `[ERROR_SERVER]: ${error}` });
    };
};

export async function findUserByIdController(request: Request, response: Response){
    const { id } = request.params;

    try {
        const user = await getUserById(id);

        return response.status(200).send(user);
    } catch (error) {
        if(error instanceof Errors){
            return response.status(error.statusCode).send({ message: error.message });
        };

        return response.status(500).send({ message: `[ERROR_SERVER]: ${error}` });
    };
};

export async function updateUserController(request: Request, response: Response){
    const data: UserProps = request.body;
    const { id } = request.params;

    try {
        const user = await updateUser(id, data);

        return response.status(200).send(user);
    } catch (error) {
        if(error instanceof Errors){
            return response.status(error.statusCode).send({ message: error.message });
        };

        return response.status(500).send({ message: `[ERROR_SERVER]: ${error}` });
    };
};


export async function updatePasswordController(request: Request, response: Response){
    const { id } = request.params;
    const data: UpdatePassword = request.body;

    try {
        await updatePassword(id, data);

        return response.status(200).send({ message: "updated password success" });
    } catch (error) {
        if(error instanceof Errors){
            return response.status(error.statusCode).send({ message: error.message });
        };

        return response.status(500).send({ message: `[ERROR_SERVER]: ${error}` });
    }
};


export async function deleteUserController(request: Request, response: Response){
    const { id } = request.params;

    try {
        await deleteUser(id);

        return response.status(200).send({ message: "success" });
    } catch (error) {
        if(error instanceof Errors){
            return response.status(error.statusCode).send({ message: error.message });
        };

        return response.status(500).send({ message: `[ERROR_SERVER]: ${error}` });
    }
};

export async function updateAccessUserController(request: Request, response: Response){
    const query = request.query;
    const data = request.body;

    try {
        await updateAccessUser(query, data);

        return response.status(200).send({ message: "access user"});
    } catch (error) {
        if(error instanceof Errors){
            return response.status(error.statusCode).send({ message: error.message });
        };

        return response.status(500).send({ message: `[ERROR_SERVER]: ${error}` });
    }
}

export async function resetPasswordController(request: Request, response: Response){
    const { userId } = request.params;
    
    try {
        const password = await resetPassword(userId);

        return response.status(200).send({ new_password: password });
    } catch (error) {
        if(error instanceof Errors){
            return response.status(error.statusCode).send({ message: error.message });
        };

        return response.status(500).send({ message: `[ERROR_SERVER]: ${error}` });
    }
}