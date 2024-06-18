import express, { Express } from 'express';
import dotenv from 'dotenv'; // eslint-disable-line

import authRoute from './routes/auth';
import taskRoute from './routes/task';

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

app.use('/auth', authRoute);
app.use('/tasks', taskRoute);

app.listen(port, () => {
	console.log(`Server is running at http://localhost:${port}`);
});
