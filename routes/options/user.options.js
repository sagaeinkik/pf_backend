'use strict';

const userController = require('../../controllers/user.controller');

// All users

module.exports.getAllUsersOpts = {
    schema: {
        response: {
            200: {
                type: 'array',
                items: {
                    type: 'object',
                    properties: {
                        user_id: { type: 'number' },
                        username: { type: 'string' },
                        _count: {
                            type: 'object',
                            properties: {
                                createdTasks: { type: 'number' },
                                completedTasks: { type: 'number' },
                            },
                        },
                    },
                },
            },
        },
    },
    handler: userController.getAllUsers,
};

// User by ID
module.exports.getUserByIdOpts = {
    schema: {
        response: {
            200: {
                type: 'object',
                properties: {
                    user_id: { type: 'number' },
                    username: { type: 'string' },
                    _count: {
                        type: 'object',
                        properties: {
                            createdTasks: { type: 'number' },
                            completedTasks: { type: 'number' },
                        },
                    },
                },
            },
        },
    },
    handler: userController.getUserById,
};

// Register user
module.exports.registerUserOpts = {
    schema: {
        body: {
            type: 'object',
            required: ['username', 'password'],
            properties: {
                username: {
                    type: 'string',
                    minLength: 3,
                    maxLength: 255,
                    errorMessage: {
                        minLength: 'Username must be at least 3 characters long.',
                        maxLength: 'Username may not exceed 255 characters.',
                    },
                },
                password: {
                    type: 'string',
                    minLength: 4,
                    maxLength: 255,
                    errorMessage: {
                        minLength: 'Password must be at least 4 characters long.',
                        maxLength: 'Password may not exceed 255 characters.',
                    },
                },
            },
            errorMessage: {
                required: {
                    username: 'You must enter a username.',
                    password: 'You must enter a password.',
                },
            },
        },
        response: {
            201: {
                type: 'object',
                properties: {
                    message: { type: 'string' },
                    newUser: {
                        type: 'object',
                        properties: {
                            user_id: { type: 'number' },
                            username: { type: 'string' },
                        },
                    },
                    token: { type: 'string' },
                },
            },
        },
    },
    handler: userController.registerUser,
};

// Login user
module.exports.loginUserOpts = {
    schema: {
        body: {
            type: 'object',
            required: ['username', 'password'],
            properties: {
                username: { type: 'string' },
                password: { type: 'string' },
            },
            errorMessage: {
                required: {
                    username: 'You must enter a username.',
                    password: 'You must enter a password.',
                },
            },
        },
        response: {
            201: {
                type: 'object',
                properties: {
                    message: { type: 'string' },
                    user: {
                        type: 'object',
                        properties: {
                            user_id: { type: 'number' },
                            username: { type: 'string' },
                            createdTasks: { type: 'number' },
                            completedTasks: { type: 'number' },
                        },
                    },
                    token: { type: 'string' },
                },
            },
        },
    },
    handler: userController.loginUser,
};

// Delete user opts
module.exports.deleteUserOpts = {
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
    handler: userController.deleteUser,
};
