// Requiring models
const Student = require('../models/student');
const Professor = require('../models/professor');
const LectureHall = require('../models/lectHall');
const Passcode = require('../models/passcode');


function validatedIp(arr,ip){
    // if(arr.includes(ip)) return false;
    // else return true;
    return true;
}

// async function preventProxy(obj){
//     let {prof,x,req} = obj;
//     console.log(prof,x);
//     const parseIp = (req) =>
//     req.headers['x-forwarded-for']?.split(',').shift()
//     || req.socket?.remoteAddress
    
//     const reqIp = parseIp(req);
//     console.log("IP inside the hall is :",reqIp);
//     if(!validatedIp(prof.ip,reqIp)){
//         console.log("Didn't allow proxy!!!")
//         x=0;
//     }
//     else{
//         console.log("Pushing the ip in the array!!")
//         prof.ip.push(reqIp.toString());
//         await prof.save();
//     }
//     console.log(prof,x);
//     return x;
// }

function getDistance(point1, point2) {
    const R = 6371; // Earth's radius in kilometers
    const lat1 = toRadians(point1.lat);
    const lat2 = toRadians(point2.lat);
    const latDiff = toRadians(point2.lat - point1.lat);
    const lonDiff = toRadians(point2.lon - point1.lon);
  
    const a =
      Math.sin(latDiff / 2) * Math.sin(latDiff / 2) +
      Math.cos(lat1) * Math.cos(lat2) * Math.sin(lonDiff / 2) * Math.sin(lonDiff / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  
    return R * c;
  }
  
  function toRadians(degrees) {
    return degrees * (Math.PI / 180);
  }

const g4={lat:25.262618307398068, lon:82.99195307752026};
const g5={lat:25.262429775065673, lon:82.99211496156191};
const g6={lat:25.262293231167845, lon:82.99217598068392};
const g7={lat:25.262193134497135, lon:82.99221779381561};

const d_g4g5= 0.021597932308693058;  
const dg2={lat:25.2640618, long:82.9846917};



/*
function catchAsync(fn) {
    return function (req, res, next) {
        fn(req, res, next).catch(e => next(e))
    }
}
    module.exports = {
        //res.render('students/attendance',{passcodes});
         renderAttendanceForm :catchAsync(async(req,res,next) => {
            res.render('students/attendance');

*/

// Requiring files
const AppError = require('../utility/appError');
const catchAsync = require('../utility/catchAsync');

module.exports = {
    renderAttendanceForm: catchAsync(async (req, res, next) => {
        res.render('students/attendance');
    }),

    verify: catchAsync(async (req, res, next) => {
        const { x } = req.params;
        console.log("Verify route hit");
        // passcodes.func(passcodes.passes);
        if (x == 1) {
            const pg4 = await Passcode.findOne({ name: "pass4" });
            const pg5 = await Passcode.findOne({ name: "pass5" });
            const pg6 = await Passcode.findOne({ name: "pass6" });
            const pg7 = await Passcode.findOne({ name: "pass7" });

            pg4.pass = "4" + Math.floor(Math.random() * 1000 + 1);
            pg5.pass = "5" + Math.floor(Math.random() * 1000 + 1);
            pg6.pass = "6" + Math.floor(Math.random() * 1000 + 1);
            pg7.pass = "7" + Math.floor(Math.random() * 1000 + 1);

            await pg4.save();
            await pg5.save();
            await pg6.save();
            await pg7.save();
        }

        if (x.toString() == "1") {
            // const parseIp = (req) =>
            // req.headers['x-forwarded-for']?.split(',').shift()
            // || req.socket?.remoteAddress
            
            // const reqIp = parseIp(req);
            // console.log("IP",parseIp(req));
            return res.render("students/attendanceSuccess");
        }
        else {
            let err = new AppError("Attendance Marking Failed!!");
            next(err);
        }
    }),

    markAttendance: catchAsync(async (req, res, next) => {

      

            const {rollNo, password, passcode,latitude,longitude} = req.body;
            console.log(req.body);
            const pg4=await Passcode.findOne({name:"pass4"});
            const pg5=await Passcode.findOne({name:"pass5"});
            const pg6=await Passcode.findOne({name:"pass6"});
            const pg7=await Passcode.findOne({name:"pass7"});

            if(!(latitude && longitude)){let x=0;console.log("no location");return res.redirect(`/students/verify/${x}`);}
            
            
            const stud = await Student.findOne({rollNo,password});
            if(!stud) throw new Error({message:"Sorry could not find student!!"});
            req.session.studId = stud._id;
            console.log(passcode);
            console.log(pg6," ",pg6.pass);
             if(passcode[0].toString()=="4"){
                let x;
                if(getDistance(g4,{lat:latitude,lon:longitude})>2.5*d_g4g5){
                    x=0;
                    return res.redirect(`/students/verify/${x}`);
                }
                if(pg4.pass.toString()==passcode.toString()){
                    console.log("4 hit");
                     //const name = g4.occupiedBy;
                     
                     const hall= await LectureHall.findOne({name:'G4'});
                     console.log(hall);
                     const prof = await Professor.findOne({name:""+hall.occupiedBy});
                     if(prof){prof.att.push(stud._id);await prof.save(); x=1;
                            //preventProxy({prof,x});
                        }
                    //  Code to prevent proxy
                    if(prof){
                        const parseIp = (req) =>
                        req.headers['x-forwarded-for']?.split(',').shift()
                        || req.socket?.remoteAddress
                        
                        const reqIp = parseIp(req);
                        console.log("IP inside the hall is :",reqIp);
                        if(!validatedIp(prof.ip,reqIp)){
                            console.log("Didn't allow proxy!!!")
                            x=0;
                        }
                        else{
                            console.log("Pushing the ip in the array!!")
                            prof.ip.push(reqIp.toString());
                            await prof.save();
                            x=1;
                        }
                     }
                     else x=0;
                    
                     res.redirect(`/students/verify/${x}`);
                    //  next();
                 }else x=0;res.redirect(`/students/verify/${x}`);
             }
             else if(passcode[0].toString()=="5"){let x;
                if(pg5.pass.toString()==passcode.toString()){
                    console.log("5 hit");
                     //const name = g4.occupiedBy;
                     console.log(getDistance(g5,{lat:latitude,lon:longitude}));
                     if(getDistance(g5,{lat:latitude,lon:longitude})>2.5*d_g4g5){
                        x=0;
                        return res.redirect(`/students/verify/${x}`);
                    }
                     
                     const hall= await LectureHall.findOne({name:'G5'});
                     console.log(hall);
                     const prof = await Professor.findOne({name:""+hall.occupiedBy});
                     if(prof){prof.att.push(stud._id);await prof.save(); x=1;
                            // preventProxy({prof,x});
                        }
                    //  Code to prevent proxy
                    if(prof){
                        const parseIp = (req) =>
                        req.headers['x-forwarded-for']?.split(',').shift()
                        || req.socket?.remoteAddress
                        
                        const reqIp = parseIp(req);
                        console.log("IP inside the hall is :",reqIp);
                        if(!validatedIp(prof.ip,reqIp)){
                            console.log("Didn't allow proxy!!!")
                            x=0;
                        }
                        else{
                            console.log("Pushing the ip in the array!!")
                            prof.ip.push(reqIp.toString());
                            await prof.save();
                            x=1;
                        }
                     }
                     else x=0;
                      res.redirect(`/students/verify/${x}`);
                      next();
                 }else x=0;res.redirect(`/students/verify/${x}`);
             }
             else if(passcode[0].toString()=="6"){let x;
                if(pg6.pass.toString()==passcode.toString()){
                    console.log("6 hit");
                     //const name = g4.occupiedBy;
                     if(getDistance(g6,{lat:latitude,lon:longitude})>2.5*d_g4g5){
                        x=0;
                        return res.redirect(`/students/verify/${x}`);
                    }
                     
                     const hall= await LectureHall.findOne({name:'G6'});
                     console.log(hall);
                     const prof = await Professor.findOne({name:""+hall.occupiedBy});
                     if(prof){prof.att.push(stud._id);await prof.save(); x=1;
                            //preventProxy({prof,x});
                        }
                    //  Code to prevent proxy
                    if(prof){
                        const parseIp = (req) =>
                        req.headers['x-forwarded-for']?.split(',').shift()
                        || req.socket?.remoteAddress
                        
                        const reqIp = parseIp(req);
                        console.log("IP inside the hall is :",reqIp);
                        if(!validatedIp(prof.ip,reqIp)){
                            console.log("Didn't allow proxy!!!")
                            x=0;
                        }
                        else{
                            console.log("Pushing the ip in the array!!")
                            prof.ip.push(reqIp.toString());
                            await prof.save();
                            x=1;
                        }
                     }
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
                     if(getDistance(g4,{lat:latitude,lon:longitude})>1000*d_g4g5){
                        console.log('caught u');
                        x=0;
                        return res.redirect(`/students/verify/${x}`);
                    }
                     const hall= await LectureHall.findOne({name:'G7'});
                     console.log(hall);
                     const prof = await Professor.findOne({name:""+hall.occupiedBy});
                     if(prof){prof.att.push(stud._id);await prof.save(); x=1;}
                    //  Code to prevent proxy
                     if(prof){
                        const parseIp = (req) =>
                        req.headers['x-forwarded-for']?.split(',').shift()
                        || req.socket?.remoteAddress
                        
                        const reqIp = parseIp(req);
                        console.log("IP inside the hall is :",reqIp);
                        if(!validatedIp(prof.ip,reqIp)){
                            console.log("Didn't allow proxy!!!")
                            x=0;
                        }
                        else{
                            console.log("Pushing the ip in the array!!")
                            prof.ip.push(reqIp.toString());
                            await prof.save();
                            x=1;
                        }
                     }
                     else x=0;
                         console.log("the value of x is" ,x)
                      return res.redirect(`/students/verify/${x}`);
                    //   next();
                 } else x=0;
                 return res.redirect(`/students/verify/${x}`);
             }
             else{
               let x=0;
               return res.redirect(`/students/verify/${x}`);
             }
            
            // console.log(passcode[0],"after");
            // console.log(stud);
            // console.log(req.body);
            })
        };
