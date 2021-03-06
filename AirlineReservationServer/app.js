var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var getstart = require('./routes/GetStartApi');
var getdes = require('./routes/GetDesApi');
var newbooking = require('./routes/NewBookingApi');
var flightdetail = require('./routes/GetFlightDetailApi');
var updatebooking = require('./routes/UpdateBookingsApi');
var getallflights = require('./routes/GetAllFlightApi');
var newflight = require('./routes/NewFlightApi');
var getpassengers = require('./routes/GetPassengerListApi');
var newpassenger = require('./routes/NewPassengerApi');
var getsomeflight = require('./routes/GetSomeFlightApi');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/flights/starts', getstart);
app.use('/flights/destinations', getdes);
app.use('/bookings/new',newbooking);
app.use('/flightdetail', flightdetail);
app.use('/bookings/update', updatebooking);
app.use('/flights', getallflights);
app.use('/flights/new',newflight);
app.use('/passengers', getpassengers);
app.use('/passengers/new', newpassenger);
app.use('/flights',getsomeflight);

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


module.exports = app;
