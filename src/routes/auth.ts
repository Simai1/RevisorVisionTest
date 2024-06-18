import { Router } from 'express';
import authController from '../controllers/auth';

const router: Router = Router();

router.route('/register').post(authController.register);
router.route('/login').post(authController.login);

export default router;
