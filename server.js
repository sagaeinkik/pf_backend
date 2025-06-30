'use strict';

//Dependencies and whatnot
const fastify = require('fastify')({
    logger: false,
});
const cors = require('@fastify/cors');
require('dotenv').config();
const dbConnect = require('./dbConnect.js');
let port = process.env.PORT || 3000;

// Middlewares and whatnot
fastify.register(cors);

// Routes

// Welcome route
fastify.get('/', async (request, reply) => {
    return { message: 'HELLOOOO! This is the Pixelfiske API! I made it myself.' };
});

/* Fire it all up */
// Connect db
fastify.register(async (fastify) => {
    await dbConnect(fastify);
});
// Start the server!
(async () => {
    try {
        await fastify.listen({ port: port });
        console.log('Server is up and running on port ' + port + '!');
    } catch (error) {
        console.error('Error starting server:', error);
    }
})();
