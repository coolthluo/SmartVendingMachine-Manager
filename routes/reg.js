var express = require('express'),
    router = express.Router(),
    Employees = require('../models/employees.js'),
    crypto = require('crypto'),
    TITLE_REG = 'Register Page';

router.get('/', function(req, res) {
  res.render('reg',{title:TITLE_REG});
});

router.post('/', function(req, res) {
  var employeesName = req.body['txtEmployeesName'],
  	  employeesIsManager = req.body['txtIsManager'],
      employeesPwd = req.body['txtEmployeesPwd'],
      employeesRePwd = req.body['txtEmployeesRePwd'],      
      md5 = crypto.createHash('md5');
 
      employeesPwd = md5.update(employeesPwd).digest('hex');

  var newEmployees = new Employees({
      name: employeesName,
      password: employeesPwd,
      isManager: employeesIsManager
  });



  //检查用户名是否已经存在
  Employees.getEmployeesNumByName(newEmployees.name, function (err, results) {        
             
      if (results != null && results[0]['num'] > 0) {
          err = 'The username is existence';
      }

      if (err) {
          res.locals.error = err;
          res.render('reg', { title: TITLE_REG });
          return;
      }

      newEmployees.save(function (err,result) {
          if (err) {
              res.locals.error = err;
              res.render('reg', { title: TITLE_REG }); 
              return;            
          }        

          if(result.insertId > 0)
          {
              res.locals.success = 'register successed, please click   <a class="btn btn-link" href="/login" role="button"> Login </a>' ;
          }
          else
          {
              res.locals.error = err;
          }
         
          res.render('reg', { title: TITLE_REG });
      });    
    });          
});

module.exports = router;