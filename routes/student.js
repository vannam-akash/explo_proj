const express = require('express');
const router = express.Router();
const app = express();
const app_ =require('../app.js');

const controllers = require('../controllers/student');

router.route('/attendance')
    .get(controllers.renderAttendanceForm)
    
    router.route('/verify/:x')
    .get(controllers.verify)
    
    router.route('/attendance')
    .post(controllers.markAttendance);
    

 module.exports= router;
   
    
   