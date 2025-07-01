'use strict';

const {
    getAllCatsOpts,
    getAllCatsWithTasksOpts,
    getCatByIdOpts,
    createCatOpts,
    updateCatOpts,
    deleteCatOpts,
} = require('./options/category.options');

async function categoryRoutes(fastify) {
    fastify.get('/categories', getAllCatsOpts);
    fastify.get('/categories/tasks', getAllCatsWithTasksOpts);
    fastify.get('/categories/:id', getCatByIdOpts);
    fastify.post('/categories', createCatOpts);
    fastify.put('/categories/:id', updateCatOpts);
    fastify.delete('/categories/:id', deleteCatOpts);
}

module.exports = categoryRoutes;
