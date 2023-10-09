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
import usersApiRouter from './api/routes/usersApi';
import { messageSchema } from './database/models/message/message';
import { ObjectId } from 'mongodb';
import chatApiRouter from './api/routes/chatApi';

const app = express();
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const path = require('path');

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


/* CHAT */
// const server = app.listen(3000);
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
    cors: {
        origin: ['http://star-jobs.azurewebsites.net', 'https://star-jobs.azurewebsites.net', 'http://localhost:4200', 'https://localhost:4200'],
        methods: ["GET", "POST"]
    }
});

app.use(express.static(path.join(__dirname, "public")));
io.on('connection', (socket) => {
    socket.on('send-message', async (message) => {
        const newMessage: messageSchema = {
            sender: message.sender,
            receiver: message.receiver,
            content: message.content,
            timestamp: new Date(),
            chatId: message.chatId
        };

        const senderUser = await collections.users?.findOne({ _id: new ObjectId(newMessage.sender) });
        const receiverUser = await collections.users?.findOne({ _id: new ObjectId(newMessage.receiver) });

        const conversation = await collections.conversations?.findOne({ _id: new ObjectId(newMessage.chatId) });
        if (conversation) {
            await collections.conversations?.updateOne(
                { _id: new ObjectId(newMessage.chatId) },
                { $push: { "messages": { sender: newMessage.sender, receiver: newMessage.receiver, content: newMessage.content, timestamp: newMessage.timestamp } } })
        } else {
            const conversation = {
                messages: [{ sender: newMessage.sender, receiver: newMessage.receiver, content: newMessage.content, timestamp: newMessage.timestamp }],
                members: [
                    { _id: newMessage.sender, name: `${senderUser?.local.firstName} ${senderUser?.local.lastName}` },
                    { _id: newMessage.receiver, name: `${receiverUser?.local.firstName} ${receiverUser?.local.lastName}` }
                ]
            }

            const result = await collections.conversations?.insertOne(conversation);
            if (result) {
                await collections.users?.updateOne(
                    { _id: new ObjectId(newMessage.sender) },
                    { $push: { "conversationIds": String(result?.insertedId) } });
                await collections.users?.updateOne(
                    { _id: new ObjectId(newMessage.receiver) },
                    { $push: { "conversationIds": String(result?.insertedId) } });
            }
        }



        io.to(message.receiverSocketId).emit('message-received', message);
    });

    socket.on('create-chat', async (message) => {
        const data = {
            sender: message.sender,
            receiver: message.receiver
        }

        const conversation = await collections.conversations?.findOne({ toId: data.receiver, fromId: data.sender });
        if (conversation) {
            return;
        } else {
            await collections.conversations?.insertOne({
                messages: [],
                members: []
            });
        }
    })

});
io.attach(server);
/* CHAT */


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

server.listen(constants.server_port, async () => {
    console.log(`Express is listening on port ${constants.server_port}`);
    await connectToDatabase();
});



app.use('/api', apiRouter, authApiRouter, usersApiRouter, chatApiRouter);

process.on('SIGINT', async () => {
    await closeDatabaseConnection();
    process.exit();
});
