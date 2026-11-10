const express = require('express');
const cors = require('cors');
const productRoutes = require('./routes/productRoutes');

const app = express();

app.use(cors(process.env.CORS_ORIGIN ? { origin: process.env.CORS_ORIGIN } : undefined));
app.use(express.json());

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));
app.use('/api/products', productRoutes);

app.use('/api', (req, res) => res.status(404).json({ message: 'Rota não encontrada.' }));

// eslint-disable-next-line no-unused-vars
app.use((error, req, res, next) => {
  if (error.type === 'entity.parse.failed') {
    return res.status(400).json({ message: 'JSON inválido.' });
  }
  console.error(error);
  res.status(500).json({ message: 'Erro interno do servidor.' });
});

module.exports = app;
