import { Request, Response } from 'express';
import { collections } from "../../../database/mongoConnection"
// import { collections } from '@app/database/mongoConnection';

export async function register(req: Request, res: Response) {
    const { email, password, firstName, lastName } = req.body;

    if (collections.users) {
        const existingUser = await collections.users.findOne({ 'local.email': email });
        if (existingUser) {
            return res.status(400).json({ message: 'User with this email already exists.' });
        } else {
            const newUser: ExtendedUserDto = {
                email,
                password,
                firstName,
                lastName
            };
        }
    }


    // const newUser: UserDto = { email, firstName, lastName };
    // if (password.length < 8) {
    //     return res.redirect("/api");
    // }
    // console.log(newUser);
    // User.register(newUser, password, function (err: any, user: UserI) {
    //     if (err) { console.log(err); res.redirect("/api") }
    //     else {
    //         if (role === "Doctor") {
    //             const doctor = new Doctor({ name, surname, city });
    //             if (user._id !== undefined) {
    //                 doctor.userId = user._id;
    //             }
    //             doctor.save();
    //         }
    //         res.status(201).json({ "statusCode": 201 });
    //     }
    // });
}