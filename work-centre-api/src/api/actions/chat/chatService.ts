import { collections } from "../../../database/mongoConnection";
import { ObjectId } from "mongodb";

export async function getChats(req, res) {
    const userId = req.params.id;
    console.log(userId);
    const user = await collections.users?.findOne({ _id: new ObjectId(userId) });
    const chatIds = user?.conversationIds;
}
