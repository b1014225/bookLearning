var express = require('express');
var router = express.Router();
var connection = require('../mysqlConnection');


router.get('/', function(req, res, next) {
  var userId =req.session.user_id;
  if(userId){
    res.redirect('/');
  }else{
  res.render('register', {
    page_title: 'サインアップ'
  });
}
});

router.post('/',function(req,res){
  var name=req.body.user_name;
  var password=req.body.password;
  var setQuery='INSERT INTO users (user_name,password) VALUES("'+name+'",'+'"'+password+'")';
  var getQuery='SELECT user_name FROM users WHERE user_name="'+name+'" LIMIT 1';
  connection.query(getQuery,function(err,exit_user_name){
    if(exit_user_name[0]){
      res.render('register',{
        page_title:'サインアップ',
        exitUser:'"'+exit_user_name[0].user_name+'"は現在使われている名前です'
      });
    }else{
      connection.query(setQuery,function(err,rows){
        res.redirect('/login');
      });
    };
  });
});

module.exports = router;
