// This will contain list of classes
const mongoose = require('mongoose');
const Class = require('../models/class');

// Connect to MongoDB
main().catch(err => console.log('There was an error connecting to mongoose :(', err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/proj');
    console.log('Sucessfully connected to mongoose!')

    
    await Class.deleteMany({});

    let c1 = new Class({
        courseCode:"CSO101",
        professor:"Arnab Sarkar",
        semester:1
    });
    await c1.save();

    let c2 = new Class({
        courseCode:"PHY101",
        professor:"Awaneesh",
        semester:2
    });
    await c2.save();
    
    let c3 = new Class({
        courseCode:"MA201",
        professor:"Rajeev Kumar",
        semester:2
    });
    await c3.save();

    let c4 = new Class({
        courseCode:"ME103",
        professor:"Amit Tyagi",
        semester:2
    });
    await c4.save();

    let c5 = new Class({
        courseCode:"ME252",
        professor:"M. Vashishth",
        semester:4
    });
    await c5.save();    
};


