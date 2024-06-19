import express, { Express } from 'express';
import dotenv from 'dotenv'; // eslint-disable-line
import corsMiddleware from './middlewares/cors';
import cookieParser from 'cookie-parser';

import authRoute from './routes/auth';
import taskRoute from './routes/task';

const app: Express = express();

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(corsMiddleware);
app.use(cookieParser());

app.use('/auth', authRoute);
app.use('/tasks', taskRoute);
export default app;
