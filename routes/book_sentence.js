var express = require('express');
var router = express.Router();
var connection = require('../mysqlConnection');
var fs =require('fs');

/* GET home page. */
router.get('/:sentence_id', function(req, res, next) {
  var userId =req.session.user_id;
  var sentenceId=req.params.sentence_id;
  var bookId = req.cookies.book_id;
  var getQuery ='SELECT * FROM users WHERE user_id = "'+userId+'"';
  if(userId){

    connection.query(getQuery,function(err,user){

      res.render('bookId'+bookId+'sentenceId'+sentenceId+'', {
         page_title: '本文',
         user:user[0],
         sentenceId:sentenceId,
         bookId:bookId
       });

    });
  }else{
    res.redirect('/login');
 }
});



module.exports = router;
