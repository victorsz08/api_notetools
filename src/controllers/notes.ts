import { Response, Request } from "express";
import { Errors } from "../Errors/custom-error";
import { createOrUpdateNotes, findNotes } from "../services/notes/index";
import { QueryNotesOptions, NoteProps } from "../types/index";



export async function createNotesController(request: Request, response: Response){
    const query: QueryNotesOptions = request.query;
    const data: NoteProps = request.body;

    try {
        const notes = await createOrUpdateNotes(query, data);

        return response.status(200).send(notes);
    } catch (error) {
        if(error instanceof Errors){
            return response.status(error.statusCode).send(error.message);
        };

        return response.status(500).send({ message: `[ERROR_SERVER]: ${error}`})
    }
};

export async function findNotesController(request: Request, response: Response){
    const query: QueryNotesOptions = request.query;

    try {
        const notes = await findNotes(query);

        return response.status(200).send(notes);
    } catch (error) {
        if(error instanceof Errors){
            return response.status(error.statusCode).send(error.message);
        };

        return response.status(500).send({ message: `[ERROR_SERVER]: ${error}`})
    }
}