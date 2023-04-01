const mongoose = require('mongoose');
const { Schema } = mongoose;

//const Professor = require('../models/professor');
const LectureHall = require('../models/lectHall');
const Student = require('../models/student.js');

const professorSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  uid:{
    type: String,
    required:true
  },
  password: {
    type: String,
    required: true
  },
  isTakingClass: {
    type: Boolean,
    default: false
  },
  class: {
<<<<<<< HEAD
    type: String
    //ref: 'Class'
  },
  att:[{
      type:Schema.Types.ObjectId,
      ref:'Student' 
  }]
=======
    type: String,
  }
>>>>>>> 016a8b206b72e5c8533bd9a752420acd4289c776
});

if(!mongoose.models.Professor)
{
  const professor = mongoose.model('Professor',professorSchema);
  module.exports = professor;
}
else{
  module.exports = mongoose.models.Professor;
}
