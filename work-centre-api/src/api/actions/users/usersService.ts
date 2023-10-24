import { ObjectId } from "mongodb";
import { collections } from "../../../database/mongoConnection"

export async function getUsers(req, res) {
    const users = await collections.users?.find().toArray();
    if (users) {
        const parsedUsers: UserInfoDto[] = users?.map(u => {
            return { _id: String(u._id), email: u.local.email, firstName: u.local.firstName, lastName: u.local.lastName }
        });
        return res.json(parsedUsers);
    } else {
        return res.json({});
    }
}

export async function getUser(req, res) {
    try {
        const userId = req.params.id;
        const user = await collections.users?.findOne({ _id: new ObjectId(userId) });
        if (user) {
            const parsedUser = {
                primary: {
                    _id: String(user._id),
                    email: user.local.email,
                    firstName: user.local.firstName,
                    lastName: user.local.lastName,
                },
                details: user.profile
            };
            return res.json(parsedUser);
        } else {
            return res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        console.error("Error fetching user:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

export async function updateProfile(req, res) {
    try {
        const userData = req.body;
        collections.users?.updateOne(
            { _id: new ObjectId(userData._id) },
            { "$set": { profile: userData.userDetails } });
    } catch (err) {
        console.error(err);
    }
}



