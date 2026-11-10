const app = require('./app');
const sequelize = require('./config/database');
const { seedIfEmpty } = require('./seed/seed');

const PORT = Number(process.env.PORT) || 3001;

async function start() {
  await sequelize.sync(); // cria a tabela products se ainda não existir
  const seeded = await seedIfEmpty();
  if (seeded) console.log(`Banco criado com ${seeded} produtos iniciais.`);

  app.listen(PORT, () => console.log(`API TechOffice rodando em http://localhost:${PORT}/api`));
}

start().catch((error) => {
  console.error('Falha ao iniciar o servidor:', error);
  process.exit(1);
});
