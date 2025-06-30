'use strict';

const categoryController = require('../../controllers/category.controller');
const auth = require('../../utils/authHandler');

// All categories
module.exports.getAllCatsOpts = {
    schema: {
        response: {
            200: {
                type: 'array',
                items: {
                    type: 'object',
                    properties: {
                        category_id: { type: 'number' },
                        category_name: { type: 'string' },
                        _count: {
                            type: 'object',
                            properties: {
                                tasks: { type: 'number' },
                            },
                        },
                    },
                },
            },
        },
    },
    handler: categoryController.getAllCats,
};

// Category by ID
module.exports.getCatByIdOpts = {
    schema: {
        response: {
            200: {
                type: 'object',
                properties: {
                    category_id: { type: 'number' },
                    category_name: { type: 'string' },
                    _count: {
                        type: 'object',
                        properties: {
                            tasks: { type: 'number' },
                        },
                    },
                },
            },
        },
    },
    handler: categoryController.getCatById,
};

// Add category
module.exports.createCatOpts = {
    schema: {
        body: {
            type: 'object',
            required: ['category_name'],
            properties: {
                category_name: {
                    type: 'string',
                    minLength: 2,
                    maxLength: 255,
                    errorMessage: {
                        minLength: 'Category name must be at least 2 characters long.',
                        maxLength: 'Category name must not exceed 255 characters.',
                    },
                },
            },
            errorMessage: {
                required: {
                    category_name: 'You must provide a category name.',
                },
            },
        },
        response: {
            201: {
                type: 'object',
                properties: {
                    message: { type: 'string' },
                    category: {
                        type: 'object',
                        properties: {
                            category_id: { type: 'number' },
                            category_name: { type: 'string' },
                        },
                    },
                },
            },
        },
    },
    preHandler: auth.verifyToken,
    handler: categoryController.createCat,
};

// Update category
module.exports.updateCatOpts = {
    schema: {
        body: {
            type: 'object',
            required: ['category_name'],
            properties: {
                category_name: {
                    type: 'string',
                    minLength: 2,
                    maxLength: 255,
                    errorMessage: {
                        minLength: 'Category name must be at least 2 characters long.',
                        maxLength: 'Category name must not exceed 255 characters.',
                    },
                },
            },
            errorMessage: {
                required: {
                    category_name: 'You must provide a category name.',
                },
            },
        },
        response: {
            200: {
                type: 'object',
                properties: {
                    message: { type: 'string' },
                    category: {
                        type: 'object',
                        properties: {
                            category_id: { type: 'number' },
                            category_name: { type: 'string' },
                        },
                    },
                },
            },
        },
    },
    preHandler: auth.verifyToken,
    handler: categoryController.updateCat,
};

// Delete category
module.exports.deleteCatOpts = {
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
    handler: categoryController.deleteCat,
};
