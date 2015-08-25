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


function Item(item) {
    this.ID       = item.ID;
    this.name     = item.name;
    this.price    = item.price;
    this.type     = item.type;
    this.calories = item.calories;
    this.sugar    = item.sugar;
    this.info     = item.info;
    this.picture  = item.picture;
    this.lastmod  = item.lastmod;
};

module.exports = Item;

pool.getConnection(function(err, connection) {

  var useDbSql = "USE " + DB_NAME;

  connection.query(useDbSql, function (err) {
      if (err) {
        console.log("USE Error: " + err.message);
        return;
      } 

      console.log('Item USE succed');
  });

  // connection.query('SELECT * FROM items WHERE name = ?',"Sprite", function(err, rows, fiedls){
  //   if (err) {
  //            console.log('[query] - :'+err);
  //       return;
  //    }
  //    console.log('The solution is: ', rows[0].name);  
  // });
    //Update Data
  Item.prototype.update = function update(id, callback) {
      var item = {
        ID       : this.ID,
        name     : this.name,
        price    : this.price,
        type     : this.type,
        calories : this.calories,
        sugar    : this.sugar,
        info     : this.info,
        picture  : this.picture,
        lastmod  : this.lastmod
      };
      var updateItem_sql = "UPDATE items SET name=?, price=?, type=?, calories=?, sugar=?, info=?, picture=?, lastmod=? where id = ?";
      
      connection.query(updateItem_sql, [item.name, item.price, item.type, item.calories, item.sugar, item.info, item.picture, item.lastmod, item.ID], function(err, result){
          if (err) {
            console.log("item update_Sql Error: " + err.message);
            return;
          }

          // connection.release();

          console.log("Item[update]");
          callback(err, result);
        });
  };

  Item.prototype.add = function add(callback) {
      var item = {
        ID       : this.ID,
        name     : this.name,
        price    : this.price,
        type     : this.type,
        calories : this.calories,
        sugar    : this.sugar,
        info     : this.info,
        picture  : this.picture,
        lastmod  : this.lastmod
      };
      var addItem_sql = "INSERT INTO items(ID, name, price, type, calories, sugar, info, picture, lastmod) VALUES(0,?,?,?,?,?,?,?,?)";
      connection.query(addItem_sql, [item.name, item.price, item.type, item.calories, item.sugar, item.info, item.picture, item.lastmod], function(err, result){
          if (err) {
            console.log("item add_Sql Error: " + err.message);
            return;
          }

          // connection.release();

          console.log("Item[add]");
          callback(err, result);
        });
  };

  Item.prototype.deleteitem = function deleteitem(name, callback) {
    var deleteItem_Sql = "DELETE from items where name = ?";
    connection.query(deleteItem_Sql, [name], function(err, result) {
      if (err) {
          console.log("deleteItem_Sql Error: " + err.message);
          return;
      }
      console.log("Item[delete]");
      callback(err, result);
    });
  };
  
  Item.getItemInfoByItemName = function getItemInfoByItemName(name, callback) {
        var getItemInfoByItemName_Sql = "SELECT * FROM items WHERE name = ?";
        connection.query(getItemInfoByItemName_Sql, [name], function (err, result) {
            if (err) {
                console.log("getItemInfoByItemName_Sql Error: " + err.message);
                return;
            }

            // connection.release();
            callback(err, result);
        });
  };


  Item.getAllItem = function getAllItem(callback) {
        var getAllItem_Sql = "SELECT * FROM items";
        connection.query(getAllItem_Sql, function (err, result) {
            if (err) {
                console.log("getItemInfoByItemName_Sql Error: " + err.message);
                return;
            }

            // connection.release();
            callback(err, result);
        });
  };

  Item.getTotalProfit = function getTotalProfit(callback) {
      var getTotalProfit_Sql = "select sum(profit) as sumprofit from sales";
      connection.query(getTotalProfit_Sql, function (err, result) {
        if (err) {
          console.log("getTotalProfit_Sql Error: " + err.message);
          return;
        }
        callback(err, result);
      });
  };

  Item.getItemProfitByGroup = function getTotalProfit(callback) {
      var getItemProfitByGroup_Sql =  "select b.name, b.price, a.profit from (select itemid, sum(profit) as profit from sales group by itemid) a join items b on a.itemid = b.id order by profit desc";
      connection.query(getItemProfitByGroup_Sql, function (err, result) {
        if (err) {
          console.log("getItemProfitByGroup_Sql Error: " + err.message);
          return;
        }
        callback(err, result);
      });
  };
});



