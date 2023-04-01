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
  class: {
    type: String
    //ref: 'Class'
  },
  att:[{
      type:Schema.Types.ObjectId,
      ref:'Student' 
  }]
});

const Professor = mongoose.model('Professor', professorSchema);

module.exports = Professor;
