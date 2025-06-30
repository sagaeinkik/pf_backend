'use strict';

const {
    getAllCatsOpts,
    getCatByIdOpts,
    getCatByNameOpts,
    createCatOpts,
    updateCatOpts,
    deleteCatOpts,
} = require('./options/category.options');

async function categoryRoutes(fastify) {
    fastify.get('/categories', getAllCatsOpts);
    fastify.get('/categories/:id', getCatByIdOpts);
    fastify.get('/categories/name/:name', getCatByNameOpts);
    fastify.post('/categories', createCatOpts);
    fastify.put('/categories/:id', updateCatOpts);
    fastify.delete('/categories/:id', deleteCatOpts);
}

module.exports = categoryRoutes;
