const express = require('express');

// Requiring Student model
const Student = require('../models/student');

function catchAsync(fn) {
    return function (req, res, next) {
        fn(req, res, next).catch(e => next(e))
    }
}

module.exports = {
    renderAttendanceForm :catchAsync(async(req,res,next) => {
        res.render('students/attendance');
    }),
    markAttendance : catchAsync(async(req,res,next)=>{
        const {rollNo, password} = req.body;
        const stud = await Student.findOne({rollNo,password});
        if(!stud) throw new Error({message:"Sorry could not find student!!"});
        req.session.studId = stud._id;
        console.log(stud,req.body);
        res.send(stud);
    }),
}
    