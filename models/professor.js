const mongoose = require('mongoose');
const { Schema } = mongoose;

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
  }]
});

if (!mongoose.models.Professor) {
  const professor = mongoose.model('Professor', professorSchema);
  module.exports = professor;
}
else {
  module.exports = mongoose.models.Professor;
}
