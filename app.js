// Requiring node packages
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
var methodOverride = require('method-override')
const AppError = require('./utility/appError')
const morgan = require('morgan');
const path = require('path');
const ejsMate = require('ejs-mate');


const app = express();
app.use(methodOverride('_method'))


// Requiring necessary Functions
const refreshPasscode = require('./utility/refreshPasscode');
const clearAttendance = require('./utility/clearAttendance');
const updateLtProfStatus = require('./utility/updateLtProfStatus');


// Updating codes every 30 secs
setInterval(refreshPasscode,30*1000);


// Clearing attendance 
setInterval(clearAttendance,65*60*1000);


// Code to set the time offset and 1 hr interval for running this function
let t = new Date();
let min = t.getMinutes();
let sec = t.getSeconds();
if(min<50){
  let difMin = 50 - min - 1;
  let difSec = 60 - sec;
  let timeout = difMin * 60 * 1000 + difSec * 1000;
  setTimeout(() => {
    setInterval(updateLtProfStatus, 1000 * 60 * 60);
  }, timeout);
}
else {
  let difMin = 60 - min - 1;
  let difSec = 60 - sec; 
  let timeout = (difMin + 60) * 60 * 1000 + difSec * 1000;
  setTimeout(()=>{
    setInterval(updateLtProfStatus, 1000 * 60 * 60);
  }, timeout);
}


// Set view engine to EJS
app.engine('ejs', ejsMate);
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


// Connect to MongoDB
main().catch(err => console.log('There was an error connecting to mongoose :(', err));
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/proj');
  console.log('Sucessfully connected to mongoose!')
}  


// Requiring routes
app.use('/lectHalls',require('./routes/lectHall'));
app.use('/students',require('./routes/student'));
app.use('/professors',require('./routes/professor'));


// 404 Route
app.all('*', (req, res, next) => {
  next(new AppError('Page Not Found', 404))
})


// Error handler
app.use((err, req, res, next)=>{
  console.log("Got inside the error handler!")
  res.status(500).render('error',{err});
});


// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
