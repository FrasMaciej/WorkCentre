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
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const MongoDBStore = require('connect-mongodb-session')(session);

const store = new MongoDBStore({
    uri: constants.db_connection_string,
    collection: 'sessions',
    expires: 1000 * 60 , // one minute for test purpouse
});

store.on('error', (error) => {
    console.error('Error in session magazine:', error);
});

app.use(cors())

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.json());

app.use(session({
    secret: "your_session_secret",
    resave: false,
    saveUninitialized: false,
    store: store, 
    cookie: {
      maxAge: 1000 * 60
    },
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
    done(null, user.id);
})

passport.deserializeUser(async (id, done) => {
    await collections.users?.findOne({ _id: id }).then((user) => {
        done(user);
    });
})

passport.use(new LocalStrategy(async (username, password, cb) => {
    try {
        const user = await collections.users?.findOne({ 'local.email': username });
        if (user) {
            const salt = user.local.salt;
            pbkdf2(password, salt, 310000, 32, 'sha256', function (err, hashedPassword) {
                if (err) {
                    return cb(err);
                }
                if (!timingSafeEqual(Buffer.from(user.local.password, 'hex'), hashedPassword)) {
                    return cb(null, false, { message: 'Incorrect username or password.' });
                }
                return cb(null, user);
            });
        } else {
            return cb(null, false, { message: 'Error when logging.' });
        }
    } catch (err) {
        return err;
    }
}));

passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'your_jwt_secret'
},
    function (jwtPayload, cb) {
        return collections.users?.findOne({ _id: jwtPayload._id })
            .then(user => {
                return cb(null, user);
            })
            .catch(err => {
                return cb(err);
            });
    }
));

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