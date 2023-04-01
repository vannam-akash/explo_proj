// Requiring node packages
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
var methodOverride = require('method-override')
// const passport = require('passport');
// const LocalStrategy = require('passport-local').Strategy;
const morgan = require('morgan');
const path = require('path');
const ejsMate = require('ejs-mate');
// const fns = require('./functions/bookHall');

const app = express();
app.use(methodOverride('_method'))


// Middleware


// Requiring models
const Professor = require('./models/professor');
const LectureHall = require('./models/lectHall');

// Function for updating the lt and professor status
async function update(){
  const lts = await LectureHall.find();

  let t = new Date();
  let min = t.getMinutes();
  let sec = t.getSeconds();
  console.log("Inside update function" , min,sec);
  if(min == 50){
    console.log("inside if statement")
    for(lt of lts){
      if(lt.occupiedBy){
        console.log("Updating.......")
        const profName = lt.occupiedBy;
        const prof = await Professor.findOne({name: profName});
        prof.isTakingClass = false;
        lt.status = "Available";
        lt.class = null;
        lt.occupiedBy = null;
        lt.classTime = null;
        await lt.save();
        await prof.save();
      }
    }
  }
}
// Code to set the time offset and 1 hr interval for running this function
let t = new Date();
let min = t.getMinutes();
let sec = t.getSeconds();
if(min<50){
  let difMin = 50 - min - 1;
  let difSec = 60 - sec;
  let timeout = difMin * 60 * 1000 + difSec * 1000
  setTimeout(() => {
    setInterval(update, 1000 * 60 * 60);
  }, timeout);
}
else {
  let difMin = 60 - min - 1;
  let difSec = 60 - sec; 
  let timeout = (difMin + 60) * 60 * 1000 + difSec * 1000;
  setTimeout(()=>{
    setInterval(update, 1000 * 60 * 60);
  }, timeout);
}

// Set view engine to EJS
app.engine('ejs', ejsMate)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files from the public directory
app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// Initialize and use session middleware
const sessionOptions = { 
  secret: 'thisisnotagoodsecret', 
  resave: false, 
  saveUninitialized: false 
};  
app.use(session(sessionOptions));


// Morgan tiny
app.use(morgan('tiny'));

// Initialize and use Passport middleware
// app.use(passport.initialize());
// app.use(passport.session());

// Connect to MongoDB
main().catch(err => console.log('There was an error connecting to mongoose :(', err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/proj');
  console.log('Sucessfully connected to mongoose!')
}  

// Error handler
// app.use(function(err, req, res, next) {
//   console.error(err.stack);  
//   console.log("Got inside the error handler!")
//   res.status(500).render('error');
// });
  
// Requiring routes
app.use('/lectHalls',require('./routes/lectHall'));
app.use('/students',require('./routes/student'));
app.use('/professors',require('./routes/professor'));
    
// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});