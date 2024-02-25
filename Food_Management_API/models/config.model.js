const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./db/food.db");

const getConfigurations = async () => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM configuration";

    db.all(sql, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

module.exports = {
  getConfigurations,
};
