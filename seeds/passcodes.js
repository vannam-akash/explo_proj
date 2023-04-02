const mongoose = require('mongoose');
const Passcode = require('../models/passcode');

// Connect to MongoDB
main().catch(err => console.log('There was an error connecting to mongoose :(', err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/proj');
    console.log('Sucessfully connected to mongoose!')

    
     await Passcode.deleteMany({});

    let pg4 = new Passcode({
        name:"pass4",
        pass: "4"+Math.floor(Math.random()*1000+1),
    });
    await pg4.save();

    let pg5 = new Passcode({
        name:"pass5",
        pass: "5"+Math.floor(Math.random()*1000+1),
    });
    await pg5.save();

    let pg6 = new Passcode({
        name:"pass6",
        pass: "6"+Math.floor(Math.random()*1000+1),
    });
    await pg6.save();

    let pg7 = new Passcode({
        name:"pass7",
        pass: "7"+Math.floor(Math.random()*1000+1),
    });
    await pg7.save();
};

