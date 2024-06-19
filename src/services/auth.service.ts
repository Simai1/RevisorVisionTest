import ApiError from '../utils/ApiError';
import httpStatus from 'http-status';
import userService from './user.service';
import jwtUtil from '../utils/jwt';
import { User } from '@prisma/client';

type data = {
    accessToken: string;
    refreshToken: string;
    user: User;
};
const register = async (email: string, password: string): Promise<data> => {
    if (await userService.getUserByEmail(email)) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
    }
    const user = await userService.createUser(email, password);
    const { accessToken, refreshToken } = jwtUtil.generate({ ...user });
    await jwtUtil.saveToken(user.id, refreshToken);

    return {
        accessToken: accessToken,
        refreshToken: refreshToken,
        user: user,
    };
};

const login = async (email: string, password: string): Promise<data> => {
    if (await userService.getUserByEmail(email)) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
    }
    const user = await userService.createUser(email, password);
    const { accessToken, refreshToken } = jwtUtil.generate({ ...user });

    await jwtUtil.saveToken(user.id, refreshToken);

    return {
        accessToken: accessToken,
        refreshToken: refreshToken,
        user: user,
    };
};

const logout = async (refreshToken: string): Promise<void> => {
    await jwtUtil.removeToken(refreshToken);
};

export default {
    register,
    login,
    logout,
};
