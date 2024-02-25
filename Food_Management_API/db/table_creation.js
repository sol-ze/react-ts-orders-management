const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("food.db");

const createProductsTable = `
    CREATE TABLE IF NOT EXISTS product (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name VARCHAR(250) NOT NULL,
        description VARCHAR(2500),
        price DECIMAL(10, 2) NOT NULL,
        stock INTEGER UNSIGNED NOT NULL,
        creation_time DATE DEFAULT (DATETIME('now', 'localtime'))
    );
    CREATE INDEX IF NOT EXISTS idx_product_name ON product(name);
`;

const createOrdersTable = `
    CREATE TABLE IF NOT EXISTS \`order\` (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        notes varchar(500) NOT NULL,
        total_amount DECIMAL(10, 2) NOT NULL,
        customer_name VARCHAR(50) NOT NULL,
        status_id INTEGER DEFAULT 0,
        is_visible INT NOT NULL,
         creation_time DATE DEFAULT (DATETIME('now', 'localtime'))
    );
        CREATE INDEX IF NOT EXISTS idx_order_customer_name ON \`order\`(customer_name);
`;

const createOrderedItemsTable = `
    CREATE TABLE IF NOT EXISTS ordered_items (
       order_id INTEGER,
        product_id INTEGER,
        quantity INTEGER NOT NULL DEFAULT 1,
        creation_time DATE DEFAULT (DATETIME('now', 'localtime')),
        PRIMARY KEY (order_id, product_id),
        FOREIGN KEY (order_id) REFERENCES \`order\`(id),
        FOREIGN KEY (product_id) REFERENCES product(id)
    )
`;

const createConfigurationsTable = `
    CREATE TABLE IF NOT EXISTS configuration (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        key TEXT UNIQUE NOT NULL,
        value TEXT NOT NULL,
        type TEXT NOT NULL
    )
`;

db.serialize(() => {
  db.run(createOrdersTable);
  db.run(createProductsTable);
  db.run(createOrderedItemsTable);
  db.run(createConfigurationsTable);

  db.run("CREATE INDEX IF NOT EXISTS idx_product_name ON product(name);");
  db.run(
    "CREATE INDEX IF NOT EXISTS idx_order_customer_name ON `order`(customer_name);"
  );
});
console.log("created");

db.close();
