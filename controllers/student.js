const express = require('express');
const app_ =require('../app.js');

// Requiring Student model
const Student = require('../models/student');
const Professor = require('../models/professor');
const LectureHall = require('../models/lectHall');

function catchAsync(fn) {
    return function (req, res, next) {
        fn(req, res, next).catch(e => next(e))
    }
}


    module.exports = function(passcodes){
        //res.render('students/attendance',{passcodes});
        let renderAttendanceForm =catchAsync(async(req,res,next) => {
            res.render('students/attendance',{passcodes});

        });

        let verify=catchAsync(async(req,res,next) => {
            console.log("Verify route hit");
            passcodes.func(passcodes.passes);

            const {x}=req.params;
            if(x.toString()=="1"){
                res.send("Attendance Successfully Marked");
                
            }
            else res.send("Attendance Marking Failed");
        });

        let markAttendance = catchAsync(async(req,res,next)=>{

            const {rollNo, password, passcode} = req.body;
           
            const stud = await Student.findOne({rollNo,password});
            if(!stud) throw new Error({message:"Sorry could not find student!!"});
            req.session.studId = stud._id;
            console.log(passcode[0]+"","before");
            console.log(passcodes);

             if(passcode[0].toString()=="4"){
                if(passcodes.passes.pg4.toString()==passcode.toString()){
                    console.log("4 hit");
                     //const name = g4.occupiedBy;
                     let x;
                     const hall= await LectureHall.findOne({name:'G4'});
                     console.log(hall);
                     const prof = await Professor.findOne({name:""+hall.occupiedBy});
                     if(prof){prof.att.push(stud._id);await prof.save(); x=1;}
                     else x=0;
                    
                     res.redirect(`/students/verify/${x}`);
                     next();
                 }
             }
             else if(passcode[0].toString()=="5"){
                if(passcodes.passes.pg5.toString()==passcode.toString()){
                    console.log("5 hit");
                     //const name = g4.occupiedBy;
                     let x;
                     const hall= await LectureHall.findOne({name:'G5'});
                     console.log(hall);
                     const prof = await Professor.findOne({name:""+hall.occupiedBy});
                     if(prof){prof.att.push(stud._id);await prof.save(); x=1;}
                     else x=0;
                     
                      res.redirect(`/students/verify/${x}`);
                      next();
                 }
             }
             else if(passcode[0].toString()=="6"){
                if(passcodes.passes.pg6.toString()==passcode.toString()){
                    console.log("6 hit");
                     //const name = g4.occupiedBy;
                     let x;
                     const hall= await LectureHall.findOne({name:'G6'});
                     console.log(hall);
                     const prof = await Professor.findOne({name:""+hall.occupiedBy});
                     if(prof){prof.att.push(stud._id);await prof.save(); x=1;}
                     else x=0;
                     
                      res.redirect(`/students/verify/${x}`);
                      next();
                 }
             }
             else if(passcode[0].toString()=="7"){
                if(passcodes.passes.pg7.toString()==passcode.toString()){
                    console.log("7 hit");
                     //const name = g4.occupiedBy;
                     let x;
                     const hall= await LectureHall.findOne({name:'G7'});
                     console.log(hall);
                     const prof = await Professor.findOne({name:""+hall.occupiedBy});
                     if(prof){prof.att.push(stud._id);await prof.save(); x=1;}
                     else x=0;
                    
                      res.redirect(`/students/verify/${x}`);
                      next();
                 }
             }
             else{
               let x=0;
               return res.redirect(`/students/verify/${x}`);
             }
            /* switch(passcode[0]){
                case '4':
                         //break;
    
    
                case '5' :if(passcodes.pg4.toString()==passcode.toString()){
                    //const name = g4.occupiedBy;
                    console.log("5 hit");
                    let x;
                    const hall= await LectureHall.findOne({name:'G5'});
                    console.log(hall);
                    const prof = await Professor.findOne({name:""+hall.occupiedBy});
                    if(prof){prof.att.push(stud._id);await prof.save(); x=1;}
                    else x=0;
                    
                    return res.redirect(`/students/verify/${x}`);
                }
                break;
                
    
                case '6':if(passcodes.pg4.toString()==passcode.toString()){
                    //const name = g4.occupiedBy;
                    console.log("6 hit");
                    let x;
                    const hall= await LectureHall.findOne({name:'G6'});
                    console.log(hall);
                    const prof = await Professor.findOne({name:""+hall.occupiedBy});
                    if(prof){prof.att.push(stud._id);await prof.save(); x=1;}
                    else x=0;
                    
                    return res.redirect(`/students/verify/${x}`);
                    }
                    break;

    
    
                case '7':if(passcodes.pg4.toString()==passcode.toString()){
                    //const name = g4.occupiedBy;
                    console.log("7 hit");
                    let x;
                    const hall= await LectureHall.findOne({name:'G7'});
                    console.log(hall);
                    const prof = await Professor.findOne({name:""+hall.occupiedBy});
                    if(prof){prof.att.push(stud._id);await prof.save(); x=1;}
                    else x=0;
                    
                    return res.redirect(`/students/verify/${x}`);
                    }
                    break;

    
                default: {const x=0;
                        console.log("def");
                         return res.redirect(`/students/verify/${x}`);}
                            
            }
            */

            
            console.log(passcode[0],"after");
            console.log(stud);
            console.log(req.body);
            //res.send(stud);
    
            // const passcodes = {
            //     pg4:"4"+Math.floor(Math.random()*1000+1),
            //     pg5:"5"+Math.floor(Math.random()*1000+1),
            //     pg6:"6"+Math.floor(Math.random()*1000+1),
            //     pg7:"7"+Math.floor(Math.random()*1000+1)
            // }
            

            
            let codeGen=catchAsync(async(req,res,next) => {
                console.log("codeGen route hit");
                console.log(codeGen());
                codeGen();
            });
           
            
        });
        
            
        return {
            renderAttendanceForm:renderAttendanceForm,
            verify:verify,
            markAttendance:markAttendance
        };

   };
    