'use strict';

const {
    getTaskByIdOpts,
    getAllTasksOpts,
    createTaskOpts,
    updateTaskOpts,
    deleteTaskOpts,
} = require('./options/task.options');

async function taskRoutes(fastify) {
    fastify.get('/tasks', getAllTasksOpts);
    fastify.get('/tasks/:id', getTaskByIdOpts);
    fastify.post('/tasks', createTaskOpts);
    fastify.put('/tasks/:id', updateTaskOpts);
    fastify.delete('/tasks/:id', deleteTaskOpts);
}

module.exports = taskRoutes;
