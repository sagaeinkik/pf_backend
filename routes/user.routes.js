'use strict';

const {
    getAllUsersOpts,
    getUserByIdOpts,
    registerUserOpts,
    loginUserOpts,
    deleteUserOpts,
} = require('./options/user.options');

async function userRoutes(fastify) {
    fastify.get('/users', getAllUsersOpts);
    fastify.get('/users/:id', getUserByIdOpts);
    fastify.post('/users/register', registerUserOpts);
    fastify.post('/users/login', loginUserOpts);
    fastify.delete('/users/:id', deleteUserOpts);
}

module.exports = userRoutes;
