const express = require('express');
const router = express.Router();
const app = express();

// Requiring controlles
const controllers = require('../controllers/professor');

router.route('/login')
    .get(controllers.renderLoginForm)
    .post(controllers.login);

router.route('/logout')
    .get(controllers.logout);

module.exports = router;