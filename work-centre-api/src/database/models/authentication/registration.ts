interface UserSchema {
    local: {
        email: string;
        password: string;
        name: string;
        surname: string;
    },
    facebook: {
        id: string;
        token: string;
        name: string;
        email: string;
    },
    twitter: {
        id: String,
        token: String,
        displayName: String,
        username: String
    },
    google: {
        id: String,
        token: String,
        email: String,
        name: String
    }
}