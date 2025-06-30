'use strict';

// Dependencies
require('dotenv').config();
const jwt = require('jsonwebtoken');
const jwtKey = process.env.JWT_SECRET_KEY;
const bcrypt = require('bcrypt');
const errorMessage = require('./errorMessage');

// Create a jwt
module.exports.createJWT = (username) => {
    return jwt.sign({ username }, jwtKey, { expiresIn: 60 * 60 * 3 }); // Expires in 3 hours
};

// Validate a jwt
module.exports.validateJWT = async (request, reply) => {
    let err = errorMessage.createError();

    // Get token from request headers
    const authHeader = request.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    // No header
    if (!authHeader) {
        err = errorMessage.createError('Unauthorized', 401, 'Missing token');
        return reply.code(err.https_response.code).send(err);
    }

    // No token in headers
    if (!token) {
        err = errorMessage.createError('Unauthorized', 401, 'Missing token');
        return reply.code(err.https_response.code).send(err);
    }

    // Compare token with secret key
    jwt.verify(token, jwtKey, (err, user) => {
        if (err) {
            err = errorMessage.createError('Unauthorized', 401, 'Invalid token');
            return reply.code(err.https_response.code).send(err);
        }

        // Valid token, set username in request
        request.username = user.username;
    });
    return;
};

// Hash a password
module.exports.hashPassword = async (password) => {
    try {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    } catch (error) {
        console.error('Error hashing password:', error);
        throw new Error('Failed to hash password');
    }
};

// Compare passwords
module.exports.comparePasswords = async (password, hashedPassword) => {
    try {
        const authorized = await bcrypt.compare(password, hashedPassword);
        return authorized; // Returns true or false based on comparison
    } catch (error) {
        console.error('Error comparing passwords:', error);
        throw new Error('Failed to compare passwords');
    }
};
