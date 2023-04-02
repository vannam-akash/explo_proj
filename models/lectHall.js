const mongoose = require('mongoose');

const lectureHallSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  status: {
    type: String,
    enum: ['Available', 'Occupied'],
    default: 'Available'
  },
  class: {
    type: String,
  },
  passcode: {
    type: String
  },
  occupiedBy: {
    type: String,
    default: null
  },
  classTime: {
    type: String,
    default: null
  }
});

if (!mongoose.models.LectureHall) {
  const lectHall = mongoose.model('LectureHall', lectureHallSchema);
  module.exports = lectHall;
}
else {
  module.exports = mongoose.models.LectureHall
}