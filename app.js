const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
//require('dotenv').config();

//login
const User = require('./models/user');
const passport = require('passport');
const session = require('express-session')

//const apiRouter = require('./routes/api')
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const clienteRouter = require('./routes/cliente');
const produtoRouter = require('./routes/produto');

mongoose.connect('mongodb+srv://juliaHPM:senhabd@cluster0.ivljw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  { useNewUrlParser: true , useUnifiedTopology: true },);
  //mongodb+srv://aluno:aluno@ads-sertao.c0gyl.mongodb.net/notes?retryWrites=true&w=majority
mongoose.set('useCreateIndex', true);

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//configura sessions e passport
app.use(session({
  secret: 'senhasupersecreta',
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//rotas mais expecíficas por primeiro
//app.use('/api', apiRouter);
app.use('/users', usersRouter);
app.use('/cliente', clienteRouter);
app.use('/produto', produtoRouter);
app.use('/', indexRouter);


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
