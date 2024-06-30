var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const flash = require('connect-flash')
require('dotenv').config()
var indexRouter = require('./routes/index');
var messageRouter = require('./routes/message');
var authRouter = require('./routes/auth')


var connectString = process.env.MONGOSTRING

main()
.then(()=>{
  console.log('Happily Connected')
})
.catch((err)=>{
  console.log(err)
})

async function main(){
  await mongoose.connect(connectString)
}

var client = mongoose.connection.getClient()

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  saveUninitialized : true,
  secret : process.env.SECRETY,
  resave : false,
  cookie : {
    maxAge : 60 * 60 * 24 * 1000
  },
  store  : MongoStore.create({
    client,
    dbName : "sessionStore"
  })
}))
app.use(flash())

require("./config/passport")
app.use(passport.initialize())
app.use(passport.session());

app.use('/', indexRouter);
app.use('/', authRouter)
app.use('/', messageRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
