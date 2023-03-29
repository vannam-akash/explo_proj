// This will contain list of classes
const mongoose = require('mongoose');
const Professor = require('../models/professor');

// Connect to MongoDB
main().catch(err => console.log('There was an error connecting to mongoose :(', err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/proj');
    console.log('Sucessfully connected to mongoose!')

    
    await Professor.deleteMany({});

    let p1 = new Professor({
        name:"Arnab Sarkar",
        password:"p1",
        uid:"p1",
        class:"ME231"
    });
    await p1.save();

    let p2 = new Professor({
        name:"Awaneesh",
        password:"p2",
        uid:"p2",
        class:"PHY101"
    });
    await p2.save();
    
    let p3 = new Professor({
        name:"Rajeev Kumar",
        password:"p3",
        uid:"p3",
        class:"MA201"
    });
    await p3.save();
    
    let p4 = new Professor({
        name:"Amit Tyagi",
        password:"p4",
        uid:"p4",
        class:"ME104"
    });
    await p4.save();

    let p5 = new Professor({
        name:"M. Vashishth",
        password:"p5",
        uid:"p5",
        class:"ME252"
    });
    await p5.save();
};


