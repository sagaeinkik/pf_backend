'use strict';

const prisma = require('../prisma');
const errs = require('../utils/errorHandler');

// Base error
let error = errs.createError();

// All tasks
module.exports.getAllTasks = async (request, reply) => {
    error = errs.resetErrors();

    try {
        const tasks = await prisma.task.findMany({
            include: {
                category: true,
                createdBy: true,
                completedBy: true,
            },
        });

        if (!tasks || tasks.length === 0) {
            error = errs.createError('Not Found', 404, 'No tasks found.');
            return reply.code(error.https_response.code).send(error);
        }

        return reply.send(tasks);
    } catch (error) {
        return reply.code(500).send(error);
    }
};

// Find task by ID
module.exports.getTaskById = async (request, reply) => {
    error = errs.resetErrors();
    const { id } = request.params;

    try {
        const task = await prisma.task.findUnique({
            where: {
                task_id: parseInt(id),
            },
            include: {
                category: true,
                createdBy: true,
                completedBy: true,
            },
        });

        if (!task) {
            error = errs.createError('Not Found', 404, 'Task not found.');
            return reply.code(error.https_response.code).send(error);
        }

        return reply.send(task);
    } catch (error) {
        return reply.code(500).send(error);
    }
};

// Create task
module.exports.createTask = async (request, reply) => {
    error = errs.resetErrors();

    const { desc, categoryId, createdByUserId } = request.body;

    try {
        const task = await prisma.task.create({
            data: {
                desc,
                categoryId: parseInt(categoryId),
                createdByUserId: parseInt(createdByUserId),
            },
            include: {
                category: true,
                createdBy: true,
                completedBy: true,
            },
        });

        if (!task) {
            error = errs.createError('Bad Request', 400, 'Task creation failed.');
            return reply.code(error.https_response.code).send(error);
        }

        return reply.code(201).send({
            message: 'Task added successfully!',
            task,
        });
    } catch (error) {
        return reply.code(500).send(error);
    }
};

// Update task
module.exports.updateTask = async (request, reply) => {
    error = errs.resetErrors();

    const { id } = request.params;
    const updateData = request.body;

    try {
        // Find task
        const task = await prisma.task.findUnique({
            where: { task_id: parseInt(id) },
            include: {
                category: true,
                createdBy: true,
                completedBy: true,
            },
        });

        // Task notfound
        if (!task) {
            error = errs.createError('Not Found', 404, 'Task not found.');
            return reply.code(error.https_response.code).send(error);
        }

        // update task
        const updatedTask = await prisma.task.update({
            where: { task_id: parseInt(id) },
            data: updateData,
            include: {
                category: true,
                createdBy: true,
                completedBy: true,
            },
        });

        return reply.send({
            message: 'Task updated!',
            task: updatedTask,
        });
    } catch (error) {
        return reply.code(500).send(error);
    }
};

// Delete task
module.exports.deleteTask = async (request, reply) => {
    error = errs.resetErrors();
    const { id } = request.params;

    try {
        const task = await prisma.task.findUnique({
            where: { task_id: parseInt(id) },
        });

        if (!task) {
            error = errs.createError('Not Found', 404, 'Task not found.');
            return reply.code(error.https_response.code).send(error);
        }

        await prisma.task.delete({
            where: { task_id: parseInt(id) },
        });

        return reply.send({
            message: 'Task deleted successfully!',
        });
    } catch (error) {
        return reply.code(500).send(error);
    }
};
