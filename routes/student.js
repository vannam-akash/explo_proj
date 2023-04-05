const express = require('express');
const router = express.Router();

const controllers = require('../controllers/student');

router.route('/attendance')
    .get(controllers.renderAttendanceForm)
    .post(controllers.markAttendance);

router.route('/verify/:x')
    .get(controllers.verify);

module.exports = router;


