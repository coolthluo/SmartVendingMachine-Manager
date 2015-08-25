var express = require('express'),
    router = express.Router(),
    Item = require('../models/item.js'),
    TITLE_DEL = 'Delete Item Page';

router.get('/', function(req, res) {
		res.render('deleteitem', {title:TITLE_DEL});
});


router.post('/', function(req, res) {
  var itemName = req.body['itemName'];

  var deleteItem = new Item({
      name : itemName
  });

  Item.getItemInfoByItemName(itemName, function(err, results) {
    if (results == '' || results == null){
        res.locals.error = 'The name does not existence';
        res.render('deleteitem',{title:TITLE_DEL});
        return;
    } 

    deleteItem.deleteitem(itemName, function(err, result) {
      if (err) {
              res.locals.error = err;
              res.render('deleteitem', { title: TITLE_DEL }); 
              return;            
      } else {
        res.locals.success = 'delete successed!</a>' ;
        res.render('deleteitem', { title: TITLE_DEL });
      }
    });

  });

  // Item.deleteItemByName(itemName, function(err, results) {
  //     if (results == '' || results == null){
  //           res.locals.error = 'The name is not existence';
  //           res.render('deleteitem',{title:TITLE_LOGIN});
  //           return;
  //     } else {
  //           res.locals.success = "Delete Successed!";
  //           res.render('deleteitem', { title: TITLE_REG });
  //     }


  //     // if (err) {
  //     //     res.locals.error = err;
  //     //     res.render('deleteitem', { title: TITLE_REG });
  //     //     return;
  //     // } 
  //         // res.locals.success = 'Delete Successed, please <a class="btn btn-link" href="/itemdetails" role="button"> item details </a>'
  //         // console.log("delete successd!");

    
  // });

});

module.exports = router;