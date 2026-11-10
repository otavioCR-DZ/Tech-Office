# TechOffice

![React](https://img.shields.io/badge/React-19-149ECA?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)
![Express](https://img.shields.io/badge/Express-4-000000?logo=express&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-Sequelize-003B57?logo=sqlite&logoColor=white)
![Status](https://img.shields.io/badge/Status-Em%20desenvolvimento-orange)

> **Vitrine pessoal de produtos básicos de TI para escritório**, com especificações, utilidade de cada item e preço estimado nas lojas mais acessadas do Brasil.

## Problema e Solução

Montar a estrutura de TI de um escritório exige pesquisar item por item em várias lojas. O **TechOffice** reúne em uma interface simples os produtos essenciais, explica para que serve cada um e compara o preço estimado em cada loja, com link direto para conferir o valor real.

Pela interface é possível **cadastrar, listar, editar e excluir** produtos (CRUD completo), com os dados guardados em banco de dados.

## Tecnologias

**Frontend** (`frontend/`)

- **React 19:** interface baseada em componentes.
- **Vite:** ambiente de desenvolvimento e build.
- **React Router DOM:** navegação entre páginas.
- **CSS Modules:** isolamento dos estilos.
- **Lucide React:** ícones.

**Backend** (`backend/`)

- **Node.js + Express:** API REST.
- **Sequelize + SQLite:** modelo e banco de dados em arquivo (não precisa instalar servidor de banco).
- **CORS:** libera o acesso do frontend à API.

## Como executar

Requer Node.js 22.12 ou superior. Abra **dois terminais**:

```bash
# Terminal 1 - Backend (http://localhost:3001/api)
cd backend
npm install
npm start
```

```bash
# Terminal 2 - Frontend (http://localhost:5173)
cd frontend
npm install
npm run dev
```

Na primeira execução o backend cria o banco em `backend/storage/database.sqlite` e carrega 16 produtos iniciais. Para voltar ao catálogo inicial, pare o backend, apague esse arquivo e inicie novamente.

Variáveis opcionais: veja `backend/.env.example` e `frontend/.env.example`.

## Estrutura

```text
.
├── backend/
│   ├── src/
│   │   ├── config/        conexão com o banco
│   │   ├── models/        modelo Product (Sequelize)
│   │   ├── controllers/   lógica do CRUD
│   │   ├── routes/        rotas da API
│   │   ├── seed/          produtos iniciais
│   │   ├── app.js
│   │   └── server.js
│   └── storage/           banco SQLite (fora do Git)
├── frontend/
│   └── src/
│       ├── components/    componentes reutilizáveis (cada um com seu .module.css)
│       ├── pages/         HomePage, ProductFormPage, NotFoundPage
│       ├── services/      comunicação com a API e cálculo de preços
│       ├── hooks/         hooks reutilizáveis (useDebounce)
│       ├── utils/         funções auxiliares (formatPrice)
│       └── styles/        estilos globais
└── docs/                  documentação
```

## Aviso sobre preços

Os preços são **estimativas** (faixas médias de mercado) e as promoções são **descontos típicos**, não ofertas ao vivo. Os links abrem a busca do produto em cada loja. Para atualizar, edite o produto pela própria interface (botão **Editar**).

Veja também: [CONTRIBUTING.md](CONTRIBUTING.md) e [docs/arquitetura.md](docs/arquitetura.md).
