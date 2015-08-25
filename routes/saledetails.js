var express = require('express'),
    router = express.Router(),
    Machine = require('../models/machine.js'),
    Item = require('../models/item.js'),
    TITLE_SALE = 'Sale Page';

router.get('/', function(req, res) {
	Item.getTotalProfit(function(err, results) {
		Item.getItemProfitByGroup(function(err, result) {
			Machine.getMachineSalesInfo(function(err, machinesale) {
				console.log(machinesale);
				console.log(result);
				console.log(results);
				res.render('saledetails',{machine:machinesale, item: result, sumprofit: results[0].sumprofit, user: req.session.user});
			});
		});
	});
});


module.exports = router;