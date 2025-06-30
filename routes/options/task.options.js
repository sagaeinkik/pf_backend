'use strict';

const taskController = require('../../controllers/task.controller');
const auth = require('../../utils/authHandler');

// All tasks
module.exports.getAllTasksOpts = {
    schema: {
        response: {
            200: {
                type: 'array',
                items: {
                    type: 'object',
                    properties: {
                        task_id: { type: 'integer' },
                        desc: { type: 'string' },
                        categoryId: { type: 'integer' },
                        category: {
                            type: 'object',
                            properties: {
                                category_id: { type: 'integer' },
                                category_name: { type: 'string' },
                            },
                        },
                        completed: { type: 'boolean' },
                        createdByUserId: { type: 'integer' },
                        createdBy: {
                            type: 'object',
                            properties: {
                                user_id: { type: 'integer' },
                                username: { type: 'string' },
                            },
                        },
                        completedByUserId: { type: ['integer', 'null'] },
                        completedBy: {
                            type: ['object', 'null'],
                            properties: {
                                user_id: { type: 'integer' },
                                username: { type: 'string' },
                            },
                        },
                    },
                },
            },
        },
    },
    handler: taskController.getAllTasks,
};

// Task by ID
module.exports.getTaskByIdOpts = {
    schema: {
        response: {
            200: {
                type: 'object',
                properties: {
                    task_id: { type: 'integer' },
                    desc: { type: 'string' },
                    categoryId: { type: 'integer' },
                    category: {
                        type: 'object',
                        properties: {
                            category_id: { type: 'integer' },
                            category_name: { type: 'string' },
                        },
                    },
                    completed: { type: 'boolean' },
                    createdByUserId: { type: 'integer' },
                    createdBy: {
                        type: 'object',
                        properties: {
                            user_id: { type: 'integer' },
                            username: { type: 'string' },
                        },
                    },
                    completedByUserId: { type: ['integer', 'null'] },
                    completedBy: {
                        type: ['object', 'null'],
                        properties: {
                            user_id: { type: 'integer' },
                            username: { type: 'string' },
                        },
                    },
                },
            },
        },
    },
    handler: taskController.getTaskById,
};

// Create task
module.exports.createTaskOpts = {
    schema: {
        body: {
            type: 'object',
            required: ['desc', 'categoryId', 'createdByUserId'],
            properties: {
                desc: {
                    type: 'string',
                    minLength: 3,
                    maxLength: 255,
                    errorMessage: {
                        minLength: 'Description must be at least 3 characters long.',
                        maxLength: 'Description must not exceed 255 characters.',
                    },
                },
                categoryId: {
                    type: 'integer',
                    minimum: 1,
                    errorMessage: {
                        minimum: 'Category ID must be a positive integer.',
                    },
                },
                completed: {
                    type: 'boolean',
                    default: false,
                },
                createdByUserId: {
                    type: 'integer',
                    minimum: 1,
                    errorMessage: {
                        minimum: 'Created By User ID must be a positive integer.',
                    },
                },
                completedByUserId: {
                    type: ['integer', 'null'],
                    minimum: 1,
                    errorMessage: {
                        minimum: 'Completed By User ID must be a positive integer or null.',
                    },
                },
            },
            errorMessage: {
                required: {
                    desc: 'Description is required.',
                    categoryId: 'Category ID is required.',
                    createdByUserId: 'Created By User ID is required.',
                },
            },
        },
        response: {
            201: {
                type: 'object',
                properties: {
                    message: {
                        type: 'string',
                    },
                    task: {
                        type: 'object',
                        properties: {
                            task_id: { type: 'integer' },
                            desc: { type: 'string' },
                            categoryId: { type: 'integer' },
                            category: {
                                type: 'object',
                                properties: {
                                    category_id: { type: 'integer' },
                                    category_name: { type: 'string' },
                                },
                            },
                            completed: { type: 'boolean' },
                            createdByUserId: { type: 'integer' },
                            createdBy: {
                                type: 'object',
                                properties: {
                                    user_id: { type: 'integer' },
                                    username: { type: 'string' },
                                },
                            },
                            completedByUserId: { type: ['integer', 'null'] },
                            completedBy: {
                                type: ['object', 'null'],
                                properties: {
                                    user_id: { type: 'integer' },
                                    username: { type: 'string' },
                                },
                            },
                        },
                    },
                },
            },
        },
    },
    preHandler: auth.verifyToken,
    handler: taskController.createTask,
};

// Update task
module.exports.updateTaskOpts = {
    schema: {
        body: {
            type: 'object',
            properties: {
                desc: {
                    type: 'string',
                    minLength: 3,
                    maxLength: 255,
                    errorMessage: {
                        minLength: 'Description must be at least 3 characters long.',
                        maxLength: 'Description must not exceed 255 characters.',
                    },
                },
                categoryId: {
                    type: 'integer',
                    minimum: 1,
                    errorMessage: {
                        minimum: 'Category ID must be a positive integer.',
                    },
                },
                completed: {
                    type: 'boolean',
                    default: false,
                },
                createdByUserId: {
                    type: 'integer',
                    minimum: 1,
                    errorMessage: {
                        minimum: 'Created By User ID must be a positive integer.',
                    },
                },
                completedByUserId: {
                    type: ['integer', 'null'],
                    minimum: 1,
                    errorMessage: {
                        minimum: 'Completed By User ID must be a positive integer or null.',
                    },
                },
            },
        },
        response: {
            200: {
                type: 'object',
                properties: {
                    message: {
                        type: 'string',
                    },
                    task: {
                        type: 'object',
                        properties: {
                            task_id: { type: 'integer' },
                            desc: { type: 'string' },
                            categoryId: { type: 'integer' },
                            category: {
                                type: 'object',
                                properties: {
                                    category_id: { type: 'integer' },
                                    category_name: { type: 'string' },
                                },
                            },
                            completed: { type: 'boolean' },
                            createdByUserId: { type: 'integer' },
                            createdBy: {
                                type: 'object',
                                properties: {
                                    user_id: { type: 'integer' },
                                    username: { type: 'string' },
                                },
                            },
                            completedByUserId: { type: ['integer', 'null'] },
                            completedBy: {
                                type: ['object', 'null'],
                                properties: {
                                    user_id: { type: 'integer' },
                                    username: { type: 'string' },
                                },
                            },
                        },
                    },
                },
            },
        },
    },
    preHandler: auth.verifyToken,
    handler: taskController.updateTask,
};

// Delete task
module.exports.deleteTaskOpts = {
    schema: {
        response: {
            200: {
                type: 'object',
                properties: {
                    message: { type: 'string' },
                },
            },
        },
    },
    preHandler: auth.verifyToken,
    handler: taskController.deleteTask,
};
