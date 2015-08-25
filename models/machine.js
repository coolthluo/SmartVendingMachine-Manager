var mysql = require('mysql');
var DB_NAME = 'smartcalsvendingmachine';

var pool = mysql.createPool({
    host     :  '127.0.0.1',
    user     :  'root',
    password :  '3hkyw198'
});

pool.on('connection', function(connection) {
    connection.query('SET SESSION auto_increment_increment=1');
});

function Machine(machine) {
	this.ID = machine.ID;
	this.address = machine.address;
	this.startdate = machine.startdate;
	this.lastsync = machine.lastsync;
};

module.exports = Machine;

pool.getConnection(function(err, connection) {

  var useDbSql = "USE " + DB_NAME;

  connection.query(useDbSql, function (err) {
      if (err) {
        console.log("USE Error: " + err.message);
        return;
      } 

      console.log('Machine USE succed');
  });

  Machine.getAllMachineInfo = function getAllMachineInfo(callback) {
  	var getAllMachineInfo_Sql = "select * from machines";
  	connection.query(getAllMachineInfo_Sql, function(err, result) {
  		if (err) {
  			console.log("getAllMachineInfo_Sql Error: " + err.message);
  			return;
  		}
  		callback(err, result);
  	});
  };

  Machine.getMachineInfoByID = function getMachineInfoByID(id, callback) {
  	var getMachineInfoByID_Sql = "select * from machines where ID = ?";
  	connection.query(getMachineInfoByID_Sql, [id], function (err, result) {
      if (err) {
        console.log("getMachineInfoByID_Sql Error: " + err.message);
        return;
      }

      // connection.release();
      callback(err, result);
    });
  };

  Machine.getMachineAndItemInventoryInfoById = function getMachineAndItemInventoryInfoById(id, callback) {
    var getMachineAndItemInventoryInfoById_sql = "select machines.ID, machines.address, machine_item.itemid, machine_item.capacity, machine_item.quantity, items.name from machines, machine_item, items where machines.id=? and machine_item.machineid=? and machine_item.itemid = items.id";
    connection.query(getMachineAndItemInventoryInfoById_sql,  [id, id], function(err, result){
      if (err) {
        console.log("getMachineAndItemInventoryInfoById_sql Error: " + err.message);
        return;
      }

      callback(err, result);
    });
  };

  Machine.getMachineSalesInfo = function getMachineSalesInfo(callback) {
    var getMachineSalesInfo_Sql = "select b.id, b.address, a.profit from (select machineid, sum(profit) as profit from sales group by machineid) a join machines b on a.machineid = b.id order by profit desc";
    connection.query(getMachineSalesInfo_Sql, function(err, result) {
      if (err) {
        console.log("getMachineSalesInfo_Sql Error: " + err.message);
        return;
      }

      callback(err, result);
    });
  };

});
