var express = require('express'),
    router = express.Router(),
    Employees = require('../models/employees.js'),
    crypto = require('crypto'),
    TITLE_REG = '注册';

router.get('/', function(req, res) {
  res.render('reg',{title:TITLE_REG});
});

router.post('/', function(req, res) {
  var EmployeesName = req.body['txtEmployeesName'],
      EmployeesPwd = req.body['txtEmployeesPwd'],
      EmployeesRePwd = req.body['txtEmployeesRePwd'],      
      md5 = crypto.createHash('md5');
 
      EmployeesPwd = md5.update(EmployeesPwd).digest('hex');

  var newEmployees = new Employees({
      Employeesname: EmployeesName,
      Employeespass: EmployeesPwd
  });

  //检查用户名是否已经存在
  Employees.getEmployeesNumByName(newEmployees.Employeesname, function (err, results) {        
             
      if (results != null && results[0]['num'] > 0) {
          err = '用户名已存在';
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
              res.locals.success = '注册成功,请点击   <a class="btn btn-link" href="/login" role="button"> 登录 </a>' ;
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