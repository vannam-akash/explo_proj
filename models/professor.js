const mongoose = require('mongoose');
const { Schema } = mongoose;

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
    type: String,
    ref: 'Class'
  }
});

const Professor = mongoose.model('Professor', professorSchema);

module.exports = Professor;
