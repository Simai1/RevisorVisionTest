"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("./middlewares/cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const auth_1 = __importDefault(require("./routes/auth"));
const task_1 = __importDefault(require("./routes/task"));
const app = (0, express_1.default)();
app.use(express_1.default.json({ limit: '10mb' }));
app.use(express_1.default.urlencoded({ extended: true }));
app.use(cors_1.default);
app.use((0, cookie_parser_1.default)());
app.use('/auth', auth_1.default);
app.use('/tasks', task_1.default);
exports.default = app;
