var express = require('express'),
    router = express.Router(),
    Item = require('../models/item.js'),
    TITLE_REG = 'Add Item Page';

router.get('/', function(req, res) {
		res.render('additem', {title:TITLE_REG});
});


router.post('/', function(req, res) {
  var itemId = req.body['itemId'],
      itemName = req.body['itemName'],
      itemPrice = req.body['itemPrice'],
      itemType = req.body['itemType'],
      itemCalories = req.body['itemCalories'],
      itemSugar = req.body['itemSugar'],
      itemInfo = req.body['itemInfo'],
      itemPicture = req.body['itemPicture'],
      itemLastmod = req.body['itemLastmod'];


  var addItem = new Item({
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

  addItem.add(function (err, results) {
  	if (err) {
              res.locals.error = err;
              res.render('reg', { title: TITLE_REG });
              return;
    } else {
      res.locals.success = 'add successed, please click   <a class="btn btn-link" href="/itemdetails" role="button"> itemdetails </a>' ;
      res.render('additem', { title: TITLE_REG });
    }
    
  });
});

module.exports = router;