const express = require('express');

// Requiring Student model
const Professor = require('../models/professor');

function catchAsync(fn) {
    return function (req, res, next) {
        fn(req, res, next).catch(e => next(e))
    }
}

module.exports = {
    renderLoginForm :catchAsync(async(req,res,next) => {
        res.render('professor/login');
    }),
    login : catchAsync(async(req,res,next)=>{
        const {uid, password} = req.body;
        const prof = await Professor.findOne({uid,password});
        if(!prof) throw new Error({message:"Sorry could not find professor!!"});
        req.session.profId = prof._id;
        res.redirect('/lectHalls');
    }),
    logout: catchAsync(async(req,res,next)=>{
        req.session.profId=null;
        res.redirect('/lectHalls');
    })
}
    