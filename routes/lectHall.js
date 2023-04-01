const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const app = express();

const Professor = require('../models/professor');
const LectureHall = require('../models/lectHall');

router.route('/')
    .get(async(req,res)=>{  
<<<<<<< HEAD
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
=======
        const lts = await LectureHall.find();
>>>>>>> 016a8b206b72e5c8533bd9a752420acd4289c776
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
<<<<<<< HEAD
        prof_.att=[];
        await prof_.save();
        lt.occupiedBy = prof_.name;
        lt.class = prof_.class;
=======
        lt.occupiedBy = prof.name;
        lt.class = prof.class;
>>>>>>> 016a8b206b72e5c8533bd9a752420acd4289c776
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