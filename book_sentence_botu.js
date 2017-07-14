var express = require('express');
var router = express.Router();
var connection = require('../mysqlConnection');

/* GET home page. */
router.get('/:sentence_id', function(req, res, next) {
  var userId =req.session.user_id;
  var getQuery ='SELECT * FROM users WHERE user_id = "'+userId+'"';
  if(userId){
    
    connection.query(getQuery,function(err,user){
      res.render('book_sentence', {
         page_title: '本文',
         user:user[0],
         sentenceId:req.params.sentence_id
       });
    });
  }else{
    res.redirect('/login');
 }
});


router.post('/:sentence_id/:test_id', function(req, res, next) {
  var sentenceId=req.params.sentence_id;
  var testId=req.params.test_id;
  var userId =req.session.user_id;
  var getQuery ='SELECT * FROM users WHERE user_id = "'+userId+'"';
  connection.query(getQuery,function(err,user){
  if(testId==1){
    var bodyAnswer =req.body.answer1;
    var checkQery='SELECT * FROM answers WHERE sentence_id="'+sentenceId+'" AND answer_id ="'+testId+'" AND bool=0';
    connection.query(checkQery,function(err,check){
      var answer=check[0].answer;
      if(bodyAnswer==answer){
        var getQuery ='SELECT * FROM answers WHERE answer= "'+bodyAnswer+'" AND bool=1 LIMIT 1';
        var setQuery ='INSERT INTO answers (answer,answer_id,sentence_id,bool) VALUES("'+bodyAnswer+'","'+testId+'","'+sentenceId+'",1)';
        connection.query(getQuery,function(err,get){
          if(get.length==1){
            res.render('book_sentence',{
            page_title:'本文',
            success_message1:"「"+bodyAnswer+"」"+'正解！！',
            user:user[0],
            sentenceId:sentenceId
            });
          }else{
            connection.query(setQuery,function(err,rows){
              res.render('book_sentence',{
              page_title:'本文',
              success_message1:"「"+bodyAnswer+"」"+'正解！！',
              user:user[0],
              sentenceId:sentenceId
              });
            });
          }
        });
      }else{
        res.render('book_sentence',{
        page_title:'本文',
        err_message1:"「"+bodyAnswer+"」"+'不正解！！',
        user:user[0],
        sentenceId:sentenceId
        });
      }
    });

  }else if(testId==2){
    var bodyAnswer =req.body.answer2;
    var checkQery='SELECT * FROM answers WHERE sentence_id="'+sentenceId+'" AND answer_id ="'+testId+'" AND bool=0';
    connection.query(checkQery,function(err,check){
      var answer=check[0].answer;
      if(bodyAnswer==answer){
        var getQuery ='SELECT * FROM answers WHERE answer= "'+bodyAnswer+'" AND bool=1 LIMIT 1';
        var setQuery ='INSERT INTO answers (answer,answer_id,sentence_id,bool) VALUES("'+bodyAnswer+'","'+testId+'","'+sentenceId+'",1)';
        connection.query(getQuery,function(err,get){
          if(get.length==1){
            res.render('book_sentence',{
            page_title:'本文',
            success_message2:"「"+bodyAnswer+"」"+'正解！！',
            user:user[0],
            sentenceId:sentenceId
            });
          }else{
            connection.query(setQuery,function(err,rows){
              res.render('book_sentence',{
              page_title:'本文',
              success_message2:"「"+bodyAnswer+"」"+'正解！！',
              user:user[0],
              sentenceId:sentenceId
              });
            });
          }
        });
      }else{
        res.render('book_sentence',{
        page_title:'本文',
        err_message2:"「"+bodyAnswer+"」"+'不正解！！',
        user:user[0],
        sentenceId:sentenceId
        });
      }
    });

  }else if(testId==3){
    res.render('register',{
    page_title:bodyTest
    });
  }
});
});

module.exports = router;
