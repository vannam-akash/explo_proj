const mongoose = require('mongoose');
const { Schema } = mongoose;


const Professor = require('../models/professor');
const LectureHall = require('../models/lectHall');

const studentSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  rollNo: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true
  },
  classes: [{
    type: Schema.Types.ObjectId,
    ref: 'Professor'
  }],
});

if(!mongoose.models.Student)
{
  const Student = mongoose.model('Student', studentSchema);
  module.exports = Student;
}
else{
  module.exports = Student;
}