// Os produtos vêm da API (backend). Os preços por loja continuam sendo ESTIMATIVAS
// calculadas aqui a partir do preço base (`base`) de cada produto.
const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3001/api';

const slug = (q) => q.replace(/ /g, '-');
const enc = encodeURIComponent;
const STORES = [
  { name: 'Mercado Livre', factor: 0.97, url: (q) => `https://lista.mercadolivre.com.br/${slug(q)}` },
  { name: 'Amazon', factor: 1, url: (q) => `https://www.amazon.com.br/s?k=${enc(q)}` },
  { name: 'KaBuM!', factor: 0.95, url: (q) => `https://www.kabum.com.br/busca/${slug(q)}` },
  { name: 'Magazine Luiza', factor: 1.04, url: (q) => `https://www.magazineluiza.com.br/busca/${enc(q)}/` },
  { name: 'Shopee', factor: 0.92, url: (q) => `https://shopee.com.br/search?keyword=${enc(q)}` },
];

async function request(path, { body, ...options } = {}) {
  let response;
  try {
    response = await fetch(`${API_URL}${path}`, {
      ...options,
      headers: body ? { 'Content-Type': 'application/json' } : undefined,
      body: body ? JSON.stringify(body) : undefined,
    });
  } catch {
    throw new Error('Não foi possível conectar ao servidor. Verifique se o backend está rodando.');
  }

  if (response.status === 204) return null;

  const data = await response.json().catch(() => null);
  if (!response.ok) {
    const error = new Error(data?.message ?? 'Erro ao comunicar com o servidor.');
    error.details = data?.errors ?? [];
    throw error;
  }
  return data;
}

export const productsService = {
  // READ
  list({ category = 'Todos', search = '' } = {}) {
    const params = new URLSearchParams();
    if (category !== 'Todos') params.set('category', category);
    if (search.trim()) params.set('search', search.trim());
    const query = params.toString();
    return request(`/products${query ? `?${query}` : ''}`);
  },
  async categories() {
    return ['Todos', ...(await request('/products/categories'))];
  },
  getById(id) {
    return request(`/products/${id}`);
  },
  // CREATE
  create(product) {
    return request('/products', { method: 'POST', body: product });
  },
  // UPDATE
  update(id, product) {
    return request(`/products/${id}`, { method: 'PUT', body: product });
  },
  // DELETE
  remove(id) {
    return request(`/products/${id}`, { method: 'DELETE' });
  },
  getStorePrices(product) {
    return STORES.map((s) => ({
      store: s.name,
      price: product.base * s.factor,
      url: s.url(product.query),
    }));
  },
};
