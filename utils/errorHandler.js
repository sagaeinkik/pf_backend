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

// Check if empty, null, undefined, whitespace etc
exports.checkEmpty = (val, fieldName) => {
    if (
        val === null ||
        val === undefined ||
        (typeof val === 'string' && val.trim() === '') ||
        val === ''
    ) {
        return {
            valid: false,
            error: exports.createError('Bad request', 400, `${fieldName} is a mandatory field.`),
        };
    } else {
        return { valid: true };
    }
};

// Validate fields based on an array of validation results
exports.validateFields = (reply, validation) => {
    //Loop through array
    for (const result of validation) {
        // Return first encountered error
        if (!result.valid) {
            return reply.code(result.error.https_response.code).send(result.error);
        }
    }
    return null;
};

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
