'use strict';

const fastify = require('fastify')();
const dbConnect = require('./dbConnect.js');

// Async query function
function asyncQuery(query, params = []) {
    return new Promise((resolve, reject) => {
        fastify.mysql.query(query, params, (error, result) => {
            if (error) {
                console.error('Query execution failed:', error);
                reject(error);
            } else {
                console.error('Query executed successfully!');
                resolve(result);
            }
        });
    });
}

/* QUERIES */

// Drop all tables
async function dropTables() {
    try {
        console.error('Dropping all tables...');
        await asyncQuery('DROP TABLE IF EXISTS tasks');
        await asyncQuery('DROP TABLE IF EXISTS users');
        await asyncQuery('DROP TABLE IF EXISTS categories');
        console.log('All tables dropped. \n');
    } catch (error) {
        console.error('Error dropping tables:', error);
    }
}

// Create users table
async function createUsersTable() {
    try {
        await asyncQuery(
            `CREATE TABLE IF NOT EXISTS users (user_id INT AUTO_INCREMENT PRIMARY KEY, username VARCHAR(255) NOT NULL UNIQUE, password VARCHAR(255) NOT NULL)`
        );
        console.log('Users table created successfully.');
    } catch (error) {
        console.error('Error creating users table:', error);
    }
}

// Categories table
async function createCategoriesTable() {
    try {
        await asyncQuery(
            `CREATE TABLE IF NOT EXISTS categories (category_id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255) NOT NULL UNIQUE)`
        );
        console.log('Categories table created successfully.');
    } catch (error) {
        console.error('Error creating categories table:', error);
    }
}

// Tasks table
async function createTasksTable() {
    try {
        await asyncQuery(
            `CREATE TABLE IF NOT EXISTS tasks (task_id INT AUTO_INCREMENT PRIMARY KEY, created_by_user_id INT NOT NULL, category_id INT NOT NULL, description TEXT NOT NULL, completed BOOLEAN DEFAULT FALSE, completed_at TIMESTAMP, completed_by_user_id INT, FOREIGN KEY (created_by_user_id) REFERENCES users(user_id), FOREIGN KEY (category_id) REFERENCES categories(category_id), FOREIGN KEY (completed_by_user_id) REFERENCES users(user_id))`
        );
        console.log('Tasks table created successfully.');
    } catch (error) {
        console.error('Error creating tasks table:', error);
    }
}

// Run it all!
(async () => {
    try {
        // Connect
        await dbConnect(fastify);

        // Drop tables
        await dropTables();

        // Create tables
        await createUsersTable();
        await createCategoriesTable();
        await createTasksTable();

        console.log('All done.');
    } catch (error) {
        console.error('Error during installation:', error);
    } finally {
        await fastify.mysql.pool.end();
        console.log('Database connection closed.');
    }
})();
