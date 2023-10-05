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