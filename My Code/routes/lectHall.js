const express = require('express');
const router = express.Router();
const app = express();

const LectureHall = require('../models/LectHall');

router.route('/')
    .get(async(req,res)=>{
        const lts = await LectureHall.find({});
        res.render('lectHalls/index',{lts});
    });

module.exports = router;