import { MessageSchema } from "./message";

export interface ConversationSchema {
    messages: MessageSchema[];
    members: ChatMember[];
}

interface ChatMember {
    _id: string;
    name: string;
}

