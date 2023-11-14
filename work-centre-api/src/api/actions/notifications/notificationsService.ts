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
                $push: { "notifications": { title: dto.title, type: dto.type, content: dto.content, viewed: false, timestamp: new Date(), _id: new ObjectId() } }
            });
        return true;
    } catch (err) {
        return false;
    }
}

export async function changeNotificationStatus(req, res) {
    const dto: ChangeNotificationStatusDto = req.body;
    try {
        const user: any = await collections.users?.findOne({ _id: new ObjectId(dto.userId) });
        if (user) {
            const notificationIndex: any = user.notifications?.findIndex(
                notification => (notification._id.toString() === dto.notificationId.toString())
            );
            if (notificationIndex !== -1) {
                user.notifications[notificationIndex]['viewed'] = true;
                await collections.users?.updateOne(
                    { "notifications._id": new ObjectId(dto.notificationId) },
                    { $set: { "notifications.$.viewed": true } }
                );
                return res.json({});
            }
        }
        return false;
    } catch (err) {
        console.error(err);
        return res.json({});
    }
}