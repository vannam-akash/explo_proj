const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const app = express();

const Professor = require('../models/professor');
const LectureHall = require('../models/lectHall');

router.route('/')
    .get(async(req,res)=>{  
        const lts = await LectureHall.find({});
        
        for(lt of lts){
            const t1=new Date(Date.now());
            if(lt.occupiedBy && ((t1.getTime()-lt.bookTime.getTime())/60000>60 || (t1.getMinutes()>55 && t1.getHours()>lt.bookTime.getHours()))){
                lt.occupiedBy=null;
                lt.bookTime=new Date(Date.now());
                lt.status="Available";
                await lt.save();
            }
        }
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
        prof_.att=[];
        await prof_.save();
        lt.occupiedBy = prof_.name;
        lt.class = prof_.class;
        lt.status = "Occupied";
        lt.bookTime = new Date(Date.now());
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