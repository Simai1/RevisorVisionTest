"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = __importDefault(require("../client"));
const ApiError_1 = __importDefault(require("../utils/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const encryption_1 = require("../utils/encryption");
const createUser = async (email, password) => {
    if (await getUserByEmail(email)) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Email already taken');
    }
    return client_1.default.user.create({
        data: {
            email,
            password: await (0, encryption_1.encryptPassword)(password),
        },
    });
};
const getUserByEmail = async (email) => {
    return client_1.default.user.findUnique({
        where: { email },
    });
};
const getUserById = async (userId) => {
    return client_1.default.user.findUnique({
        where: { id: userId },
    });
};
exports.default = {
    createUser,
    getUserByEmail,
    getUserById,
};
