import catchAsync from '../utils/catchAsync';
import ApiError from '../utils/ApiError';
import httpStatus from 'http-status';
import authService from '../services/auth.service';

const register = catchAsync(async ({ body: { email, password } }, res) => {
    if (!email) throw new ApiError(httpStatus.BAD_REQUEST, 'Missing email');
    if (!password) throw new ApiError(httpStatus.BAD_REQUEST, 'Missing password');

    const data = await authService.register(email, password);
    res.cookie('refreshToken', data.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
    res.json(data);
});

const login = catchAsync(async ({ body: { email, password } }, res) => {
    if (!email) throw new ApiError(httpStatus.BAD_REQUEST, 'Missing email');
    if (!password) throw new ApiError(httpStatus.BAD_REQUEST, 'Missing password');

    const data = await authService.login(email, password);
    res.cookie('refreshToken', data.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
    res.json(data);
});

const logout = catchAsync(async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    await authService.logout(refreshToken);
    res.clearCookie('refreshToken');
    res.json({ status: 'OK' });
});

const refresh = catchAsync(async (req, res) => {
    const { refreshToken } = req.cookies;
    const data = await authService.refresh(refreshToken);
    res.cookie('refreshToken', data.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
    res.json(data);
});

export default {
    register,
    login,
    logout,
    refresh,
};
