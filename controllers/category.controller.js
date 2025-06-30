'use strict';

const prisma = require('../prisma');
const errs = require('../utils/errorHandler');

// Base error
let error = errs.createError();

// Find all categories
module.exports.getAllCats = async (request, reply) => {
    error = errs.resetErrors();

    try {
        const categories = await prisma.category.findMany({
            include: {
                _count: {
                    select: {
                        tasks: true,
                    },
                },
            },
        });

        if (!categories || categories.length === 0) {
            error = errs.createError('Not Found', 404, 'No categories found.');
            return reply.code(error.https_response.code).send(error);
        }

        return reply.send(categories);
    } catch (error) {
        return reply.code(500).send(error);
    }
};

// Find category by ID
module.exports.getCatById = async (request, reply) => {
    error = errs.resetErrors();
    const { id } = request.params;

    try {
        const category = await prisma.category.findUnique({
            where: {
                category_id: parseInt(id),
            },
            include: {
                _count: {
                    select: {
                        tasks: true,
                    },
                },
            },
        });

        if (!category) {
            error = errs.createError('Not Found', 404, 'No category found.');
            return reply.code(error.https_response.code).send(error);
        }

        return reply.send(category);
    } catch (error) {
        return reply.code(500).send(error);
    }
};

// Find category by name
module.exports.getCatByName = async (request, reply) => {
    error = errs.resetErrors();
    const { category_name } = request.params;

    try {
        const category = await prisma.category.findUnique({
            where: {
                category_name,
            },
            include: {
                _count: {
                    select: {
                        tasks: true,
                    },
                },
            },
        });

        if (!category) {
            error = errs.createError('Not Found', 404, 'No category found.');
            return reply.code(error.https_response.code).send(error);
        }

        return reply.send(category);
    } catch (error) {
        return reply.code(500).send(error);
    }
};

// Create category
module.exports.createCat = async (request, reply) => {
    error = errs.resetErrors();

    const { category_name } = request.body;

    try {
        // Check if category already exists
        const existingCategory = await prisma.category.findUnique({
            where: { category_name },
        });

        if (existingCategory) {
            error = errs.createError('Conflict', 409, 'Category already exists.');
            return reply.code(error.https_response.code).send(error);
        }

        const category = await prisma.category.create({
            data: { category_name },
        });

        return reply.code(201).send({
            message: 'Category added!',
            category,
        });
    } catch (error) {
        return reply.code(500).send(error);
    }
};

// Update category
module.exports.updateCat = async (request, reply) => {
    error = errs.resetErrors();
    const { id } = request.params;
    const { category_name } = request.body;

    try {
        const category = await prisma.category.findUnique({
            where: { category_id: parseInt(id) },
        });

        if (!category) {
            error = errs.createError('Not Found', 404, 'No category found.');
            return reply.code(error.https_response.code).send(error);
        }

        const updatedCategory = await prisma.category.update({
            where: { category_id: parseInt(id) },
            data: { category_name },
        });

        return reply.send({
            message: 'Category updated!',
            category: updatedCategory,
        });
    } catch (error) {
        return reply.code(500).send(error);
    }
};

// Delete category
module.exports.deleteCat = async (request, reply) => {
    const { id } = request.params;
    try {
        const category = await prisma.category.findUnique({
            where: { category_id: parseInt(id) },
        });

        if (!category) {
            error = errs.createError('Not Found', 404, 'No category found.');
            return reply.code(error.https_response.code).send(error);
        }

        await prisma.category.delete({
            where: { category_id: parseInt(id) },
        });

        return reply.send({
            message: 'Category deleted!',
        });
    } catch (error) {
        return reply.code(500).send(error);
    }
};
