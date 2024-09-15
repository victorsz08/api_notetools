import { Request, Response } from "express";
import { createManyCountries, findCountries } from "../services/countries/index";
import { Errors } from "../Errors/custom-error";



export async function createManyCountriesController(request: Request, response: Response){

    try {
        const countries = await createManyCountries();

        return response.status(201).send(countries);
    } catch (error) {
        return response.status(500).send({ message: error});
    }
};


export async function findCountriesController(request: Request, response: Response){
    try {
        const countries = await findCountries();

        return response.status(200).send(countries);
    } catch (error) {
        if(error instanceof Errors){
            return response.status(error.statusCode).send({ message: error.message });
        }
        return response.status(500).send({ message: `[ERROR_SERVER]: ${error}` });
    }
}