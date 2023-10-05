import express from 'express';
import apiRouter from './api/routes/defaultResponseApi';
import authApiRouter from './api/routes/authApi';
import bodyParser from 'body-parser';
import cors from 'cors';
import session from 'express-session';
import passport from 'passport';
import { constants } from './constants';
import { connectToDatabase, closeDatabaseConnection } from './database/mongoConnection'
import { pbkdf2, timingSafeEqual } from 'crypto';
import { collections } from './database/mongoConnection';
import MongoDBStore from 'connect-mongodb-session';
import { Strategy as LocalStrategy } from 'passport-local';
import passportJWT from 'passport-jwt';
import cookieParser from 'cookie-parser';

const app = express();

const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

app.set('trust proxy', 1);
app.use(express.json());
app.use(cors(
    {
        origin: ['http://star-jobs.azurewebsites.net', 'https://star-jobs.azurewebsites.net', 'http://localhost:4200', 'https://localhost:4200'],
        credentials: true,
    }
));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cookieParser(process.env.SESSION_SECRET));
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    store: new MongoDBStore(session)({
        uri: constants.db_connection_string,
        collection: 'sessions',
        expires: 1000 * 60 * 60 * 24,
        databaseName: 'star-jobs'
    }),
    proxy: true,
    name: 'WebAppCookie',
    cookie: {
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: true,
        sameSite: constants.is_production ? 'none' : false,
        secure: constants.is_production ? true : false
    },
}));
app.use(passport.initialize())
app.use(passport.session());
app.use(function (req: any, res, next) {
    res.locals.user = req.user || null
    next();
})

passport.serializeUser((user, done) => {
    done(null, user._id);
})

passport.deserializeUser(async (id, done) => {
    const user = await collections.users?.findOne({ _id: id });
    done(null, user);
})

passport.use(new LocalStrategy(async (username, password, done) => {
    try {
        const user = await collections.users?.findOne({ 'local.email': username });
        if (user) {
            const salt = user.local.salt;
            pbkdf2(password, salt, 310000, 32, 'sha256', function (err, hashedPassword) {
                if (err) {
                    return done(err);
                }
                if (!timingSafeEqual(Buffer.from(user.local.password, 'hex'), hashedPassword)) {
                    return done(null, false);
                }
                return done(null, user);
            });
        } else {
            return done(null, false);
        }
    } catch (err) {
        return err;
    }
}));

passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SESSION_SECRET
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
    res.send('Welcome on Work-Centre Server ®');
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