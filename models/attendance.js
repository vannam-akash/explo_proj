const mongoose = require('mongoose');
const { Schema } = mongoose;

const attendanceSchema = new Schema({
  class: {
    type: Schema.Types.ObjectId,
    ref: 'Class',
    required: true
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  status: {
    type: Map,
    of: String
  }
});

const Attendance = mongoose.model('Attendance', attendanceSchema);

module.exports = Attendance;
