import { User } from '@prisma/client';
export default class UserDto {
    id: number;
    email: string;

    constructor(model: User) {
        this.id = model.id;
        this.email = model.email;
    }
}
