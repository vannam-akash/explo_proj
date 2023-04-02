const express = require('express');


// Requiring Student model
const Student = require('../models/student');
const Professor = require('../models/professor');
const LectureHall = require('../models/lectHall');
const Passcode = require('../models/passcode');

function catchAsync(fn) {
    return function (req, res, next) {
        fn(req, res, next).catch(e => next(e))
    }
}
    module.exports = {
        //res.render('students/attendance',{passcodes});
         renderAttendanceForm :catchAsync(async(req,res,next) => {
            res.render('students/attendance');

        }),

         verify:catchAsync(async(req,res,next) => {
            const {x}=req.params;
            console.log("Verify route hit");
            // passcodes.func(passcodes.passes);
            if(x==1){const pg4=await Passcode.findOne({name:"pass4"});
            const pg5=await Passcode.findOne({name:"pass5"});
            const pg6=await Passcode.findOne({name:"pass6"});
            const pg7=await Passcode.findOne({name:"pass7"});

            pg4.pass="4"+Math.floor(Math.random()*1000+1);
            pg5.pass="5"+Math.floor(Math.random()*1000+1);
            pg6.pass="6"+Math.floor(Math.random()*1000+1);
            pg7.pass="7"+Math.floor(Math.random()*1000+1);

            await pg4.save();
            await pg5.save();
            await pg6.save();
            await pg7.save();}


            
            if(x.toString()=="1"){
                res.send("Attendance Successfully Marked");
                
            }
            else res.send("Attendance Marking Failed");
        }),

         markAttendance : catchAsync(async(req,res,next)=>{

            const {rollNo, password, passcode} = req.body;
            //const codes = await Passcode.find({});
            const pg4=await Passcode.findOne({name:"pass4"});
            const pg5=await Passcode.findOne({name:"pass5"});
            const pg6=await Passcode.findOne({name:"pass6"});
            const pg7=await Passcode.findOne({name:"pass7"});
            
            const stud = await Student.findOne({rollNo,password});
            if(!stud) throw new Error({message:"Sorry could not find student!!"});
            req.session.studId = stud._id;
            console.log(passcode);
            console.log(pg5," ",pg5.pass);
             if(passcode[0].toString()=="4"){
                let x;
                if(pg4.pass.toString()==passcode.toString()){
                    console.log("4 hit");
                     //const name = g4.occupiedBy;
                     
                     const hall= await LectureHall.findOne({name:'G4'});
                     console.log(hall);
                     const prof = await Professor.findOne({name:""+hall.occupiedBy});
                     if(prof){prof.att.push(stud._id);await prof.save(); x=1;}
                     else x=0;
                    
                     res.redirect(`/students/verify/${x}`);
                    //  next();
                 }else x=0;res.redirect(`/students/verify/${x}`);
             }
             else if(passcode[0].toString()=="5"){let x;
                if(pg5.pass.toString()==passcode.toString()){
                    console.log("5 hit");
                     //const name = g4.occupiedBy;
                     
                     const hall= await LectureHall.findOne({name:'G5'});
                     console.log(hall);
                     const prof = await Professor.findOne({name:""+hall.occupiedBy});
                     if(prof){prof.att.push(stud._id);await prof.save(); x=1;}
                     else x=0;
                     
                      res.redirect(`/students/verify/${x}`);
                      next();
                 }else x=0;res.redirect(`/students/verify/${x}`);
             }
             else if(passcode[0].toString()=="6"){let x;
                if(pg6.pass.toString()==passcode.toString()){
                    console.log("6 hit");
                     //const name = g4.occupiedBy;
                     
                     const hall= await LectureHall.findOne({name:'G6'});
                     console.log(hall);
                     const prof = await Professor.findOne({name:""+hall.occupiedBy});
                     if(prof){prof.att.push(stud._id);await prof.save(); x=1;}
                     else x=0;
                     
                      res.redirect(`/students/verify/${x}`);
                    //   next();
                 }else x=0; 
                 res.redirect(`/students/verify/${x}`);
             }
             else if(passcode[0].toString()=="7"){let x;
                if(pg7.pass.toString()==passcode.toString()){
                    console.log("7 hit");
                     //const name = g4.occupiedBy;
                     
                     const hall= await LectureHall.findOne({name:'G7'});
                     console.log(hall);
                     const prof = await Professor.findOne({name:""+hall.occupiedBy});
                     if(prof){prof.att.push(stud._id);await prof.save(); x=1;}
                     else x=0;
                    
                      res.redirect(`/students/verify/${x}`);
                    //   next();
                 } else x=0;
                 res.redirect(`/students/verify/${x}`);
             }
             else{
               let x=0;
               return res.redirect(`/students/verify/${x}`);
             }
            
            console.log(passcode[0],"after");
            console.log(stud);
            console.log(req.body);
          

            
            // let codeGen=catchAsync(async(req,res,next) => {
            //     console.log("codeGen route hit");
            //     console.log(codeGen());
            //     codeGen();
            // });
           
            
        })
        
            
        // return {
        //     renderAttendanceForm:renderAttendanceForm,
        //     verify:verify,
        //     markAttendance:markAttendance
        // };

   };
    