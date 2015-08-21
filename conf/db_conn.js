var mysql = require('mysql');
var DB_NAME = 'smartcalsvendingmachine';

var pool = mysql.createPool({
    host     :  '127.0.0.1',
    user     :  'root',
    password :  '3hkyw198'
});

var db_conn = function (){

  pool.on('connection', function(connection) {
      connection.query('SET SESSION auto_increment_increment=1');
  });

  pool.getConnection(function(err, connection) {

    var useDbSql = "USE " + DB_NAME;

    connection.query(useDbSql, function (err) {
        if (err) {
          console.log("USE Error: " + err.message);
          return;
        } 

        console.log('USE succed');
    });
  });
}
module.exports = db_conn;