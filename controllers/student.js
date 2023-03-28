const express = require('express');

// Requiring Student model
const Student = require('../models/student');

function catchAsync(fn) {
    return function (req, res, next) {
        fn(req, res, next).catch(e => next(e))
    }
}

module.exports = {
    renderLoginForm :catchAsync(async(req,res,next) => {
        res.render('students/login');
    }),
    login : catchAsync(async(req,res,next)=>{
        const {rollNo, password} = req.body;
        const stud = await Student.findOne({rollNo,password});
        if(!stud) throw new Error({message:"Sorry could not find student!!"});
        req.session.studentId = stud._id;
        res.redirect(`/students/${stud._id}`);
    }),
    showDashboard: catchAsync(async(req,res,next)=>{
        const studId = req.session.studentId;
        const stud = await Student.findById(studId);
        res.send(stud);
        // res.render('error');
    })
}
    