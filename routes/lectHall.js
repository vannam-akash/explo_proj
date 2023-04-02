const express = require('express');
const router = express.Router();

const controllers = require('../controllers/lectHall')

router.route('/')
    .get(controllers.renderLt);

router.route('/:lid/prof/:profid')
    .put(controllers.bookLt);

router.route('/prof/:profid')
    .get(controllers.renderLtProf);
module.exports = router;