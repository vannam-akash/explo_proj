// Requiring node packages
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const morgan = require('morgan');
const path = require('path');
const ejsMate = require('ejs-mate');



// Requiring models
const Student = require('./models/student');
const Professor = require('./models/professor');
const Class = require('./models/class');
const Attendance = require('./models/attendance');
const LectureHall = require('./models/lectHall');

const app = express();

// Middleware

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
app.use(passport.initialize());
app.use(passport.session());

// Connect to MongoDB
main().catch(err => console.log('There was an error connecting to mongoose :(', err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/proj');
  console.log('Sucessfully connected to mongoose!')
}

// Error handler
app.use(function(err, req, res, next) {
  console.error(err.stack);
  console.log("Got inside the error handler!")
  res.status(500).render('error');
});


// Requiring routes
app.use('/lectHalls',require('./routes/lectHall'));
app.use('/students',require('./routes/student'));
app.use('/professors',require('./routes/professor'));

// Home route
app.get('/',(req,res)=>{
  res.render('home');
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server started on port ${port}`));
