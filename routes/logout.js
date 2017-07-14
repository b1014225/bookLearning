var express = require('express');
var router = express.Router();
var connection = require('../mysqlConnection');


router.get('/',function(req,res){
  req.session.destroy();
  res.redirect('/login');
});

module.exports = router;
