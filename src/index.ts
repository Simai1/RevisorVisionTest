import { Server } from 'http';
import app from './app';
import prisma from './client';
import { createClient } from 'redis';
import dotenv from 'dotenv'; // eslint-disable-line

let server: Server;
const redisClient = createClient({ url: process.env.REDIS_URL });
prisma.$connect().then(() => {
    console.log('Connected to SQL Database');
    server = app.listen(process.env.PORT, () => {
        console.log(`Listening to port ${process.env.PORT}`);
    });
});

const exitHandler = () => {
    if (server) {
        server.close(() => {
            console.log('Server closed');
            process.exit(1);
        });
    } else {
        process.exit(1);
    }
};

const unexpectedErrorHandler = (error: unknown) => {
    console.log(error);
    exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

redisClient.on('error', err => console.log('Redis Client Error', err));
redisClient.on('connect', () => console.log(`Connected to Redis Client on ${process.env.REDIS_URL}`));
redisClient.connect();

export default redisClient;
