const mongoose = require('mongoose');
const { Schema } = mongoose;

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
  }
});

if (!mongoose.models.Student) {
  const student = mongoose.model('Student', studentSchema);
  module.exports = student;
}
else {
  module.exports = mongoose.models.Student;
}