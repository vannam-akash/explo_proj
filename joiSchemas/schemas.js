const joi = require('joi');

const profSchema = joi.object({
    uid: joi.string().required(),
    password: joi.string().required()
});

module.exports = profSchema;