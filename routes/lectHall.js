const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const app = express();

const Professor = require('../models/professor');
const LectureHall = require('../models/lectHall');

router.route('/')
    .get(async(req,res)=>{  
        const lts = await LectureHall.find({});
        //console.log(req.session);
        let profID = req.session.profId || null;
        if(profID)profID=new mongoose.Types.ObjectId(profID);
        console.log(profID);
        let prof_=null;
        if(profID) {prof_ = await Professor.findById(profID);}
        console.log("start",prof_,"end");
        res.render('lectHalls/index',{lts,prof_});
    });



router.route('/:lid/prof/:profid')
    .put(async(req,res)=>{
        const {lid,profid} = req.params;
        //profid=new mongoose.Types.ObjectId(profid);
        const prof_ = await Professor.findById(profid);
        //console.log(lid);
        const lt = await LectureHall.findById(lid);
        lt.occupiedBy = prof_.name;
        lt.class = prof_.class;
        lt.status = "Occupied";
        await lt.save();
        
        console.log("start",prof_,"end");
        res.redirect(`/lectHalls/prof/${profid}`);
    });

router.route('/prof/:profid')
    .get(async(req,res)=>{
        const {profid} = req.params;
        //profid=new mongoose.Types.ObjectId(profid);
        const prof_ = await Professor.findById(profid);
        const lts = await LectureHall.find({});
        res.render('lectHalls/index',{lts,prof_});
    });






module.exports = router;