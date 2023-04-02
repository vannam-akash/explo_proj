const AppError = require('../utility/appError');

const profSchema = require('../joiSchemas/schemas');

const validateProfLogin = (req, res, next) => {
    const { error } = profSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new AppError(msg, 400)
    }
    else {
        next();
    }
}

module.exports = validateProfLogin;