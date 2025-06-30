'use strict';

require('dotenv').config();
const fastify = require('fastify')({
    // Error handling
    ajv: {
        plugins: [require('ajv-errors')],
        customOptions: { allErrors: true },
    },
    logger: false,
});
const { errorMapping } = require('./utils/errorHandler');

//ORM
const { PrismaClient } = require('@prisma/client');
const prisma = require('./prisma');

//Middleware
const cors = require('@fastify/cors');
fastify.register(cors);
fastify.setErrorHandler(errorMapping);

/* Routes */
// Welcome
fastify.get('/', async (request, reply) => {
    return {
        message:
            'HeLLOOOOOO!!! This is an API for developing a fishing game called Pixelfiske. I will write more about it later! Fun!',
    };
});

// App settings
let port = process.env.PORT || 3000;

// Connect to DB
async function dbConnect() {
    try {
        await prisma.$connect(); // Automatically connects using .env variables
        console.log('Connected to the database.');
    } catch (error) {
        console.error('Database connection failed: ', error);
        process.exit(1);
    }
}

// Start the app
(async () => {
    try {
        await dbConnect();
        await fastify.listen({ port, host: '0.0.0.0' });
        console.log(`Application up and running on ${port}! Hooray!`);
    } catch (error) {
        console.error('Could not run application: ', error);
        process.exit(1);
    }
})();
