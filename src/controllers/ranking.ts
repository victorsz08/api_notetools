import { Request, Response } from "express";
import { findRanking, findStatisticsAll } from "../services/ranking";
import { Errors } from "../Errors/custom-error";



export async function findRankingController(request: Request, response: Response){
    const query = request.query;

    try {
        const ranking = await findRanking(query);

        return response.status(200).send(ranking);
    } catch (error) {
        if(error instanceof Errors){
            return response.status(error.statusCode).send({ message: error.message})
        }
        return response.status(500).send({ message: error })
    }
};


export async function findStatisticsController(request: Request, response: Response){
    const query = request.query;

    try {
        const statistics = await findStatisticsAll(query);

        return response.status(200).send(statistics);
    } catch (error) {
        if(error instanceof Errors){
            return response.status(error.statusCode).send({ message: error.message})
        }
        return response.status(500).send({ message: error })
    }
}