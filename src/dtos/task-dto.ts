import { Task } from '@prisma/client';

export default class TaskDto {
    id: number;
    title: string;
    description: string;
    status: boolean;

    constructor(model: Task) {
        this.id = model.id;
        this.title = model.title;
        this.description = model.description;
        this.status = Boolean(model.status);
    }
}
