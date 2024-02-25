const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./db/food.db");

// get orders from the database
const getAllOrders = async () => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM `order`";

    db.all(sql, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

//get order by id
const getOrderById = async (id) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM `order` WHERE id = ?";
    db.get(sql, [id], (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
};

//get ordered items by order id
const getOrderedItemsOfOrder = async (id) => {
  return new Promise((resolve, reject) => {
    let items = [];
    const sql =
      "SELECT name, quantity, p.price AS price_per_item FROM ordered_items oi INNER JOIN product p ON p.id = oi.product_id WHERE order_id = ?";

    db.all(sql, [id], function (err, rows) {
      rows.forEach(function (row) {
        items.push(row);
      });
      if (err) {
        reject(err);
      } else {
        resolve(items);
      }
    });
  });
};

module.exports = {
  getAllOrders,
  getOrderById,
  getOrderedItemsOfOrder,
};
