

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
    page: string | number;
};

export type UserTeamProps = {
    userId: string;
    teamId: string;
}

export type QueryTeamsOptions = {
    search?: string;
}

export type QueryNotesOptions = {
    userId?: string;
}

export type UpdatePassword = {
    currentPassword: string;
    newPassword: string;
}

export type NoteProps = {
    id: string;
    text: string;
    user: UserProps;
    user_id: string;
    createdAt: Date;
    updatedAt: Date;
}

export type UserProps = {
    id: string;
    name: string;
    lastname: string;
    username: string;
    role: string;
    accessStatus: string;
    notes: NoteProps[];
    contracts: ContractProps[];
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
};

export type TeamsProps = {
    id: string;
    name: string;
    users?: UserProps[];
    owner?: OwnerTeamProps;
    createdAt: Date;
    updatedAt: Date;
}

export type OwnerTeamProps = {
    user: UserProps;
    user_id: string;
    team: TeamsProps;
    team_id: string;
}

