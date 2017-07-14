var express = require('express');
var router = express.Router();
var connection = require('../mysqlConnection');

/* GET home page. */
router.get('/', function(req, res, next) {
  var userId =req.session.user_id;
  var getQuery ='SELECT * FROM users WHERE user_id = "'+userId+'"';
  var bookGetQuery ='SELECT * FROM books';
  var bookId = req.cookies.book_id;
  if(bookId){
    res.clearCookie('book_id');
  }
  if(userId){
    connection.query(getQuery,function(err,user){
      connection.query(bookGetQuery,function(err,books){
        res.render('index', {
           page_title: 'Index',
           user:user[0],
           bookList:books
         });
      });
    });
  }else{
    res.redirect('/login');
 }
});

module.exports = router;
