"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TaskDto {
    constructor(model) {
        this.id = model.id;
        this.title = model.title;
        this.description = model.description;
        this.status = Boolean(model.status);
    }
}
exports.default = TaskDto;
