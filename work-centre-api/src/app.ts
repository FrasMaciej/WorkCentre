import express from 'express';
import apiRouter from './api/routes/api';
import authApiRouter from './api/routes/authApi';
import { constants } from './constants';
import { connectToDatabase, closeDatabaseConnection } from './database/mongoConnection'
import bodyParser from 'body-parser';
var cors = require('cors')
import { pbkdf2, timingSafeEqual } from 'crypto';
import { collections } from './database/mongoConnection';

const app = express();
const session = require('express-session')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

app.use(cors())

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.json());

app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
}))
app.use(passport.initialize())
app.use(passport.session())

const authUser = (user, password, done) => {
    console.log(`Value of "User" in authUser function ----> ${user}`)
    console.log(`Value of "Password" in authUser function ----> ${password}`)
    let authenticated_user = { id: 123, name: "Kyle" }
    return done(null, authenticated_user)
}

passport.use(new LocalStrategy(authUser))

passport.serializeUser((user, done) => {
    console.log(`--------> Serialize User`);
    console.log(user);
    done(null, user.id);
})

passport.deserializeUser((id, done) => {
    console.log("---------> Deserialize Id");
    console.log(id);
    done(null, { name: "Kyle", id: 123 });
})

passport.use(new LocalStrategy(async (username, password, cb) => {
    try {
        const user = await collections.users?.findOne({ 'local.email': username });
        if (user) {
            pbkdf2(password, user.local.salt, 310000, 32, 'sha256', function (err, hashedPassword) {
                console.log(Buffer.from(password));
                console.log(hashedPassword);
                if (err) {
                    console.log('1')
                    return cb(err);
                }
                if (!timingSafeEqual(Buffer.from(password), hashedPassword)) {
                    console.log('2')
                    return cb(null, false, { message: 'Incorrect username or password.' });
                }
                console.log('3')
                return cb(null);
            });
        } else {
            return Error;
        }
    } catch (err) {
        return err;
    }

}));

app.get('/', (req, res) => {
    res.send('Welcome on Work-Centre Server ® HACKER');
});

app.listen(constants.server_port, async () => {
    console.log(`Express is listening on port ${constants.server_port}`);
    await connectToDatabase();
});

app.use('/api', apiRouter, authApiRouter);

process.on('SIGINT', async () => {
    await closeDatabaseConnection();
    process.exit();
});