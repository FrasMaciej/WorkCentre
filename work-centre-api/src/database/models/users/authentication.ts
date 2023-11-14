import { NotificationSchema } from "../notifications/notifications";
import { UserProfileSchema } from "../profile/profile";
import { Roles } from "./roles";

export interface UserSchema {
    _id?: any;
    local: UserSchemaLocal;
    roles: Roles;
    conversationIds: string[],
    profile: UserProfileSchema,
    jobsAuthor?: string[],
    jobsApplicant?: string[],
    organizationsOwner?: string[],
    notifications?: NotificationSchema[],
    facebook?: {
        id: string;
        token: string;
        name: string;
        email: string;
    },
    twitter?: {
        id: string,
        token: string,
        displayName: string,
        username: string
    },
    google?: {
        id: string,
        token: string,
        email: string,
        name: string
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