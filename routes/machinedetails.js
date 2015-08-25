var express = require('express'),
    router = express.Router(),
    Machine = require('../models/machine.js'),
    TITLE_MACHINE = 'Machine Page';

router.get('/', function(req, res) {
    if (req.session.name) {
       res.locals.name = req.session.name;
       Machine.getAllMachineInfo (function(err, results) {
         res.render('machinedetails', {machines: results, user: req.session.user});
       });
    } else {
       res.render('itemdetails', {title: TITLE_MACHINE});
    }
});

// router.post('/', function(req, res) {
//     req.session.machinId = req.body.machineId;
//     console.log("machine id: " + req.session.machinId);
//     // Machine.getMachineInfoByID(machineId, function(err, results){
//     //     res.render('machineitem',{machine: results});
//     // });
//     // console.log(req.body.userId);
//     res.end("yes");
// });

module.exports = router;