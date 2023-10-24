import { NextFunction, Request, Response } from 'express';
import { collections } from "../../../database/mongoConnection"
import { pbkdf2, randomBytes } from 'crypto';
import * as randomstring from "randomstring";
import { sendingMail } from '../emailTransporter/mailingService';
import { UserSchema } from '@app/database/models/users/authentication';
import { readAppSettings } from '../../../constants';
const appSettings = readAppSettings();

export async function register(req: Request, res: Response, next: NextFunction) {
    const { email, password, firstName, lastName } = req.body;
    const existingUser = await collections?.users?.findOne({ 'local.email': email });
    if (existingUser) {
        return res.status(400).json({ message: 'User with this email already exists.' });
    } else {
        const salt = randomBytes(16).toString('hex');
        pbkdf2(password, salt, 310000, 32, 'sha256', async function (err, hashedPassword) {
            if (err) { return next(err); }

            const permalink: string = req.body.email.toLowerCase().replace(' ', '').replace(/[^\w\s]/gi, '').trim();
            const verificationToken: string = randomstring.generate({ length: 64 });

            const newUser: UserSchema = {
                local: {
                    email,
                    password: hashedPassword.toString('hex'),
                    salt,
                    firstName,
                    lastName,
                    permalink,
                    verificationToken,
                    verified: appSettings.emailConfirmationEnabled ? false : true,
                },
                roles: {
                    owned: ['employer', 'employee']
                },
                conversationIds: [],
                profile: {}
            };

            try {
                await collections.users?.insertOne(newUser, function (err) {
                    if (appSettings.emailConfirmationEnabled) {
                        sendEmail(newUser);
                    }
                });
                return res.status(201).json({ message: 'User registered successfully.' });
            } catch (err) {
                return res.status(500).json(err);
            }
        });
        return;
    }

}

function sendEmail(user: UserSchema) {
    sendingMail({
        from: "no-reply@example.com",
        to: `${user.local.email}`,
        subject: "Account Verification Link",
        text: `Hello, ${user.local.firstName} ${user.local.lastName} Please verify your email by
              clicking this link :
              ${process.env.API_URL}/api/verify-email/?token=${user.local.verificationToken}&userId=${user._id}`,
    });
}



