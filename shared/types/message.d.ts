export { }

declare global {
    interface sendMessageDto {
        sender: string;
        receiver: string;
        content: string;
        timestamp: Date;
        chatId?: string;
    }

    interface ConversationDto {
        messages: MessageSchema[];
        members: ChatMember[];
        label: string;
        _id?: string;
    }

    interface ChatMember {
        _id: string;
        name: string;
    }

    interface MessageSchema {
        sender: string;
        receiver: string;
        content: string;
        timestamp: Date;
        chatId?: string;
    }
}