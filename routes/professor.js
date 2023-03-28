const express = require('express');
const router = express.Router();
const app = express();

// Requiring controlles
const controllers = require('../controllers/professor');

router.route('/login')
    .get(controllers.renderLoginForm)
    .post(controllers.login);

router.route('/:id')
    .get(controllers.showDashboard);

module.exports = router;