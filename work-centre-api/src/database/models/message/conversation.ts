import { messageSchema } from "./message";

export interface ConversationSchema {
    messages: messageSchema[];
    members: ChatMember[];
}

interface ChatMember {
    _id: string;
    name: string;
}