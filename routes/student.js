const express = require('express');
const router = express.Router();
const app = express();
const app_ =require('../app.js');

// Requiring controlles
// const controllers = require('../controllers/student')(passcodes);

// router.route('/attendance')
//     .get(controllers.renderAttendanceForm)
    
// router.route('/verify/:x')
//     .get(controllers.verify)
   

// router.route('/attendance')
//    .post(controllers.markAttendance);

// module.exports = router;
//-----------------

 module.exports= (passcodes)=>{
    const controllers = require('../controllers/student')(passcodes);

    router.route('/attendance')
    .get(controllers.renderAttendanceForm)
    
    router.route('/verify/:x')
    .get(controllers.verify)
    
    router.route('/attendance')
    .post(controllers.markAttendance);
    
   

    return router;

 }