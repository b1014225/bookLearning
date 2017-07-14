var express = require('express');
var router = express.Router();
var connection = require('../mysqlConnection');

/* GET home page. */
router.get('/', function(req, res, next) {
  var userId =req.session.user_id;
  var bookId = req.cookies.book_id;
  var getQuery ='SELECT * FROM users WHERE user_id = "'+userId+'"';
  var bookGetQuery='SELECT * FROM books WHERE book_id="'+bookId+'"';
  var slideGetQuery='SELECT id ,image_path FROM slides WHERE book_id="'+bookId+'"';
  if(userId){
    connection.query(getQuery,function(err,user){
      connection.query(bookGetQuery,function(err,book){
        connection.query(slideGetQuery,function(err,slides){
          console.log(slides);
          console.log(slides.length);
          res.render('book_knowledge',{
            page_title:'前提知識',
            book:book[0],
            slideList:slides,
            user:user[0]
          });
        });
      });
    });
  }else{
    res.redirect('/login');
 }
});

module.exports = router;
