"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = __importDefault(require("../client"));
const ApiError_1 = __importDefault(require("../utils/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const createTask = async (title, description, userId) => {
    return client_1.default.task.create({
        data: {
            title,
            description,
            userId: userId,
        },
    });
};
const getTaskById = async (taskId) => {
    return client_1.default.task.findUnique({
        where: { id: taskId },
    });
};
const getAllUserTasks = async (userId) => {
    return client_1.default.task.findMany({
        where: { userId },
    });
};
const updateTaskById = async (taskId, updateBody) => {
    const task = await getTaskById(taskId);
    if (!task) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Task not found');
    }
    return await client_1.default.task.update({
        where: { id: task.id },
        data: updateBody,
    });
};
const deleteTaskById = async (taskId) => {
    const task = await getTaskById(taskId);
    if (!task) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Task not found');
    }
    await client_1.default.task.delete({ where: { id: task.id } });
    return task;
};
exports.default = {
    createTask,
    getTaskById,
    getAllUserTasks,
    updateTaskById,
    deleteTaskById,
};
