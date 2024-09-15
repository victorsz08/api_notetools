import { hash } from "bcryptjs";
import { Errors } from "../../Errors/custom-error";
import prisma  from "../../../prisma/prisma";
import { TeamsProps, QueryTeamsOptions, UserTeamProps, UserProps } from "../../types/index";
import { getUserById } from "../users/index";



export async function createTeam(data: TeamsProps){
    const { name } : TeamsProps = data;

    const team = await prisma.team.create({
        data: {
            name: name
        }
    });

    return team;
};

export async function findTeams(query: any){
    const { search } : QueryTeamsOptions = query;

    const teams = await prisma.team.findMany({
        where: {
            ...(search && {
                name: {
                    contains: search
                }
            })
        }
    });

    if(!teams){
        throw new Errors("teams not-found", 404);
    };

    return teams;
};

export async function findTeamById(id: string){
    const team = await prisma.team.findUnique({
        where: {
            id: id
        },
        include: {
            owner: true
        }
    });

    if(!team){
        throw new Errors("team not-found", 404);
    };

    return team;
}

export async function updateTeams(id: string, data: TeamsProps){
    const { name } : TeamsProps = data;

    const team = await findTeamById(id);

    await prisma.team.update({
        where: {
            id: team.id
        },
        data: {
            name
        }
    });

    return team;
};

export async function deleteTeam(id: string){
    const team = await findTeamById(id);

    await prisma.team.delete({
        where: {
            id: team.id
        }
    });

    return 
};

export async function addUserByTeam(userId: string, teamId: string){
    
    const user = await prisma.user.update({
        where: {
            id: userId
        },
        data: {
            team: {
                connect: {
                    id: teamId
                }
            }
        },
        include: {
            team: true
        }
    });

    if(!user){
        throw new Errors("user not-found", 404);
    };

    return user;
};


export async function createOwnerTeam(userId: string, teamId: string){
    const user = await getUserById(userId);
    const team = await findTeamById(teamId);

    const ownerTeam = await prisma.ownerTeam.create({
        data: {
            owner: {
                connect: {
                    id: user.id
                }
            },
            team: {
                connect: {
                    id: team.id
                }
            }
        },
        include: {
            owner: {
                omit: {
                    password: true
                }
            },
            team: {
                select: {
                    name: true,
                    users: {
                        omit: {
                            password: true
                        }
                    }
                }
            }
        }
    });

    return ownerTeam;
};


export async function createUserByTeam(id: string, data: UserProps){
    const { name, lastname, username, password }: UserProps = data;

    const usernameExists = await prisma.user.findUnique({
        where: {
            username: username
        }
    });

    if(usernameExists) {
        throw new Errors("conflict", 409);
    };

    const passHashed = await hash(password, 10);

    const team = await prisma.team.update({
        where: {
            id: id
        },
        data: {
            users: {
                create: {
                    name,
                    lastname,
                    username,
                    password: passHashed
                }
            }
        }
    });

    return;
};