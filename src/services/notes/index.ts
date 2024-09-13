import { Errors } from "../../Errors/custom-error";
import { prisma } from "../../../prisma/prisma";
import { NoteProps, QueryNotesOptions } from "../../types/index";



export async function createNotes(query: QueryNotesOptions, data: NoteProps){
    const { userId } : QueryNotesOptions = query;
    const { text } : NoteProps = data;


    const notes = await prisma.notes.create({
        data: {
            text: text,
            user: {
                connect: {
                    id: userId
                }
            }
        }
   });

   return notes;
};


export async function findNotes(query: QueryNotesOptions){
    const { userId } = query;

    const notes = await prisma.notes.findFirst({
        where: {
            user: {
                id: userId
            }
        }
    })

    if(!notes){
        throw new Errors("notes not-found", 404);
    };

    return notes;
}