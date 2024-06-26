import httpStatus from 'http-status';
import catchAsync from '../utils/catchAsync';
import ApiError from '../utils/ApiError';
import taskService from '../services/task.service';
import TaskDto from '../dtos/task-dto';
import redisClient from '../index';

const create = catchAsync(async (req, res) => {
    const { title, description } = req.body;
    const user = req.user;
    if (!title) throw new ApiError(httpStatus.BAD_REQUEST, 'Missing title');
    if (!description) throw new ApiError(httpStatus.BAD_REQUEST, 'Missing description');

    const task = await taskService.createTask(title, description, user.id);

    const taskDto = new TaskDto(task);

    res.json(taskDto);
});

const getAll = catchAsync(async (req, res) => {
    const user = req.user;
    const tasks = await taskService.getAllUserTasks(user.id);

    const taskDtos = tasks.map(task => new TaskDto(task));

    res.json(taskDtos);
});

const getOne = catchAsync(async (req, res) => {
    const { taskId } = req.params;
    if (!taskId) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Missing taskId');
    }

    const key = `task:${taskId}`;
    const raw = await redisClient.get(key);
    let taskDto;
    if (raw) {
        taskDto = JSON.parse(raw);
    } else {
        const task = await taskService.getTaskById(Number(taskId));
        if (!task) {
            throw new ApiError(httpStatus.NOT_FOUND, 'Task not found');
        }

        taskDto = new TaskDto(task);

        await redisClient.setEx(key, 600, JSON.stringify(taskDto));
    }

    // let taskDto;
    // const task = await taskService.getTaskById(Number(taskId));
    // if (!task) {
    //     throw new ApiError(httpStatus.NOT_FOUND, 'Task not found');
    // }
    // taskDto = new TaskDto(task);

    res.json(taskDto);
});

const update = catchAsync(async (req, res) => {
    const { taskId } = req.params;
    if (!taskId) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Missing taskId');
    }

    const updateBody = req.body;
    if (!(updateBody.title || updateBody.description || updateBody.status)) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid body');
    }
    if (updateBody.status) {
        updateBody.status = Boolean(updateBody.status);
    }

    const task = await taskService.updateTaskById(Number(taskId), updateBody);

    const taskDto = new TaskDto(task);

    const key = `task:${taskId}`;
    const raw = await redisClient.get(key);

    if (raw) {
        await redisClient.set(key, JSON.stringify(taskDto));
    }

    res.json(taskDto);
});

const deleteTask = catchAsync(async (req, res) => {
    const { taskId } = req.params;
    if (!taskId) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Missing taskId');
    }
    await taskService.deleteTaskById(Number(taskId));

    const key = `task:${taskId}`;
    const raw = await redisClient.get(key);

    if (raw) {
        await redisClient.del(key);
    }

    res.json({ status: 'OK' });
});

export default {
    create,
    getAll,
    getOne,
    update,
    deleteTask,
};
