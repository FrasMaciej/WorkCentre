import express from 'express';
import { constants } from './constants';
import { connectToDatabase, closeDatabaseConnection } from './database/mongoConnection'
import apiRouter from './api/routes/api';
import authApiRouter from './api/routes/authApi';
import bodyParser from 'body-parser';
var cors = require('cors')
import { pbkdf2, timingSafeEqual } from 'crypto';
import { collections } from './database/mongoConnection';


const app = express();

app.use(cors())
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.json());

const session = require('express-session')
const passport = require('passport')

const MongoDBStore = require('connect-mongodb-session')(session);
const store = new MongoDBStore({
    uri: constants.db_connection_string,
    collection: 'sessions',
    expires: 1000 * 60 * 60,
});

store.on('error', (error) => {
    console.error('Error in session magazine:', error);
});

app.use(session({
    secret: "your_session_secret",
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: {
        maxAge: 1000 * 60 * 60,
        secure: false
    },
}));
app.use(passport.initialize())
app.use(passport.session());

const LocalStrategy = require('passport-local').Strategy
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

passport.serializeUser((user, done) => {
    console.log('Serializing')
    return done(null, user);
})

passport.deserializeUser(async (id, done) => {
    const user = await collections.users?.findOne({ _id: id });
    return done(null, user);
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