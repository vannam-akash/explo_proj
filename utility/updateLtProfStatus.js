// Requiring models
const Professor = require('../models/professor');
const LectureHall = require('../models/lectHall');

async function updateLtProfStatus() {
  const lts = await LectureHall.find();

  let t = new Date();
  let min = t.getMinutes();
  let sec = t.getSeconds();
  console.log("Inside update function", min, sec);
  if (min == 50) {
    console.log("inside if statement")
    for (lt of lts) {
      if (lt.occupiedBy) {
        console.log("Updating.......")
        const profName = lt.occupiedBy;
        const prof = await Professor.findOne({ name: profName });
        prof.isTakingClass = false;
        lt.status = "Available";
        lt.class = null;
        lt.occupiedBy = null;
        lt.classTime = null;
        await lt.save();
        await prof.save();
      }
    }
  }
}

module.exports = updateLtProfStatus;