"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const ApiError_1 = __importDefault(require("../utils/ApiError"));
const task_service_1 = __importDefault(require("../services/task.service"));
const task_dto_1 = __importDefault(require("../dtos/task-dto"));
const create = (0, catchAsync_1.default)(async (req, res) => {
    const { title, description } = req.body;
    const user = req.user;
    if (!title)
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Missing title');
    if (!description)
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Missing description');
    const task = await task_service_1.default.createTask(title, description, user.id);
    const taskDto = new task_dto_1.default(task);
    res.json(taskDto);
});
const getAll = (0, catchAsync_1.default)(async (req, res) => {
    const user = req.user;
    const tasks = await task_service_1.default.getAllUserTasks(user.id);
    const taskDtos = tasks.map(task => new task_dto_1.default(task));
    res.json(taskDtos);
});
const getOne = (0, catchAsync_1.default)(async (req, res) => {
    const { taskId } = req.params;
    if (!taskId) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Missing taskId');
    }
    const task = await task_service_1.default.getTaskById(Number(taskId));
    if (!task) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Task not found');
    }
    const taskDto = new task_dto_1.default(task);
    res.json(taskDto);
});
const update = (0, catchAsync_1.default)(async (req, res) => {
    const { taskId } = req.params;
    if (!taskId) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Missing taskId');
    }
    const updateBody = req.body;
    if (!(updateBody.title || updateBody.description || updateBody.status)) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Invalid body');
    }
    if (updateBody.status) {
        updateBody.status = Boolean(updateBody.status);
    }
    const task = await task_service_1.default.updateTaskById(Number(taskId), updateBody);
    const taskDto = new task_dto_1.default(task);
    res.json(taskDto);
});
const deleteTask = (0, catchAsync_1.default)(async (req, res) => {
    const { taskId } = req.params;
    if (!taskId) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Missing taskId');
    }
    await task_service_1.default.deleteTaskById(Number(taskId));
    res.json({ status: 'OK' });
});
exports.default = {
    create,
    getAll,
    getOne,
    update,
    deleteTask,
};
