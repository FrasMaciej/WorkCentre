import { collections } from "../../../database/mongoConnection";
import { ObjectId } from "mongodb";

export async function getChats(req, res) {
    const userId = req.params.id;
    const user = await collections.users?.findOne({ _id: new ObjectId(userId) });
    const chatIds = user?.conversationIds.map(id => new ObjectId(id));
    const chats = await collections.conversations?.find({ _id: { $in: chatIds } }).toArray();
    const mappedChats = chats?.map(c => { return { ...c, label: c.members.filter(c => c._id !== userId).reduce((acc, val) => (acc + val.name), '') } });
    return res.json(mappedChats);
}
