var express = require('express'),
    router = express.Router(),
    Employees = require('../models/employees.js'),
    // crypto = require('crypto'),
    TITLE_LOGIN = 'Login';

router.get('/', function(req, res) {
    res.render('login',{title:TITLE_LOGIN});
});

router.post('/', function(req, res) {
    var userName = req.body['txtUserName'],
        userPwd = req.body['txtUserPwd'],
        isRem = req.body['chbRem'];
        // md5 = crypto.createHash('md5');
       
    Employees.getEmployeesByEmployeesName(userName, function (err, results) {                            
        if (results == ''){
            res.locals.error = 'The user is not existence';
            res.render('login',{title:TITLE_LOGIN});
            return;
        }

        // userPwd = md5.update(userPwd).digest('hex');
        if (results[0].name != userName || results[0].password != userPwd){
            res.locals.error = 'Username or Password is wrong';
            res.render('login',{title:TITLE_LOGIN});
            return;
        } 
        // if (results[0].isManager != 1) {
        //     res.locals.error = 'This account is not manager!';
        //     res.render('login',{title:TITLE_LOGIN});
        //     return;
        // } 
        else{
            if(isRem){
                res.cookie('islogin', userName, { maxAge: 60000 });                 
            }

            

            req.session.user =  results[0];
            console.log("this is: " + results[0].name);

            res.locals.userid = results[0].ID;
            req.session.userid = results[0].ID;
            
            res.locals.name = results[0].name;
            req.session.name = results[0].name; 

            res.locals.isManager = results[0].isManager;
            req.session.isManager = results[0].isManager;     
                         
            res.redirect('/');
            return;
        }
    });
});

module.exports = router;