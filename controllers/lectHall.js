const catchAsync = require('../utility/catchAsync');

// Requiring professor model and lecture hall models
const Professor = require('../models/professor');
const LectureHall = require('../models/lectHall');

module.exports = {
    renderLt: catchAsync(async (req, res) => {
        const lts = await LectureHall.find();
        let profID = req.session.profId || null;
        let prof = null;
        if (profID) { prof = await Professor.findById(profID).populate('attlogs.attlog'); }
        res.render('lectHalls/index', { lts, prof});
    }),
    bookLt: catchAsync(async (req, res) => {
        const { lid, profid } = req.params;
        const prof = await Professor.findById(profid);
        const lt = await LectureHall.findById(lid);
        lt.occupiedBy = prof.name;
        lt.class = prof.class;
        lt.status = "Occupied";
        let t = new Date();
        let hr = t.getHours();
        lt.classTime = `${(hr + 1) % 12} - ${(hr + 2) % 12}`;
        prof.isTakingClass = true;
        await lt.save();
        await prof.save();
        res.redirect(`/lectHalls/prof/${profid}`);
    }),
    renderLtProf: catchAsync(async (req, res) => {
        const { profid } = req.params;
        const prof = await Professor.findById(profid);
        const lts = await LectureHall.find();
        res.render('lectHalls/index', { lts, prof });
    })
}
