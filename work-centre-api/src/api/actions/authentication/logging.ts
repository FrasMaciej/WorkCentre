import { NextFunction, Request, Response } from 'express';
const passport = require('passport')

export async function login(req: Request, res: Response, next: NextFunction) {
    passport.authenticate('local', function (err, user, info) {

    })(req, res, next);
};

export async function logout(req, res, next) {
    req.logout(function (err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
};



