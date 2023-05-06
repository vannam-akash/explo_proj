// Setting up env file
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
  }
  const uri = process.env.MONGO_URL;

const mongoose = require('mongoose');
const LectureHall = require('../models/lectHall');

// Connect to MongoDB
main().catch(err => console.log('There was an error connecting to mongoose :(', err));

async function main() {
    await mongoose.connect(uri,{useNewUrlParser:true});
    console.log('Sucessfully connected to mongoose!')


    await LectureHall.deleteMany({});

    let g4 = new LectureHall({
        name: "G4",
    });
    await g4.save();

    let g5 = new LectureHall({
        name: "G5",
    });
    await g5.save();

    let g6 = new LectureHall({
        name: "G6",
    });
    await g6.save();

    let g7 = new LectureHall({
        name: "G7",
    });
    await g7.save();
};