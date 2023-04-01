const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const app = express();

const Professor = require('../models/professor');
const LectureHall = require('../models/lectHall');

router.route('/')
    .get(async(req,res)=>{  
        const lts = await LectureHall.find();
        let profID = req.session.profId || null;
        let prof=null;
        if(profID) {prof = await Professor.findById(profID);}
        res.render('lectHalls/index',{lts,prof,Professor});
    });

router.route('/:lid/prof/:profid')
    .put(async(req,res)=>{
        const {lid,profid} = req.params;
        const prof = await Professor.findById(profid);
        const lt = await LectureHall.findById(lid);
        lt.occupiedBy = prof.name;
        lt.class = prof.class;
        lt.status = "Occupied";
        let t = new Date();
        let hr = t.getHours();
        lt.classTime = `${(hr+1)%12} - ${(hr+2)%12}`;
        prof.isTakingClass = true;
        await lt.save();        
        await prof.save();
        res.redirect(`/lectHalls/prof/${profid}`);
    });

router.route('/prof/:profid')
    .get(async(req,res)=>{
        const {profid} = req.params;
        const prof= await Professor.findById(profid);
        const lts = await LectureHall.find();
        res.render('lectHalls/index',{lts,prof});
    });

module.exports = router;