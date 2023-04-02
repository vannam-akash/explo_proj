const express = require('express');
const AppError = require('../utility/appError');

// Requiring Student model
const Professor = require('../models/professor');

function catchAsync(fn) {
    return function (req, res, next) {
        fn(req, res, next).catch(e => next(e))
    }
}

module.exports = {
    renderLoginForm: catchAsync(async (req, res, next) => {
        if (req.session.profId == null) res.render('professor/login');
        else res.redirect('/lectHalls');
    }),
    login: catchAsync(async (req, res, next) => {
        const { uid, password } = req.body;
        const prof = await Professor.findOne({ uid, password });
        console.log("Professor details.....", uid, password, prof)
        if (!prof) throw new AppError("Incorrect Login ID or Password!!!", 404);
        req.session.profId = prof._id;
        res.redirect('/lectHalls');
    }),
    logout: catchAsync(async (req, res, next) => {
        req.session.profId = null;
        res.redirect('/lectHalls');
    })
}
