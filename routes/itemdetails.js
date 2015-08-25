var express = require('express'),
    router = express.Router(),
    Item = require('../models/item.js'),
    TITLE_REG = 'Item Page';

router.get('/', function(req, res) {
	if(req.session.name) {
	    res.locals.name = req.session.name;      
	    Item.getAllItem (function(err, results) {
			res.render('itemdetails', {items: results, user:req.session.user});
		});
  	} else {
  		res.render('itemdetails', {title: TITLE_REG});
  	}
});

router.post('/', function(req, res) {
  var itemId = 1,
      itemName = req.body['itemName1'],
      itemPrice = req.body['itemPrice1'],
      itemType = req.body['itemType1'],
      itemCalories = req.body['itemCalories1'],
      itemSugar = req.body['itemSugar1'],
      itemInfo = req.body['itemInfo1'],
      itemPicture = req.body['itemPicture1'],
      itemLastmod = req.body['itemLastmod1'];


  var updateItem = new Item({
  		  ID  	   : itemId,
		    name     : itemName,
        price    : itemPrice,
        type     : itemType,
        calories : itemCalories,
        sugar    : itemSugar,
        info     : itemInfo,
        picture  : itemPicture,
        lastmod  : itemLastmod
  });

  updateItem.update(itemId, function (err, results) {
  	if (err) {
              res.locals.error = err;
              res.render('reg', { title: TITLE_REG });
              return;
    }
    res.render('itemdetails', { title: TITLE_REG });
  });
});

module.exports = router;