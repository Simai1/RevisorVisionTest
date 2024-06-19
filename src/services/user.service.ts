import { User } from '@prisma/client';
import prisma from '../client';
import ApiError from '../utils/ApiError';
import httpStatus from 'http-status';
import { encryptPassword } from '../utils/encryption';

const createUser = async (email: string, password: string): Promise<User> => {
    if (await getUserByEmail(email)) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
    }
    return prisma.user.create({
        data: {
            email,
            password: await encryptPassword(password),
        },
    });
};

const getUserByEmail = async (email: string): Promise<User | null> => {
    return prisma.user.findUnique({
        where: { email },
    });
};

const getUserById = async (userId: number): Promise<User | null> => {
    return prisma.user.findUnique({
        where: { id: userId },
    });
};

export default {
    createUser,
    getUserByEmail,
    getUserById,
};
