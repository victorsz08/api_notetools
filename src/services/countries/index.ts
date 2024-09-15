import  prisma from "../../../prisma/prisma";
import { Errors } from "../../Errors/custom-error";


function removeAccents(str: string) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

export async function createManyCountries() {
    const countriesApi = await fetch("https://servicodados.ibge.gov.br/api/v1/localidades/municipios?view=nivelado")
        .then(res => res.json());

    const countriesData = countriesApi.map((country: any) => ({
        id: country["municipio-id"],
        country: country["municipio-nome"],
        uf: country["UF-sigla"]
    }));

    // Inserir todos os países de uma vez usando createMany
    const createdCountries = await prisma.countries.createMany({
        data: countriesData,
        skipDuplicates: true // Ignora entradas duplicadas, se já existirem no banco de dados
    });

    return createdCountries;
};



export async function findCountries(){
    const countries = await prisma.countries.findMany({});

    if(countries.length === 0){
        throw new Errors("countries not-found", 404);
    };

    return countries;
}