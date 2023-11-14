import { ObjectId } from "mongodb";

export interface NotificationSchema {
    title: string;
    type: string;
    content: string;
    timestamp: Date;
    _id?: string | ObjectId;
    viewed: boolean;
}