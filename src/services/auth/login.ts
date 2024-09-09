import { compare } from "bcryptjs";
import { Errors } from "../../Errors/custom-error";
import { prisma } from "../../../prisma/prisma";



export async function authLogin(username: string, password: string) {
    if(!username || !password){
        throw new Errors("credentials invalid", 400);
    };

    const user = await prisma.user.findUnique({
        where: {
            username: username
        }
    });

    if(!user){
        throw new Errors("username or password incorrect", 400);
    };

    const passChecked = await compare(password, user.password);

    if(!passChecked){
        throw new Errors("username or password incorrect", 400);
    };

    return user;
}