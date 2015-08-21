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


function Employees(employees) {
    this.name = employees.name;
    this.password = employees.password;
    this.isManager = employees.isManager;
};

module.exports = Employees;

pool.getConnection(function(err, connection) {

  var useDbSql = "USE " + DB_NAME;

  connection.query(useDbSql, function (err) {
      if (err) {
        console.log("USE Error: " + err.message);
        return;
      } 

      console.log('USE succed');
  });

  //Save Data
  Employees.prototype.save = function save(callback) {
      var employees = {
          name      : this.name,
          password  : this.password,
          isManager : this.isManager
      };

      var insertUser_Sql = "INSERT INTO employees(ID, name, password, isManager) VALUES(0,?,?,?)";
      
      connection.query(insertUser_Sql, [employees.name, employees.password, employees.isManager], function
        (err, result) {
          if (err) {
            console.log("insertUser_Sql Error: " + err.message);
            return;
          }

          connection.release();

          console.log("invoked[save]");
          callback(err, result);
        });
  };

  Employees.getEmployeesNumByName = function getEmployeesNumByName(name, callback) {

      var getEmployeesNumByName_Sql = "SELECT COUNT(1) AS num FROM employees WHERE name = ?";

      connection.query(getEmployeesNumByName_Sql, [name], function(err, result) {
          if (err) {
              console.log("getEmployeesNumByName Error" + err.message);
              return;
          }

          connection.release();

          console.log("invoked[getEmployeesNumByName]");
          callback(err, result);
      });
  };

  //根据用户名得到用户信息
  Employees.getEmployeesByEmployeesName = function getEmployeesByEmployeesName(name, callback) {

        var getEmployeesByEmployeesName_Sql = "SELECT * FROM employees WHERE name = ?";

        connection.query(getEmployeesByEmployeesName_Sql, [name], function (err, result) {
            if (err) {
                console.log("getEmployeesByEmployeesName Error: " + err.message);
                return;
            }

            connection.release();

            console.log("invoked[getEmployeesByEmployeesName]");
            callback(err,result);
        });
  };


});



