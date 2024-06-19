import httpStatus from 'http-status';
import catchAsync from '../utils/catchAsync';
import ApiError from '../utils/ApiError';
import taskService from '../services/task.service';

const create = catchAsync(async ({ body: { title, description, userId } }, res) => {
    if (!title) throw new ApiError(httpStatus.BAD_REQUEST, 'Missing title');
    if (!description) throw new ApiError(httpStatus.BAD_REQUEST, 'Missing description');
    if (!userId) throw new ApiError(httpStatus.BAD_REQUEST, 'Missing userId');

    const task = await taskService.createTask(title, description, userId);

    res.json(task);
});

export default {
    create,
};
