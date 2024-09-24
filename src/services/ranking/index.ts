
import prisma from "../../../prisma/prisma";
import { Errors } from "../../Errors/custom-error";


export async function findRanking(query: any){
    const { dateIn, dateOut } = query;

    const users = await prisma.user.findMany({
        where: {
            contracts: {
                some: {
                   AND: [
                    { installationDate: { gte: dateIn } },
                    { installationDate: { lte: dateOut }}
                   ]
                }
            }
        },
        include: {
            contracts: true
        },
        orderBy: {
            contracts: {
                _count: "desc"
            }
        }
    });

    if(users.length === 0){
        throw new Errors("ranking not found", 404);
    };

    const ranking = users.map((user) => {
        const contractsInDateRange = user.contracts.filter(item => 
            item.installationDate >= new Date(dateIn) && item.installationDate <= new Date(dateOut)
        );
        
        const connected = contractsInDateRange.filter(item => item.status === "CONECTADO");

        const billing = connected.reduce((acc, contract) => acc + contract.price, 0);

        const percent = contractsInDateRange.length > 0 
            ? (connected.length / contractsInDateRange.length) * 100 
            : 0;

        return {
            id: user.id,
            name: user.name,
            lastname: user.lastname,
            contracts: contractsInDateRange.length, // Apenas contratos no intervalo
            billing: parseFloat(billing.toFixed(2)), // Somente contratos conectados
            connectedPercentage: parseInt(percent.toFixed(0)) // Percentual de conectados
        };
    });

    return ranking;
};

export async function findStatisticsAll(query: any){
    const { dateIn, dateOut } = query;

    const contracts = await prisma.contract.findMany({
        where: {
            createdAt: { gte: dateIn, lte: dateOut }
        }
    });

    if(contracts.length === 0){
        throw new Errors("statistics not found", 404);
    };

    const connected = contracts.filter(item => item.status === "CONECTADO");
    const pending = contracts.filter(item => item.status === "PENDENTE");
    const canceled = contracts.filter(item => item.status === "CANCELADO");
    let billing = 0;

    for(let i= 0; i < contracts.length; i++){
        billing = contracts[i].price + billing;
    }

    
    const statistics = {
        count_connected: connected.length,
        count_pending: pending.length,
        count_canceled: canceled.length,
        percent_connected: ((connected.length / contracts.length) * 100),
        percent_pending: ((pending.length / contracts.length) * 100),
        percent_canceled: ((canceled.length / contracts.length) * 100),
        billing: parseFloat(billing.toFixed(2))
    };

    return statistics;
}