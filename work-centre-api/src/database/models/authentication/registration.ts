interface UserSchema {
    _id?: any;
    local: UserSchemaLocal;
    facebook?: {
        id: string;
        token: string;
        name: string;
        email: string;
    },
    twitter?: {
        id: String,
        token: String,
        displayName: String,
        username: String
    },
    google?: {
        id: String,
        token: String,
        email: String,
        name: String
    }
}

interface UserSchemaLocal {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    salt: string;
    permalink: string;
    verificationToken: string;
    verified: boolean;
}