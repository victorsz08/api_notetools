import { addDays, endOfDay, endOfMonth, endOfWeek, startOfMonth, startOfWeek, subDays, subWeeks } from "date-fns";
import  prisma  from "../../../prisma/prisma";
import { SalesProps, StatisticsProps } from "../../types";



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
    const currentDate = endOfDay(new Date());
    const startOfCurrentWeek = startOfWeek(currentDate, { weekStartsOn: 0 });
    const startOfCustomWeek = subDays(startOfCurrentWeek, 1);
    const endOfCustomWeek = addDays(startOfCustomWeek, 6);

    const contracts = await prisma.contract.findMany({
        where: {
            AND: [
                { installationDate: { gte: startOfCustomWeek }},
                { installationDate: { lte: endOfCustomWeek }}
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
};


export async function salesWeek(query: any){
    const { userId } = query;
    const currentDate = endOfDay(new Date());
    
    // Semana Atual
    const startOfCurrentWeek = subDays(startOfWeek(currentDate, { weekStartsOn: 0 }), 1); // Sábado anterior ao domingo atual
    const endOfCurrentWeek = addDays(startOfCurrentWeek, 7); // Sexta-feira
    
    // Semana Passada
    const startOfPreviousWeek = subWeeks(startOfCurrentWeek, 1); // Sábado da semana anterior
    const endOfPreviousWeek = addDays(startOfPreviousWeek, 7); // Sexta-feira da semana anterior
    
    // Contratos da semana atual
    const currentWeekContracts = await prisma.contract.findMany({
        where: {
            user: {
                id: userId
            },
            createdAt: {
                gte: startOfCurrentWeek,
                lte: endOfCurrentWeek
            }
        }
    });
    
    // Contratos da semana passada
    const previousWeekContracts = await prisma.contract.findMany({
        where: {
            user: {
                id: userId
            },
            createdAt: {
                gte: startOfPreviousWeek,
                lte: endOfPreviousWeek
            }
        }
    });

    const previousWeekCount = previousWeekContracts.length;
    const currentWeekCount = currentWeekContracts.length;

// Verifica se o valor da semana passada é zero para evitar divisão por zero
    const comparative = previousWeekCount === 0 
        ? (currentWeekCount > 0 ? 100 : 0) // Se semana passada for 0 e a atual tiver vendas, 100% de crescimento
        : ((currentWeekCount - previousWeekCount) / previousWeekCount) * 100; // Fórmula de crescimento/queda

    const sales: SalesProps = {
        total: currentWeekCount,
        compareSales: parseFloat(comparative.toFixed(2)) // Limita a duas casas decimais
    };

    return sales;       
} 