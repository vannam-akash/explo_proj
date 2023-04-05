const express = require('express');
const router = express.Router();

// Requiring controlles
const controllers = require('../controllers/professor');
const validateProfLogin = require('../utility/validation');


router.route('/login')
    .get(controllers.renderLoginForm)
    .post(validateProfLogin, controllers.login);

router.route('/logout')
    .get(controllers.logout);

module.exports = router;