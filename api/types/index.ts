

export type QueryUserOptions = {
    id?: string;
    page?: string;
    perPage?: string;
    search?: string;
};

export type QueryContractsOptions = {
    status?: string;
    dateIn?: Date;
    dateOut?: Date;
    local?: string;
    userId?: string;
}

export type UserProps = {
    id: string;
    name: string;
    lastname: string;
    username: string;
    role: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
};

export type ContractProps = {
    id: string;
    number: number;
    local: string;
    phone: string;
    phoneSecondary?: string;
    installationDate: Date;
    installationHour: string;
    products: string[];
    price: number;
    status: string;
    user: UserProps;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
}

export type UpdatePassword = {
    currentPassword: string;
    newPassword: string;
}