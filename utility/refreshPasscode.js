// Requiring models
const Passcode = require('../models/passcode');

async function refreshPasscode() {

  const pg4 = await Passcode.findOne({ name: "pass4" });
  const pg5 = await Passcode.findOne({ name: "pass5" });
  const pg6 = await Passcode.findOne({ name: "pass6" });
  const pg7 = await Passcode.findOne({ name: "pass7" });

  pg4.pass = "4" + Math.floor(Math.random() * 1000 + 1);
  pg5.pass = "5" + Math.floor(Math.random() * 1000 + 1);
  pg6.pass = "6" + Math.floor(Math.random() * 1000 + 1);
  pg7.pass = "7" + Math.floor(Math.random() * 1000 + 1);

  await pg4.save();
  await pg5.save();
  await pg6.save();
  await pg7.save();

}

module.exports = refreshPasscode;