const {profSchema} = require('../joiSchemas/schemas');

const validateProfLogin = (req, res, next) => {
    const { error } = profSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } 
    else {
        next();
    }
}

module.exports = validateProfLogin;