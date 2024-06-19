import { Task, Prisma } from '@prisma/client';
import prisma from '../client';
import ApiError from '../utils/ApiError';
import httpStatus from 'http-status';

const createTask = async (title: string, description: string, userId: number): Promise<Task> => {
    return prisma.task.create({
        data: {
            title,
            description,
            userId,
        },
    });
};

const getTaskById = async (taskId: number): Promise<Task | null> => {
    return prisma.user.findUnique({
        where: { id: taskId },
    }) as Promise<Task | null>;
};

const getAllTasks = async (): Promise<Task[]> => {
    return prisma.task.findMany();
};

const updateTaskById = async (taskId: number, updateBody: Prisma.TaskUpdateInput): Promise<Task> => {
    const task = await getTaskById(taskId);
    if (!task) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Task not found');
    }
    const updatedUser = await prisma.task.update({
        where: { id: task.id },
        data: updateBody,
    });
    return updatedUser;
};

const deleteTaskById = async (taskId: number): Promise<Task> => {
    const task = await getTaskById(taskId);
    if (!task) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Task not found');
    }
    await prisma.task.delete({ where: { id: task.id } });
    return task;
};

export default {
    createTask,
    getTaskById,
    getAllTasks,
    updateTaskById,
    deleteTaskById,
};
