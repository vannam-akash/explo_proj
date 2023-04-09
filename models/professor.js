const mongoose = require('mongoose');
const { Schema } = mongoose;



const AttlogSchema = new Schema({
  when: {
    type: Date,
    required: true
  },
  attlog: [{
    type: Schema.Types.ObjectId,
    ref: 'Student'
    
  }],
});

const professorSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  uid: {
    type: String,
    required: true
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
    type: String,
  },
  att: [{
    type: Schema.Types.ObjectId,
    ref: 'Student'
  }],
  attlogs: [{
    type: AttlogSchema
  }],
  ip:[{
    type:String
  }]
});

if (!mongoose.models.Professor) {
  const professor = mongoose.model('Professor', professorSchema);
  module.exports = professor;
}
else {
  module.exports = mongoose.models.Professor;
}
