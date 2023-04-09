// Requiring models
const Professor = require('../models/professor');

async function clearAttendance() {

  const prof = await Professor.find({});
  for (x of prof) {

    const d2 = new Date();
    const d1 = new Date(d2.getTime() - (60 * 60 * 1000));  
    if(x.att.length)
    x.attlogs.push({"when":d1,"attlog":x.att});
    x.att = [];
    x.ip = [];
    console.log(x);
    await x.save();
  }

}

module.exports = clearAttendance;