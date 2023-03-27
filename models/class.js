const mongoose = require('mongoose');
const { Schema } = mongoose;

const classSchema = new Schema({
  courseCode: {
    type: String,
    required: true
  },
  professor: {
    // type: Schema.Types.ObjectId,
    // ref: 'Professor',
    type:String,
    required: true
  },
  semester:{
    type:Number,
    required: true
  },
  students: [{
    type: Schema.Types.ObjectId,
    ref: 'Student'
  }],
  attendance: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Attendance' 
  }]
  // other fields as required
});

const Class = mongoose.model('Class', classSchema);

module.exports = Class;
