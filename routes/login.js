var express = require('express');
var router = express.Router();
var connection = require('../mysqlConnection');


router.get('/', function(req, res) {
  var userId =req.session.user_id;
  if(userId){
    res.redirect('/');
  }else{
  res.render('login',{
    page_title: 'login'
  });
}
});


router.post('/',function(req,res){
  var user_name=req.body.user_name;
  var password = req.body.password;
  var cheakQuery ='SELECT * FROM users WHERE user_name="'+user_name+'" AND password = "'+password+'" LIMIT 1';
  connection.query(cheakQuery,function(err,rows){

    if(rows.length==1){
      var userId=rows[0].user_id;
    }else{
      var userId=false;
    };

    if(userId){
      req.session.user_id=userId;
      res.redirect('/');
    }else{
      res.render('login',{
        page_title:'login',
        err_message:'ご指定のユーザーは存在しないか、パスワードが間違っています。'
      });
    };


  });
});

module.exports = router;
