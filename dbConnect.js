'use strict';

require('dotenv').config();
const connectionString = process.env.DB_URL;

// Database connection
async function dbConnect(fastify) {
    try {
        await fastify.register(require('@fastify/mysql'), {
            connectionString: connectionString,
            promise: true,
        });
    } catch (error) {
        console.error('Database connection failed:', error);
        throw error;
    }
}
module.exports = dbConnect;
