import { Status } from "../../../node_modules/.prisma/client/index";
import { Errors } from "../../Errors/custom-error";
import prisma  from "../../../prisma/prisma";
import { ContractProps } from "../../types/index";
import { getUserById } from "../users/index";
import { TypeContract } from "@prisma/client";



export async function createContracts(id: string,data: ContractProps){
    const { 
        number, 
        local, 
        phone, 
        installationDate, 
        installationHour, 
        price, 
        type,
        products, 
        phoneSecondary } : ContractProps = data;

    const user = await prisma.user.findUnique({
        where: {
            id: id
        }
    });

    if(!user){
        throw new Errors("user not-found", 404);
    };

    const contract = await prisma.contract.create({
        data: {
            number,
            installationDate,
            installationHour,
            local,
            phone,
            price,
            type: type as TypeContract,
            phoneSecondary,
            products,
            user: {
                connect: {
                    id: user.id
                }
            }
        }
    });

    return contract;
};

export async function findAllContracts(query: any){
    const { dateIn, dateOut , status } = query;

    const contracts = await prisma.contract.findMany({
        where: {
            installationDate: {
                gte: dateIn,
                lte: dateOut
            },
            status: status as Status
        },
        include: {
            user: {
                omit: {
                    password: true
                }
            }
        }
    });

    if(contracts.length === 0){
        throw new Errors("contracts not found", 404);
    }

    return contracts;
}

export async function findContractsByUser(query: any){
    const { dateIn, dateOut, local, status, userId, type  } = query;

    if(!userId){
        throw new Errors("id user is required", 400);
    }

    const user = await getUserById(userId);

    const contracts = await prisma.contract.findMany({
        orderBy: [
            {
                installationDate: "desc"
            }
        ],
        where: {
            installationDate: {
                gte: dateIn,
                lte: dateOut
            },
            ...(local && {
                local: {
                    contains: local
                }
            }),
            ...(status && {
                status: {
                    equals: status as Status
                }
            }),
            ...(type && {
                type: {
                    equals: type as TypeContract
                }
            }),
            user: {
                id: user.id
            }
        }
    });

    if(contracts.length === 0){
        throw new Errors("no content", 204)
    };

    const statusOrder = ['PENDENTE', 'CONECTADO', 'CANCELADO']; // Ordem personalizada
    
    contracts.sort((a, b) => {
            return statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status);
    });

    return contracts;
};

export async function findContractById(id: string){
    const contract = await prisma.contract.findUnique({
        where: {
            id: id
        },
        include: {
            user: {
                omit: {
                    password: true
                }
            }
        }
    });

    if(!contract){
        throw new Errors("not-found", 404);
    };

    return contract;
};

export async function updateContract(id: string, data: ContractProps){
    const { 
        number, 
        local, 
        phone, 
        installationDate, 
        installationHour, 
        price, 
        products, 
        phoneSecondary,
        status,
        type
    } : ContractProps = data;

    const contract = await findContractById(id);

    await prisma.contract.update({
        where: {
            id: contract.id
        },
        data: {
            number, 
            local, 
            phone, 
            installationDate, 
            installationHour, 
            price, 
            products, 
            phoneSecondary,
            status: status as Status,
            type: type as TypeContract
        }
    });


    return contract;
};

export async function deleteContract(id: string){
    const contract = await findContractById(id);

    await prisma.contract.delete({
        where: {
            id: contract.id
        }
    });

    return
};
