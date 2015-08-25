var express = require('express'),
    router = express.Router(),
    Item = require('../models/item.js'),
    Employees = require('../models/employees'),
    TITLE_REG = 'User Info Page';



router.get('/', function(req, res) {
		res.render('userdetails', {user: req.session.user});
});

module.exports = router;