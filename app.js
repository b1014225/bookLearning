var express = require('express');
var engine = require('ejs-locals');//layout.jsに共通のejsを書くためのモジュール（リファクタリング）
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var connect        = require('connect');//deleteとputメソッドを使うためのモジュール
var methodOverride = require('method-override');//deleteとputメソッドを使うためのモジュール
var session = require('express-session');//セッション
var domain = require('express-domain-middleware');//Rethrow non-MySQL errorsというエラーをなくすために入れたモジュール

var index = require('./routes/index');
var users = require('./routes/users');
var login = require('./routes/login');
var logout =require('./routes/logout');
var register =require('./routes/register');
var book_detail =require('./routes/book_detail');
var book_knowledge =require('./routes/book_knowledge');
var bookIndex =require('./routes/bookIndex');
var book_sentence =require('./routes/book_sentence');



var app = express();

// view engine setup
app.engine('ejs', engine);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(domain);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride(function(req, res){
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    var method = req.body._method;
    delete req.body._method;
    return method;
  };
}));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({//ここら辺いじればセッションの待機時間とか細かい設定が可能
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));


app.use('/',index);
app.use('/users', users);
app.use('/login',login);
app.use('/logout',logout);
app.use('/register',register);
app.use('/book_detail',book_detail);
app.use('/book_knowledge',book_knowledge);
app.use('/bookIndex',bookIndex);
app.use('/book_sentence',book_sentence);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
