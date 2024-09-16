import { endOfMonth, endOfWeek, startOfMonth, startOfWeek } from "date-fns";
import  prisma  from "../../../prisma/prisma";
import { StatisticsProps } from "../../types";



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


    const statisticsMonth: StatisticsProps[] = [
        {
            name: "FATURAMENTO",
            total: total.toString(),
            percent: ticket
        },
        {
            name: "CONECTADO",
            total: `${connectedPercent.length}`,
            percent: parseFloat(connected)
        },
        {
            name: "PENDENTE",
            total: `${penddingPercent.length}`,
            percent: parseFloat(pendding)
        },
        {
            name: "CANCELADO",
            total: `${canceledPercent.length}`,
            percent: parseFloat(canceled)
        },
    ]

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

    const statisticsWeek: StatisticsProps[] = [
        {
            name: "FATURAMENTO",
            total: total.toString(),
            percent: ticket
        },
        {
            name: "CONECTADO",
            total: `${connectedPercent.length}`,
            percent: parseFloat(connected)
        },
        {
            name: "PENDENTE",
            total: `${penddingPercent.length}`,
            percent: parseFloat(pendding)
        },
        {
            name: "CANCELADO",
            total: `${canceledPercent.length}`,
            percent: parseFloat(canceled)
        },
    ]

    return statisticsWeek;
}