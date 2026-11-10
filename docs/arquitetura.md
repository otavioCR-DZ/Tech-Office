# Arquitetura e fluxo dos dados

O projeto tem duas aplicações independentes, cada uma na sua pasta:

- `frontend/`: interface em React (Vite). Não acessa o banco, só conversa com a API.
- `backend/`: API REST em Express + Sequelize, com banco SQLite em `backend/storage/`.

```text
Navegador (React)  --HTTP/JSON-->  API Express  --Sequelize-->  SQLite (database.sqlite)
   localhost:5173                  localhost:3001/api
```

## Endpoints

| Método | Rota                       | Operação CRUD | Descrição                                   |
| ------ | -------------------------- | ------------- | ------------------------------------------- |
| POST   | `/api/products`            | Create        | Cadastra um produto                         |
| GET    | `/api/products`            | Read          | Lista produtos (`?category=` e `?search=`)  |
| GET    | `/api/products/categories` | Read          | Lista as categorias existentes              |
| GET    | `/api/products/:id`        | Read          | Busca um produto                            |
| PUT    | `/api/products/:id`        | Update        | Atualiza um produto                         |
| DELETE | `/api/products/:id`        | Delete        | Exclui um produto                           |
| GET    | `/api/health`              | -             | Verifica se a API está no ar                |

Dados inválidos retornam `400` com a lista de erros; produto inexistente retorna `404`.

## Exemplo: cadastrar um produto

1. `ProductFormPage` renderiza `ProductForm` e recebe os dados digitados.
2. Ao enviar, chama `productsService.create`, que faz `POST /api/products`.
3. `productController.create` valida e grava via model `Product` (Sequelize) no SQLite.
4. A API responde `201`; o frontend volta para a `HomePage`, que busca a lista atualizada.

## Backend

| Pasta/arquivo              | Responsabilidade                                          |
| -------------------------- | --------------------------------------------------------- |
| `src/server.js`            | Sobe o servidor, cria a tabela e popula o banco           |
| `src/app.js`               | Configura Express, CORS, rotas e tratamento de erros      |
| `src/routes/`              | Mapeia URL + método para o controller                     |
| `src/controllers/`         | Lógica de cada operação do CRUD                           |
| `src/models/Product.js`    | Modelo Sequelize com as validações dos campos             |
| `src/config/database.js`   | Conexão com o SQLite                                      |
| `src/seed/`                | Catálogo inicial (16 produtos), carregado se o banco estiver vazio |

## Frontend

| Arquivo               | Responsabilidade                                                       |
| --------------------- | ---------------------------------------------------------------------- |
| `products.service.js` | Chamadas HTTP à API e cálculo do preço estimado por loja               |
| `HomePage`            | Lista, busca, filtro por categoria e exclusão                          |
| `ProductFormPage`     | Cadastro (`/produtos/novo`) e edição (`/produtos/:id/editar`)          |

## Evolução prevista

- Preços atualizados por loja guardados no banco.
- Lista de compras com total do orçamento.
