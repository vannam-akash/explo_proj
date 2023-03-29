const express = require('express');
const router = express.Router();
const app = express();

const Professor = require('../models/professor');
const LectureHall = require('../models/lectHall');

router.route('/')
    .get(async(req,res)=>{
        const lts = await LectureHall.find({});
        // console.log(req.session);
        const profID = req.session.profId || null;
        res.render('lectHalls/index',{lts,profID});
    });

router.route('/:lid/prof/:profid')
    .put(async(req,res)=>{
        const {lid,profid} = req.params;
        const prof = await Professor.findById(profid);
        const lt = await LectureHall.findById(lid);
        lt.occupiedBy = prof.name;
        lt.class = prof.class;
        lt.status = "Occupied";
        await lt.save();
        const lts = await LectureHall.find();
        res.render('lectHalls/index',{lts,profID:profid});
    });

module.exports = router;