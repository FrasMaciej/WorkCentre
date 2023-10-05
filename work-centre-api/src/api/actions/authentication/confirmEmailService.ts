import { collections } from "../../../database/mongoConnection";
import { ObjectId } from "mongodb";

export async function verifyEmail(req, res) {
    const token = req.param('token');
    const userId = req.param('userId');

    const user = await collections.users?.findOne({ "_id": new ObjectId(userId) });

    if (!user) {
        return res.status(400).send({ msg: "User does not exits." });
    } else if (!user?.local.verificationToken) {
        return res.status(400).send({ msg: "Your verification link may have expired. Please click on resend to verify your Email.", });
    } else {
        if (user.local.verified) {
            return res.status(200).send("User has been already verified. Please Login");
        } else {
            if (user.local.verificationToken !== token) {
                return res.status(500).send({ msg: 'Verification Error' });
            }
            const updated = await collections?.users?.updateOne({ _id: new ObjectId(userId) }, { $set: { 'local.verified': true } });
            if (!updated) {
                return res.status(500).send({ msg: 'Something went wrong' });
            } else {
                return res.status(200).send("Your account has been successfully verified");
            }
        }
    }
}