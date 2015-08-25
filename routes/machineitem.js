var express = require('express'),
    router = express.Router(),
    Machine = require('../models/machine.js'),
    TITLE_MACHINE = 'Machine Page';

router.get('/', function(req, res) {
	// if (req.session.machineId) {
 //       Machine.getMachineInfoByID(req.session.machineId, function(err, results) {
 //       	   console.log(results[0].ID);
 //           res.render('machineitem', {machine: results[0]});
 //       });
 //    } else {
 //       res.render('index', {title: TITLE_MACHINE});
 //    }
      if (req.session.machineId) {
          Machine.getMachineAndItemInventoryInfoById(req.session.machineId, function(err, results) {
            // console.log("get: " + results[1].ID);
            res.render('machineitem', {machines: results});
          });
      } else {
          return;
      }

       // console.log("there is wrong in get");
       // res.render('index', {title: TITLE_MACHINE});
});

router.post('/', function(req, res) {
       var machineID = req.body.machineId;
       console.log(machineID);
       Machine.getMachineAndItemInventoryInfoById(machineID, function(err, results) {
            // console.log("post: " + results[0].ID);
            req.session.machineId =  results[0].ID;
            res.locals.machineId = results[0].ID;
            console.log(results[0].address);
           res.render('machineitem', {machines: results});
       });
});

// router.post('/', function(req, res) {
//        var machineID = req.body.machineId;
//        console.log(machineID);
//        Machine.getMachineInfoByID(machineID, function(err, results) {
//        	   console.log(results[0].ID);
//        	   req.session.machineId =  results[0].ID;
//        	   res.locals.machineId = results[0].ID;
//            res.render('machineitem', {machine: results[0]});
//        });
// });

module.exports = router;