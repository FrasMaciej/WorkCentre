import { NextFunction, Request, Response } from 'express';
import { collections } from "../../../database/mongoConnection"
import { pbkdf2, randomBytes } from 'crypto';

export async function register(req: Request, res: Response, next: NextFunction) {
    const { email, password, firstName, lastName } = req.body;
    if (collections.users) {
        const existingUser = await collections.users.findOne({ 'local.email': email });
        if (existingUser) {
            return res.status(400).json({ message: 'User with this email already exists.' });
        } else {
            const salt = randomBytes(16);
            pbkdf2(password, salt, 310000, 32, 'sha256', async function (err, hashedPassword) {
                if (err) { return next(err); }
                const newUser = {
                    email,
                    password: String(hashedPassword),
                    salt: String(salt),
                    firstName,
                    lastName,
                };

                try {
                    await collections.users?.insertOne({ local: newUser });
                    return res.status(201).json({ message: 'User registered successfully.' });
                } catch (err) {
                    return res.status(500).json(err);
                }
            });
            return;
        }
    } else {
        return res.sendStatus(500);
    }
}





