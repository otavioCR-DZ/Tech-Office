const Product = require('../models/Product');

const FIELDS = ['name', 'category', 'base', 'promo', 'query', 'specs', 'purpose', 'utility'];

// Aceita só os campos conhecidos e normaliza os tipos (o corpo chega como JSON).
function pickFields(body = {}) {
  const data = {};
  for (const field of FIELDS) {
    if (body[field] === undefined) continue;
    const value = body[field];
    data[field] = typeof value === 'string' ? value.trim() : value;
  }
  if (data.base !== undefined && data.base !== '') data.base = Number(data.base);
  if (data.promo !== undefined && data.promo !== '') data.promo = Number(data.promo);
  return data;
}

async function findOr404(id, res) {
  const product = await Product.findByPk(id);
  if (!product) res.status(404).json({ message: 'Produto não encontrado.' });
  return product;
}

// Erros de validação do Sequelize viram 400 com a lista de mensagens.
function handleError(error, res, next) {
  if (error.name === 'SequelizeValidationError') {
    return res.status(400).json({
      message: 'Dados inválidos.',
      errors: error.errors.map((e) => e.message),
    });
  }
  return next(error);
}

// READ - lista (com filtros opcionais ?category=...&search=...)
async function list(req, res, next) {
  try {
    const { category, search } = req.query;
    const where = category && category !== 'Todos' ? { category } : {};
    let products = await Product.findAll({ where, order: [['id', 'ASC']] });

    // Filtro por nome feito em JS para ignorar maiúsculas/acentos como o frontend já fazia.
    const term = String(search ?? '').trim().toLowerCase();
    if (term) products = products.filter((p) => p.name.toLowerCase().includes(term));

    res.json(products);
  } catch (error) {
    next(error);
  }
}

// READ - categorias distintas
async function categories(req, res, next) {
  try {
    const rows = await Product.findAll({
      attributes: ['category'],
      group: ['category'],
      order: [['category', 'ASC']],
    });
    res.json(rows.map((row) => row.category));
  } catch (error) {
    next(error);
  }
}

// READ - um produto
async function getById(req, res, next) {
  try {
    const product = await findOr404(req.params.id, res);
    if (product) res.json(product);
  } catch (error) {
    next(error);
  }
}

// CREATE
async function create(req, res, next) {
  try {
    const product = await Product.create(pickFields(req.body));
    res.status(201).json(product);
  } catch (error) {
    handleError(error, res, next);
  }
}

// UPDATE
async function update(req, res, next) {
  try {
    const product = await findOr404(req.params.id, res);
    if (!product) return;
    await product.update(pickFields(req.body));
    res.json(product);
  } catch (error) {
    handleError(error, res, next);
  }
}

// DELETE
async function remove(req, res, next) {
  try {
    const product = await findOr404(req.params.id, res);
    if (!product) return;
    await product.destroy();
    res.status(204).end();
  } catch (error) {
    next(error);
  }
}

module.exports = { list, categories, getById, create, update, remove };
