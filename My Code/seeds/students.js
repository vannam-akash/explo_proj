const mongoose = require('mongoose');
const Student = require('../models/student');

// Connect to MongoDB
main().catch(err => console.log('There was an error connecting to mongoose :(', err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/proj');
    console.log('Sucessfully connected to mongoose!')

    
    await Student.deleteMany({});

    let stud1 = new Student ({
        name:"Rohan",
        rollNo: 1,
        password: "rohan"
    });
    await stud1.save();

    let stud2 = new Student ({
        name:"Raj",
        rollNo: 2,
        password: "raj"
    });
    await stud2.save();

    let stud3 = new Student ({
        name:"Prem",
        rollNo: 3,
        password: "prem"
    });
    await stud3.save();
    
};

