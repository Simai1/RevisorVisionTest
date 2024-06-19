import { Router } from 'express';
import taskController from '../controllers/task.controller';
import verifyToken from '../middlewares/verify-token';

const router: Router = Router();

router.route('/').post(verifyToken.auth, taskController.create);
router.route('/').get(verifyToken.auth, taskController.getAll);
router.route('/:taskId').get(verifyToken.auth, taskController.getOne);
router.route('/:taskId').put(verifyToken.auth, taskController.update);
router.route('/:taskId').delete(verifyToken.auth, taskController.deleteTask);

export default router;
