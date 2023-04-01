const mongoose = require('mongoose');
const { Schema } = mongoose;


const Professor = require('../models/professor');
const LectureHall = require('../models/lectHall');

const studentSchema = new Schema({
  name: {
    type: String
  },
  rollNo: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true
<<<<<<< HEAD
  },
  classes: [{
    type: Schema.Types.ObjectId,
    ref: 'Professor'
  }],
=======
  }
>>>>>>> 016a8b206b72e5c8533bd9a752420acd4289c776
});

if(!mongoose.models.Student){
  const student = mongoose.model('Student',studentSchema);
  module.exports = student;
}
else{
  module.exports = mongoose.models.Student;
}