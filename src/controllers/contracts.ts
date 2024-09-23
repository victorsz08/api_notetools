import { Request, Response } from "express"
import { Errors } from "../Errors/custom-error";
import { createContracts, findContractsByUser, findContractById, updateContract, deleteContract, findAllContracts } from "../services/contracts/index";
import { ContractProps } from "../types/index";



export async function createContractController(request: Request, response: Response){
    const data: ContractProps = request.body;
    const { id } = request.params;

    try {
        const contract = await createContracts(id, data);

        return response.status(201).send(contract);
    } catch (error) {
        if(error instanceof Errors){
            return response.status(error.statusCode).send(error.message);
        };

        return response.status(500).send({ message: `[ERROR_SERVER]: ${error}`});
    };
};

export async function findAllContractsController(request: Request, response: Response){
    const query = request.query;

    try {
        const contracts = await findAllContracts(query);
        
        return response.status(200).send(contracts);
    } catch (error) {
        if(error instanceof Errors){
            return response.status(error.statusCode).send(error.message);
        };

        return response.status(500).send({ message: `[ERROR_SERVER]: ${error}`});
    }
}

export async function findContractsController(request: Request, response: Response){
    const query = request.query;

    try {
        const contracts = await findContractsByUser(query);

        return response.status(200).send(contracts);
    } catch (error) {
        if(error instanceof Errors){
            return response.status(error.statusCode).send(error.message);
        };

        return response.status(500).send({ message: `[ERROR_SERVER]: ${error}`});
    };
};

export async function findContractByIdController(request: Request, response: Response){
    const { id } = request.params;

    try {
        const contract = await findContractById(id);

        return response.status(200).send(contract);
    } catch (error) {
        if(error instanceof Errors){
            return response.status(error.statusCode).send(error.message);
        };

        return response.status(500).send({ message: `[ERROR_SERVER]: ${error}`});
    };
};

export async function updateContractController(request: Request, response: Response){
    const data: ContractProps = request.body;
    const { id } = request.params;

    try {
        const contract = await updateContract(id, data);

        return response.status(200).send(contract);
    } catch (error) {
        if(error instanceof Errors){
            return response.status(error.statusCode).send(error.message);
        };

        return response.status(500).send({ message: `[ERROR_SERVER]: ${error}`});
    };
};

export async function deleteContractController(request: Request, response: Response){
    const { id } = request.params;

    try {
        await deleteContract(id);

        return response.status(200).send({ message: "success" });
    } catch (error) {
        if(error instanceof Errors){
            return response.status(error.statusCode).send(error.message);
        };

        return response.status(500).send({ message: `[ERROR_SERVER]: ${error}`});
    }
}