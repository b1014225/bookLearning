var express = require('express');
var router = express.Router();
var connection = require('../mysqlConnection');

/* GET home page. */
router.get('/:book_id', function(req, res, next) {
  var userId =req.session.user_id;
  var bookId =req.params.book_id;
  res.cookie('book_id', bookId);
  var getQuery ='SELECT * FROM users WHERE user_id = "'+userId+'"';
  var bookGetQuery='SELECT * FROM books WHERE book_id="'+bookId+'"';
  if(userId){
    connection.query(getQuery,function(err,user){
      connection.query(bookGetQuery,function(err,book){
        res.render('book_detail',{
          page_title:'本の詳細',
          book:book[0],
          user:user[0]
        });
      });
    });
  }else{
    res.redirect('/login');
 }
});

module.exports = router;
