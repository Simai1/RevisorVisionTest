import Joi from 'joi';

const create = {
    body: Joi.object().keys({
        title: Joi.string().min(3).max(30).required(),
        description: Joi.string().min(3).max(150).required(),
    }),
};

const update = {
    params: Joi.object().keys({
        taskId: Joi.number().integer().required(),
    }),
    body: Joi.object().keys({
        title: Joi.string().min(3).max(30),
        description: Joi.string().min(3).max(150),
        status: Joi.boolean(),
    }),
};

const taskId = {
    params: Joi.object().keys({
        taskId: Joi.number().integer().required(),
    }),
};

export default {
    create,
    taskId,
    update,
};
