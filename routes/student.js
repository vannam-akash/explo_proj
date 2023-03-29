const express = require('express');
const router = express.Router();
const app = express();

// Requiring controlles
const controllers = require('../controllers/student');

router.route('/attendance')
    .get(controllers.renderAttendanceForm)
    .post(controllers.markAttendance);

module.exports = router;