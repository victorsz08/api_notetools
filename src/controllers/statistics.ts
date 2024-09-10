import { Request, Response } from "express";
import { statisticsMonth, statisticsWeek } from "../services/statistcs";
import { Errors } from "../Errors/custom-error";



export async function statisticsMonthController(request: Request, response: Response){
    const query = request.query;

    try {
        const statisticsOfMonth = await statisticsMonth(query);

        return response.status(200).send(statisticsOfMonth);
    } catch (error) {
        if(error instanceof Errors){
            return response.status(error.statusCode).send({ message: error.message })
        };
        return response.status(500).send({ message: `[ERROR_SERVER]: ${error}`});
    };
};

export async function statistcsWeekController(request: Request, response: Response){
    const query = request.query;

    try {
        const statisticsOfWeek = await statisticsWeek(query);

        return response.status(200).send(statisticsOfWeek);
    } catch (error) {
        if(error instanceof Errors){
            return response.status(error.statusCode).send({ message: error.message })
        };
        return response.status(500).send({ message: `[ERROR_SERVER]: ${error}`});
    };
};