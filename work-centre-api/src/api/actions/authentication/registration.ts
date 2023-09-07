import { Request, Response } from 'express';

export async function register(req: Request, res: Response) {
    const { email, password, firstName, lastName } = req.body;
    const newUser: UserDto = { email, firstName, lastName };
    if (password.length < 8) {
        return res.redirect("/api");
    }
    console.log(newUser);
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