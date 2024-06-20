"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const task_controller_1 = __importDefault(require("../controllers/task.controller"));
const verify_token_1 = __importDefault(require("../middlewares/verify-token"));
const validate_1 = __importDefault(require("../middlewares/validate"));
const task_validation_1 = __importDefault(require("../validations/task.validation"));
const router = (0, express_1.Router)();
router.route('/').post(verify_token_1.default.auth, (0, validate_1.default)(task_validation_1.default.create), task_controller_1.default.create);
router.route('/').get(verify_token_1.default.auth, task_controller_1.default.getAll);
router.route('/:taskId').get(verify_token_1.default.auth, (0, validate_1.default)(task_validation_1.default.taskId), task_controller_1.default.getOne);
router.route('/:taskId').put(verify_token_1.default.auth, (0, validate_1.default)(task_validation_1.default.update), task_controller_1.default.update);
router.route('/:taskId').delete(verify_token_1.default.auth, (0, validate_1.default)(task_validation_1.default.taskId), task_controller_1.default.deleteTask);
exports.default = router;
