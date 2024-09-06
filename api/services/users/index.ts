import { prisma } from "../../prisma/prisma";
import { QueryUserOptions, UpdatePassword, UserProps } from "../../types";
import { Errors } from "../../Errors/custom-error";
import { compare, hash } from "bcryptjs";
import { Role } from "@prisma/client";



export async function createUser(data: UserProps) {
    const { name, lastname, username, password}: UserProps = data;

    const usernameExists = await prisma.user.findUnique({
        where: {
            username: username
        }
    });

    if(usernameExists) {
        throw new Errors("conflict", 409);
    };

    const passHashed = await hash(password, 10);

    const user = await prisma.user.create({
        data: {
            name: name,
            lastname: lastname,
            username: lastname,
            password: passHashed
        }
    });

    return user;
};

export async function getUsers(query: QueryUserOptions) {
    const { search } = query;

    const users = await prisma.user.findMany({
        where: {
            ...(search && {
                OR: [
                    { name: { contains: search } },
                    { lastname: { contains: search } },
                    { username: { contains: search } }
                ]
            })
        },
        omit: {
            password: true
        }
    });

    if(users.length){
        throw new Errors("no content", 204);
    };

    return users;
};


export async function getUserById(id: string){

    const user = await prisma.user.findUnique({
        where: {
            id: id
        }
    });

    if(!user){
        throw new Errors("not found", 404);
    };


    return user;
};


export async function updateUser(id: string, data: UserProps){
    const { name, lastname, username, role } : UserProps = data;

    const user = await prisma.user.update({
        where: {
            id: id
        },
        data: {
            name,
            lastname,
            username,
            role: role as Role
        }
    });

    return user;
};


export async function updatePassword(id: string, data: UpdatePassword){
    const { currentPassword, newPassword } : UpdatePassword = data;

    const user = await getUserById(id);

    const validatePass = await compare(currentPassword, user.password);

    if(!validatePass){
        throw new Errors("password incorrect", 400);
    };

    const passHashed = await hash(newPassword, 8);

    await prisma.user.update({
        where: {
            id: user.id
        },
        data: {
            password: passHashed
        }
    });

    return user;
};

export async function deleteUser(id: string){
    const user = await getUserById(id);

    await prisma.user.delete({
        where: {
            id: user.id
        }
    });

    return
}