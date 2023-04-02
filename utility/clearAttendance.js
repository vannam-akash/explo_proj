// Requiring models
const Professor = require('../models/professor');

async function clearAttendance(){

  const prof=await Professor.find({});
  for(x of prof){
    
    x.att=[];
    console.log(x);
    await x.save();
  }
  
}
  
module.exports = clearAttendance;