const AppError = require('../utility/appError');
const catchAsync = require('../utility/catchAsync');

// Requiring Student model
const Professor = require('../models/professor');

module.exports = {
    renderLoginForm: catchAsync(async (req, res, next) => {
        if (req.session.profId == null) res.render('professor/login');
        else res.redirect('/lectHalls');
    }),
    login: catchAsync(async (req, res, next) => {
        const { uid, password } = req.body;
        const prof = await Professor.findOne({ uid, password });
        if (!prof) throw new AppError("Incorrect Login ID or Password!!!", 404);
        req.session.profId = prof._id;
        res.redirect('/lectHalls');
    }),
    logout: catchAsync(async (req, res, next) => {
        req.session.profId = null;
        res.redirect('/lectHalls'); 
    })
}
