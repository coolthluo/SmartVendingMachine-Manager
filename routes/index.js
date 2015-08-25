var express = require('express'),
    Employees = require('../models/employees.js'),
    router = express.Router();

router.get('/', function(req, res) {
  // if(req.cookies.islogin) { 
  //   console.log('cookies:' + req.cookies.islogin);
  //   req.session.name = req.cookies.islogin;
  // }  

  // if(req.session.name) {
  //   console.log('session:' + req.session.name);
  //   res.locals.name = req.session.name;      
  // } 

  // if (req.session.isManager) {
  //   res.locals.isManager = req.session.isManager;     
  // }
  // else {
  //   res.redirect('/login');
  //   return;    
  // }

  res.render('index',{title:'Home Page', user: req.session.user});
});



module.exports = router;
