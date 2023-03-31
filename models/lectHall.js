const mongoose = require('mongoose');

const lectureHallSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['Available', 'Occupied'],
    default: 'Available'
  },
  class: {
    type: String,
  },
  passcode:{
    type: String
  },
  occupiedBy: {
    type: String,
    default:null
  },
  bookTime: {
    type:Date,
    default:Date.now(),
    required:true
  }
});

if(!mongoose.models.LectureHall)
{
  const lectHall = mongoose.model('LectureHall',lectureHallSchema);
  module.exports = lectHall;
}
else{
  module.exports = mongoose.models.LectureHall
}