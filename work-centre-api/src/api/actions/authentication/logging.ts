import { Request, Response } from 'express';
const jwt = require('jsonwebtoken');
const passport = require('passport')

export async function login(req, res: Response, next) {
    passport.authenticate('local', function (err, user, info) {
        if (err) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        if (!user) {
            return res.status(401).json({ message: 'Incorrect username or password.' });
        }
        req.login(user, function (error) {
            if (error) { return next(error); }
            const token = jwt.sign({ user }, 'your_jwt_secret');
            return res.json({ user, token });
        });
    })(req, res);
}

export async function logout(req, res: Response) {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        return res.status(200).json({ message: 'Logged out successfully.' });
    });
};

export function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.json(false);
    }
};

export function isSessionActive(req, res, next) {
    return res.json({ 'isAuthenticated': req.isAuthenticated() });
};