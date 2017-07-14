var express = require('express');
var router = express.Router();
var connection = require('../mysqlConnection');

/* GET home page. */
router.get('/', function(req, res, next) {
  var userId =req.session.user_id;
  var bookId = req.cookies.book_id;
  var getQuery ='SELECT * FROM users WHERE user_id = "'+userId+'"';
  var bookQuery='SELECT * FROM books WHERE book_id="'+bookId+'"';
　var indexQuery='SELECT * FROM indexs WHERE book_id="'+bookId+'"';
  if(userId){
    connection.query(getQuery,function(err,user){
      connection.query(bookQuery,function(err,books){
        connection.query(indexQuery,function(err,indexs){
          res.render('bookIndex', {
             page_title: '目次',
             user:user[0],
             bookId:bookId,
             bookList:books[0],
             indexList:indexs
           });
         });
       });
    });
  }else{
    res.redirect('/login');
 }
});

module.exports = router;
