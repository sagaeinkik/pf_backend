'use strict';

const prisma = require('../prisma');
const errs = require('../utils/errorHandler');
const auth = require('../utils/authHandler');

// Base error
let error = errs.createError();

// Find all users
module.exports.getAllUsers = async (request, reply) => {
    error = errs.resetErrors();

    try {
        const users = await prisma.user.findMany({
            include: {
                _count: {
                    select: {
                        createdTasks: true,
                        completedTasks: true,
                    },
                },
            },
        });

        // No users found
        if (!users || users.length === 0) {
            error = errs.createError('Not Found', 404, 'No users found.');
            return reply.code(error.https_response.code).send(error);
        }

        return reply.send(users);
    } catch (err) {
        return reply.code(500).send(err);
    }
};

// Find user by ID
module.exports.getUserById = async (request, reply) => {
    error = errs.resetErrors();
    const { id } = request.params;
    try {
        const user = await prisma.user.findUnique({
            where: {
                user_id: parseInt(id),
            },
            include: {
                _count: {
                    select: {
                        createdTasks: true,
                        completedTasks: true,
                    },
                },
            },
        });

        if (!user) {
            error = errs.createError('Not Found', 404, 'No user found.');
            return reply.code(error.https_response.code).send(error);
        }

        return reply.send(user);
    } catch (error) {
        return reply.code(500).send(error);
    }
};

// Create user
module.exports.registerUser = async (request, reply) => {
    error = errs.resetErrors();

    const { username, password } = request.body; // Validation in Options

    try {
        // Check for existing user
        const existingUser = await prisma.user.findUnique({ where: { username } });

        if (existingUser) {
            error = errs.createError('Conflict', 409, 'Username already in use.');
            return reply.code(error.https_response.code).send(error);
        }

        // Hash password
        const hashedPassword = await auth.hashPassword(password);

        // Create new user
        const newUser = await prisma.user.create({
            data: {
                username: username,
                password: hashedPassword,
            },
        });

        // Create token
        const token = auth.createJWT(newUser.username);

        // Return user without password
        return reply.code(201).send({
            message: 'User registered!',
            newUser: {
                user_id: newUser.user_id,
                username: newUser.username,
            },
            token: token,
        });
    } catch (error) {}
};

// Log in user
module.exports.loginUser = async (request, reply) => {
    error = errs.resetErrors();

    const { username, password } = request.body;

    try {
        // Find user
        const user = await prisma.user.findUnique({
            where: { username },
            include: {
                _count: {
                    select: {
                        createdTasks: true,
                        completedTasks: true,
                    },
                },
            },
        });

        if (!user) {
            error = errs.createError('Unauthorized', 401, 'Invalid username or password.');
            return reply.code(error.https_response.code).send(error);
        }

        // Compare passwords
        const authorized = await auth.comparePasswords(password, user.password);

        if (!authorized) {
            error = errs.createError('Unauthorized', 401, 'Invalid username or password.');
            return reply.code(error.https_response.code).send(error);
        }

        // User exists and password is correct. Create token and return
        const token = auth.createJWT(user.username);

        return reply.send({
            message: 'User logged in successfully!',
            user: {
                id: user.user_id,
                username: user.username,
            },
            token: token,
        });
    } catch (error) {
        return reply.code(500).send(error);
    }
};

// Delete user
module.exports.deleteUser = async (request, reply) => {
    error = errs.resetErrors();
    const { id } = request.params;

    try {
        // Find user
        const user = await prisma.user.findUnique({ where: { user_id: parseInt(id) } });

        if (!user) {
            error = errs.createError('Not Found', 404, 'No user found.');
            return reply.code(error.https_response.code).send(error);
        }

        // Check that user is actually owner of token
        await auth.validateJWT(request, reply);

        if (request.username !== user.username) {
            error = errs.createError(
                'Forbidden',
                403,
                'You are not permitted to perform this action.'
            );
            return reply.code(error.https_response.code).send(error);
        }

        // Username matches, delete user
        await prisma.user.delete({ where: { user_id: parseInt(id) } });

        return reply.send({ message: 'User deleted successfully!' });
    } catch (error) {
        return reply.code(500).send(error);
    }
};
