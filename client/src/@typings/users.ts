enum NewUserField {
    firstName = 'firstName',
    lastName = 'lastName',
    email = 'email',
    password = 'password',
    username = 'username',
}

interface FavoriteListing {
    listingId: string;
    date: Date;
}

interface NewUser {
    [NewUserField: string]: string;
}

interface CompleteUser {
    id: string;
    refreshToken: string;
    countryCode: string;
    phone:string;
    extension:string;
    role:string;
    createdAt:string;
    updatedAt:string;
    favorites: FavoriteListing[];
    [NewUserField: string]: string | FavoriteListing[];
}

export {NewUserField};
export type { NewUser, CompleteUser };
