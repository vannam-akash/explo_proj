// Setting up env file
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
const uri = process.env.MONGO_URL;

const mongoose = require('mongoose');
const Student = require('../models/student');

// Connect to MongoDB
main().catch(err => console.log('There was an error connecting to mongoose :(', err));

async function main() {
    await mongoose.connect(uri,{useNewUrlParser:true});
    console.log('Sucessfully connected to mongoose!')


    await Student.deleteMany({});

    let stud1 = new Student({
        name: "Rohan",
        rollNo: 1,
        password: "1"
    });
    await stud1.save();

    let stud2 = new Student({
        name: "Raj",
        rollNo: 2,
        password: "2"
    });
    await stud2.save();

    let stud3 = new Student({
        name: "Prem",
        rollNo: 3,
        password: "3"
    });
    await stud3.save();

    let stud4 = new Student({
        name: "Aditya",
        rollNo: 4,
        password: "4"
    });
    await stud4.save();
};