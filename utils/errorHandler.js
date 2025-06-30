'use strict';

// Create error object
exports.createError = (httpsmessage = '', code = '', message = '') => ({
    https_response: {
        message: httpsmessage,
        code: code,
    },
    message: message,
});

// Reset errors to empty
exports.resetErrors = () => exports.createError();

//Fastify error mapping
module.exports.errorMapping = (error, request, reply) => {
    if (error.validation) {
        // Remove body prefix from error messages
        const messages = error.validation.map((err) => err.message.replace(/^body\./, ' '));
        reply.status(400).send({ statusCode: 400, error: 'Bad Request', messages: messages });
    } else {
        reply.status(error.statusCode || 500).send(error);
    }
};
