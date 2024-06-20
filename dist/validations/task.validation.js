"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const create = {
    body: joi_1.default.object().keys({
        title: joi_1.default.string().min(3).max(30).required(),
        description: joi_1.default.string().min(3).max(150).required(),
    }),
};
const update = {
    params: joi_1.default.object().keys({
        taskId: joi_1.default.number().integer().required(),
    }),
    body: joi_1.default.object().keys({
        title: joi_1.default.string().min(3).max(30),
        description: joi_1.default.string().min(3).max(150),
        status: joi_1.default.boolean(),
    }),
};
const taskId = {
    params: joi_1.default.object().keys({
        taskId: joi_1.default.number().integer().required(),
    }),
};
exports.default = {
    create,
    taskId,
    update,
};
