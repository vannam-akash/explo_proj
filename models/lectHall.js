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
  occupiedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Professor'
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