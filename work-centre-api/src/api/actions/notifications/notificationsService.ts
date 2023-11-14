import { ObjectId } from "mongodb";
import { collections } from "../../../database/mongoConnection";

export async function getNotifications(req, res) {
    const id = req.params.id;
    try {
        const user = await collections.users?.findOne({ _id: new ObjectId(id) });
        const notifications = user?.notifications;
        return res.json(notifications).status(200);
    } catch (err) {
        return res.json(err);
    }
}

export async function addNotification(dto: AddNotificationDto) {

    try {
        await collections.users?.updateOne(
            {
                _id: new ObjectId(dto.receiverId)
            },
            {
                $push: { "notifications": { title: dto.title, type: dto.type, content: dto.content, viewed: false, timestamp: new Date() } }
            });
        return true;
    } catch (err) {
        return false;
    }
}