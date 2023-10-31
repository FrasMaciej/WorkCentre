import { collections } from "../database/mongoConnection";
import express from 'express';
import { app } from "../app";
import { MessageSchema } from '../database/models/message/message';
import { ObjectId } from 'mongodb';
import { server } from "../app";

const path = require('path');

const io = require('socket.io')(server, {
    cors: {
        origin: ['http://star-jobs.azurewebsites.net', 'https://star-jobs.azurewebsites.net', 'http://localhost:4200', 'https://localhost:4200'],
        methods: ["GET", "POST"]
    }
});

app.use(express.static(path.join(__dirname, "public")));
io.on('connection', (socket) => {
    socket.on('send-message', async (message) => {
        if (!message.sender || !message.receiver) {
            return;
        }
        const newMessage: MessageSchema = {
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
        io.emit('message-received', message);
    });

    socket.on('send-message-dedicated', async (message) => {
        if (!message.sender || !message.receiver) {
            return;
        }
        const newMessage: MessageSchema = {
            sender: message.sender,
            receiver: message.receiver,
            content: message.content,
            timestamp: new Date(),
            chatId: message.chatId
        };


        const senderUser = await collections.users?.findOne({ _id: new ObjectId(newMessage.sender) });
        const receiverUser = await collections.users?.findOne({ _id: new ObjectId(newMessage.receiver) });
        const conversation = await collections.conversations?.findOne({
            $and: [
                {
                    "members": {
                        $elemMatch: {
                            "_id": newMessage.sender,
                        }
                    }
                },
                {
                    "members": {
                        $elemMatch: {
                            "_id": newMessage.receiver,
                        }
                    }
                },
                {
                    $expr: {
                        $eq: [{ $size: "$members" }, 2]
                    }
                }
            ]
        });

        if (conversation) {
            await collections.conversations?.updateOne(
                { _id: new ObjectId(conversation._id) },
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
        io.emit('message-received', message);
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
