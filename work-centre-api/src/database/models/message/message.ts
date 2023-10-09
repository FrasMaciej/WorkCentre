export interface messageSchema {
    sender: string;
    receiver: string;
    content: string;
    timestamp: Date;
    chatId?: string;
}