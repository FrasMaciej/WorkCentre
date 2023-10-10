export interface MessageSchema {
    sender: string;
    receiver: string;
    content: string;
    timestamp: Date;
    chatId?: string;
}