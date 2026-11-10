import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import CategoryFilter from '../../components/CategoryFilter/CategoryFilter.jsx';
import Notice from '../../components/Notice/Notice.jsx';
import ProductCard from '../../components/ProductCard/ProductCard.jsx';
import SearchBar from '../../components/SearchBar/SearchBar.jsx';
import { useDebounce } from '../../hooks/useDebounce.js';
import { productsService } from '../../services/products.service.js';
import styles from './HomePage.module.css';

export default function HomePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [categories, setCategories] = useState(['Todos']);
  const [category, setCategory] = useState('Todos');
  const [search, setSearch] = useState('');
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState(location.state?.message ?? '');
  const [error, setError] = useState('');
  const [reloadKey, setReloadKey] = useState(0);
  const debouncedSearch = useDebounce(search);

  // Limpa o estado da navegação para a mensagem não reaparecer ao atualizar a página.
  useEffect(() => {
    if (location.state?.message) navigate(location.pathname, { replace: true, state: null });
  }, []);

  useEffect(() => {
    productsService
      .categories()
      .then((list) => {
        setCategories(list);
        setCategory((current) => (list.includes(current) ? current : 'Todos'));
      })
      .catch((e) => setError(e.message));
  }, [reloadKey]);

  useEffect(() => {
    let ignore = false;
    productsService
      .list({ category, search: debouncedSearch })
      .then((data) => {
        if (ignore) return;
        setProducts(data);
        setError('');
      })
      .catch((e) => {
        if (!ignore) setError(e.message);
      });
    return () => {
      ignore = true;
    };
  }, [category, debouncedSearch, reloadKey]);

  async function handleDelete(product) {
    if (!window.confirm(`Excluir o produto "${product.name}"?`)) return;
    try {
      await productsService.remove(product.id);
      setMessage(`Produto "${product.name}" excluído com sucesso.`);
      setError('');
      setReloadKey((key) => key + 1);
    } catch (e) {
      setMessage('');
      setError(e.message);
    }
  }

  return (
    <>
      <h1 className={styles.title}>Produtos básicos de TI para o seu escritório</h1>
      <p className={styles.subtitle}>
        Compare preços estimados, veja promoções típicas e entenda a utilidade de cada item.
      </p>
      <div className={styles.controls}>
        <SearchBar value={search} onChange={setSearch} />
        <CategoryFilter categories={categories} selected={category} onSelect={setCategory} />
        {message && <Notice type="success">{message}</Notice>}
        {error && <Notice type="error">{error}</Notice>}
      </div>
      {products.length === 0 ? (
        !error && <p>Nenhum produto encontrado.</p>
      ) : (
        <section className={styles.grid}>
          {products.map((p) => (
            <ProductCard key={p.id} product={p} onDelete={handleDelete} />
          ))}
        </section>
      )}
    </>
  );
}
