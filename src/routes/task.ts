import { Router } from 'express';
import taskController from '../controllers/task.controller';
import verifyToken from '../middlewares/verify-token';

const router: Router = Router();

router.route('/').post(verifyToken.auth, taskController.create);
// router.route('/').get(taskController.getAll);
// router.route('/:taskId').get(taskController.getOne);
// router.route('/:taskId').put(taskController.update);
// router.route('/:taskId').delete(taskController.delete);

export default router;
