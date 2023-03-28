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
  email: {
    type: String,
    // required: true,
    // unique: true
  },
  phone: {
    type: String,
    // required: true,
    // unique: true
  },
  classes: [{
    type: Schema.Types.ObjectId,
    ref: 'Class'
  }]
  // other fields as required
});

const Professor = mongoose.model('Professor', professorSchema);

module.exports = Professor;
