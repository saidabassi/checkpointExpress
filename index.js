const express = require('express');
const pug = require('pug')
const app = express();
const path = require('path')
var router = express. Router();


router.use(function (req, res, next) {
   var date = new Date();
   if(date.getDay > 0 && date.getDay < 6 && date.getHours() > 9 && date.getHours < 17){
       next();
   }else{
       res.redirect('/offlinepage');
   }
});

var home = require('./routes/home');
var About = require('./routes/About');
var Contact = require('./routes/Contact')
app.get('/', home.home);
app.get('/home', home.home);
app.get('/About', About.About);
app.get('/Contact', Contact.Contact);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.static(__dirname + '/public'));

app.use(function(req, res, next) {
   var err = new Error('Not Found');
   err.status = 404;
   next(err);
});
/// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
   app.use(function(err, req, res, next) {
       res.render('error', {
           message: err.message,
           error: err
       });
   });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
   res.render('error', {
      message: err.message,
      error: {}

   });
 

}); app.listen(3000)