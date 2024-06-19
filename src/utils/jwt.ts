import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'; // eslint-disable-line
import tokenService from '../services/token.service';

const generate = (payload: string | Buffer | object) => {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET as string, { expiresIn: '30m' });
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET as string, { expiresIn: '30d' });
    return {
        accessToken,
        refreshToken,
    };
};

const saveToken = async (userId: number, refreshToken: string) => {
    const tokenData = await tokenService.getTokenByUserId(userId);
    if (tokenData) {
        return await tokenService.updateRefreshToken(userId, refreshToken);
    }
    return await tokenService.createToken(userId, refreshToken);
};

const removeToken = async (refreshToken: string) => {
    return await tokenService.destroyTokenByRefreshToken(refreshToken);
};

const verifyAccessToken = (token: string) => {
    return jwt.verify(token, process.env.JWT_ACCESS_SECRET as string);
};

const verifyRefreshToken = (token: string) => {
    return jwt.verify(token, process.env.JWT_REFRESH_SECRET as string);
};

const findToken = async (refreshToken: string) => {
    return await tokenService.getTokenByRefreshToken(refreshToken);
};

const decode = (token: string) => {
    return jwt.decode(token);
};

export default {
    generate,
    saveToken,
    removeToken,
    verifyAccessToken,
    verifyRefreshToken,
    findToken,
    decode,
};
