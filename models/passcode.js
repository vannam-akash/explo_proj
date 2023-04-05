const mongoose = require('mongoose');
const { Schema } = mongoose;

const passcodeSchema = new Schema({
  name: {
    type: String
  },
  pass: {
    type: String
  }
});

if (!mongoose.models.Passcode) {
  const passcode = mongoose.model('Passcode', passcodeSchema);
  module.exports = passcode;
}
else {
  module.exports = mongoose.models.Passcode;
}
