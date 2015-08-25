var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var routes = require('./routes/index');
var reg = require('./routes/reg');
var login = require('./routes/login');
var logout = require('./routes/logout');
var itemdetails = require('./routes/itemdetails');
var updateitem = require('./routes/updateitem');
var additem = require('./routes/additem');
var deleteitem = require('./routes/deleteitem');
var userdetails = require('./routes/userdetails');
var machinedetails = require('./routes/machinedetails');
var machineitem = require('./routes/machineitem');
var saledetails = require('./routes/saledetails');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(cookieParser('Wilson'));
app.use(session({ secret: 'wilson'}));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/reg', reg);
app.use('/login', login);
app.use('/logout', logout);
app.use('/itemdetails', itemdetails);
app.use('/updateitem', updateitem);
app.use('/additem', additem);
app.use('/deleteitem', deleteitem);
app.use('/userdetails',userdetails);
app.use('/machinedetails', machinedetails);
app.use('/machineitem', machineitem);
app.use('/saledetails', saledetails);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

app.listen(8000);
module.exports = app;
