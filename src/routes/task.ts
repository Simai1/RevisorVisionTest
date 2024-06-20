import { Router } from 'express';
import taskController from '../controllers/task.controller';
import verifyToken from '../middlewares/verify-token';
import validate from '../middlewares/validate';
import taskValidation from '../validations/task.validation';

const router: Router = Router();

router.route('/').post(verifyToken.auth, validate(taskValidation.create), taskController.create);
router.route('/').get(verifyToken.auth, taskController.getAll);
router.route('/:taskId').get(verifyToken.auth, validate(taskValidation.taskId), taskController.getOne);
router.route('/:taskId').put(verifyToken.auth, validate(taskValidation.update), taskController.update);
router.route('/:taskId').delete(verifyToken.auth, validate(taskValidation.taskId), taskController.deleteTask);

export default router;
