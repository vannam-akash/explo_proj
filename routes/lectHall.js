const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const app = express();

const Professor = require('../models/professor');
const LectureHall = require('../models/lectHall');
const AppError = require('../utility/appError');
const controllers = require('../controllers/lectHall')

router.route('/')
    .get(controllers.renderLt);

router.route('/:lid/prof/:profid')
    .put(controllers.bookLt);

router.route('/prof/:profid')
    .get(controllers.renderLtProf);

router.route('/error')
    .get(controllers.displayError);

module.exports = router;