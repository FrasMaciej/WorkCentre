import { Request, Response } from 'express';
const passport = require('passport')

export async function login(req: Request, res: Response) {
    passport.authenticate('local', function (err, user, info) {
        if (err) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        if (!user) {
            return res.status(401).json({ message: 'Incorrect username or password.' });
        }
        return res.status(200).json({ message: 'Authentication successful', user });
    })(req, res);
};