const mongoose = require('mongoose');
const { Schema } = mongoose;

const studentSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  // email: {
  //   type: String,
  //   // required: true,
  //   unique: true
  // },
  rollNo: {
    type: Number,
    required: true,
    // unique: true
  },
  password: {
    type: String,
    required: true
  },
  classes: [{
    type: Schema.Types.ObjectId,
    ref: 'Class'
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