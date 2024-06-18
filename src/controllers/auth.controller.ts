import { Request, Response } from 'express';

export default {
	async register(req: Request, res: Response) {
		res.json({ status: 'OK' });
	},
	async login(req: Request, res: Response) {
		res.json({ status: 'OK' });
	},
};
