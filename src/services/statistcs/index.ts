import { endOfMonth, endOfWeek, startOfMonth, startOfWeek } from "date-fns";
import { prisma } from "../../../prisma/prisma";



export async function statisticsMonth(query: any){
    const { userId } = query;
    const date = new Date();
    const dateIn = startOfMonth(date);
    const dateOut = endOfMonth(date);

    const contracts = await prisma.contract.findMany({
        where: {
            AND: [
                { installationDate: { gte: dateIn }},
                { installationDate: { lte: dateOut }}
            ],
            user: {
                id: userId
            }
        },
        orderBy: {
            installationDate: 'desc'
        }
    });

    const connectedPercent = contracts.filter(item => item.status === "CONECTADO");
    const penddingPercent = contracts.filter(item => item.status === "PENDENTE");
    const canceledPercent = contracts.filter(item => item.status === "CANCELADO");
    
    let total = contracts.length;
    let ticket = 0;
    let connected = ((connectedPercent.length / contracts.length) * 100).toFixed(0);
    let pendding = ((penddingPercent.length / contracts.length) * 100).toFixed(0);
    let canceled = ((canceledPercent.length / contracts.length) * 100).toFixed(0);

    for(let i = 0; i < connectedPercent.length; i++){
        ticket = (connectedPercent[i].price + ticket)
    };


    const statisticsMonth = {
        total: total,
        ticket: ticket.toFixed(2),
        connected: connected,
        pendding: pendding,
        canceled: canceled
    };

    return statisticsMonth;
};


export async function statisticsWeek(query: any){
    const { userId } = query;
    const date = new Date();
    const dateIn = startOfWeek(date);
    const dateOut = endOfWeek(date);

    const contracts = await prisma.contract.findMany({
        where: {
            AND: [
                { installationDate: { gte: dateIn }},
                { installationDate: { lte: dateOut }}
            ],
            user: {
                id: userId
            }
        },
        orderBy: {
            installationDate: 'desc'
        }
    });

    const connectedPercent = contracts.filter(item => item.status === "CONECTADO");
    const penddingPercent = contracts.filter(item => item.status === "PENDENTE");
    const canceledPercent = contracts.filter(item => item.status === "CANCELADO");
    
    let total = contracts.length;
    let ticket = 0;
    let connected = ((connectedPercent.length / contracts.length) * 100).toFixed(0);
    let pendding = ((penddingPercent.length / contracts.length) * 100).toFixed(0);
    let canceled = ((canceledPercent.length / contracts.length) * 100).toFixed(0);

    for(let i = 0; i < connectedPercent.length; i++){
        ticket = connectedPercent[i].price + ticket
    };

    const statisticsWeek = {
        total: total,
        ticket: ticket.toFixed(2),
        connected: connected,
        pendding: pendding,
        canceled: canceled
    };

    return statisticsWeek;
}