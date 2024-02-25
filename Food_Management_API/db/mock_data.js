const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("food.db");

const products = [
  {
    name: "Margherita",
    description: "Tomato, mozzarella, basil",
    price: 8.99,
    stock: 20,
  },
  {
    name: "Pepperoni",
    description: "Tomato, mozzarella, pepperoni",
    price: 10.99,
    stock: 15,
  },
  {
    name: "Vegetarian",
    description: "Tomato, mozzarella, assorted vegetables",
    price: 9.99,
    stock: 20,
  },
  {
    name: "Zero Coke",
    description: "Zero Coke 0% sugar",
    price: 2,
    stock: 200,
  },
];

const orders = [
  {
    notes: "Extra cheese",
    total_amount: 30.97,
    customer_name: "Sol Ze",
    is_visible: 1,
    status_id: 0,
  },
  {
    notes: "",
    total_amount: 19.98,
    customer_name: "Adam Adam",
    is_visible: 1,
    status_id: 0,
  },
  {
    notes: "Don't put basil",
    total_amount: 10.99,
    customer_name: "Sama",
    is_visible: 1,
    status_id: 0,
  },
];

const orderedItems = [
  { order_id: 1, product_id: 1, quantity: 1 },
  { order_id: 1, product_id: 2, quantity: 2 },
  { order_id: 2, product_id: 3, quantity: 2 },
  { order_id: 3, product_id: 1, quantity: 1 },
  { order_id: 3, product_id: 4, quantity: 1 },
];

const config = [
  {
    key: "show_component",
    value: "true",
    type: "boolean",
  },
];

db.serialize(() => {
  const insertProducts = db.prepare(
    "INSERT INTO product (name, description, price, stock) VALUES (?, ?, ?, ?)"
  );
  products.forEach((product) => {
    insertProducts.run(
      product.name,
      product.description,
      product.price,
      product.stock
    );
  });
  insertProducts.finalize();

  const insertOrders = db.prepare(
    "INSERT INTO `order` (notes, total_amount, customer_name, is_visible, status_id) VALUES (?, ?, ?, ?, ?)"
  );
  orders.forEach((order) => {
    insertOrders.run(
      order.notes,
      order.total_amount,
      order.customer_name,
      order.is_visible,
      order.status_id
    );
  });
  insertOrders.finalize();

  const insertOrderedItems = db.prepare(
    "INSERT INTO ordered_items (order_id, product_id, quantity) VALUES (?, ?, ?)"
  );
  orderedItems.forEach((item) => {
    insertOrderedItems.run(item.order_id, item.product_id, item.quantity);
  });
  insertOrderedItems.finalize();

  const insertConfigurations = db.prepare(
    "INSERT INTO configuration (key, value, type) VALUES (?, ?, ?)"
  );
  config.forEach((c) => {
    insertConfigurations.run(c.key, c.value, c.type);
  });
  insertConfigurations.finalize();
});

console.log("Mock data inserted.");

db.close();
