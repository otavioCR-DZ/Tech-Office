const Product = require('../models/Product');
const products = require('./products.json');

// Popula o banco com o catálogo inicial somente se a tabela estiver vazia.
async function seedIfEmpty() {
  if ((await Product.count()) > 0) return 0;
  await Product.bulkCreate(products);
  return products.length;
}

module.exports = { seedIfEmpty };
