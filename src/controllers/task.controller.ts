import httpStatus from 'http-status';
import catchAsync from '../utils/catchAsync';
import ApiError from '../utils/ApiError';
import taskService from '../services/task.service';

const create = catchAsync(async (req, res) => {
    const { title, description } = req.body;
    const user = req.user;
    if (!title) throw new ApiError(httpStatus.BAD_REQUEST, 'Missing title');
    if (!description) throw new ApiError(httpStatus.BAD_REQUEST, 'Missing description');

    const task = await taskService.createTask(title, description, user.id);

    res.json(task);
});

export default {
    create,
};
