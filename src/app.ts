import express, { Express } from 'express';
import dotenv from "dotenv"; // eslint-disable-line


const app: Express = express();
const port = process.env.PORT || 3000;

app.listen(port, () => {
	console.log(`Server is running at http://localhost:${port}`);
});
