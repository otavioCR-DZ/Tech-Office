const fs = require('node:fs');
const path = require('node:path');
const { Sequelize } = require('sequelize');

// O banco é um arquivo SQLite em backend/storage (ignorado pelo Git, exceto o .gitkeep).
const storageDir = path.join(__dirname, '..', '..', 'storage');
fs.mkdirSync(storageDir, { recursive: true });

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(storageDir, 'database.sqlite'),
  logging: false,
});

module.exports = sequelize;
