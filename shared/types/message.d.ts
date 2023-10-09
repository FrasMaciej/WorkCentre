export { }

declare global {
    interface sendMessageDto {
        sender: string;
        receiver: string;
        content: string;
        timestamp: Date;
        chatId?: string;
    }
}