const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const required = (label) => ({ notEmpty: { msg: `${label} é obrigatório.` } });

const Product = sequelize.define(
  'Product',
  {
    name: {
      type: DataTypes.STRING(120),
      allowNull: false,
      validate: required('Nome'),
    },
    category: {
      type: DataTypes.STRING(60),
      allowNull: false,
      validate: required('Categoria'),
    },
    // Preço base estimado (R$). O preço por loja é calculado a partir dele no frontend.
    base: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        isFloat: { msg: 'Preço base deve ser um número.' },
        min: { args: [0.01], msg: 'Preço base deve ser maior que zero.' },
      },
    },
    // Desconto típico em %.
    promo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        isInt: { msg: 'Promoção deve ser um número inteiro.' },
        min: { args: [0], msg: 'Promoção não pode ser negativa.' },
        max: { args: [100], msg: 'Promoção não pode passar de 100%.' },
      },
    },
    // Termo usado nos links de busca de cada loja.
    query: {
      type: DataTypes.STRING(150),
      allowNull: false,
      validate: required('Termo de busca'),
    },
    specs: { type: DataTypes.TEXT, allowNull: false, validate: required('Especificações') },
    purpose: { type: DataTypes.TEXT, allowNull: false, defaultValue: '' },
    utility: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: required('Utilidade no escritório'),
    },
  },
  { tableName: 'products' },
);

module.exports = Product;
