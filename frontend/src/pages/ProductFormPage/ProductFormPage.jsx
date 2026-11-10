import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Notice from '../../components/Notice/Notice.jsx';
import ProductForm from '../../components/ProductForm/ProductForm.jsx';
import { productsService } from '../../services/products.service.js';
import styles from './ProductFormPage.module.css';

// Mesma página para cadastrar (/produtos/novo) e editar (/produtos/:id/editar).
export default function ProductFormPage() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [details, setDetails] = useState([]);

  useEffect(() => {
    productsService
      .categories()
      .then((list) => setCategories(list.filter((c) => c !== 'Todos')))
      .catch(() => {}); // as categorias são só sugestões do campo
  }, []);

  useEffect(() => {
    if (!isEdit) return;
    productsService
      .getById(id)
      .then(setProduct)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [id, isEdit]);

  async function handleSubmit(payload) {
    setSaving(true);
    setError('');
    setDetails([]);
    try {
      if (isEdit) await productsService.update(id, payload);
      else await productsService.create(payload);
      navigate('/', {
        state: {
          message: isEdit ? 'Produto atualizado com sucesso.' : 'Produto cadastrado com sucesso.',
        },
      });
    } catch (e) {
      setError(e.message);
      setDetails(e.details ?? []);
      setSaving(false);
    }
  }

  const canShowForm = !loading && (!isEdit || product);

  return (
    <>
      <h1 className={styles.title}>{isEdit ? 'Editar produto' : 'Novo produto'}</h1>
      {loading && <p>Carregando...</p>}
      {error && (
        <div className={styles.notice}>
          <Notice type="error">{[error, ...details].join(' ')}</Notice>
        </div>
      )}
      {canShowForm ? (
        <ProductForm
          initialValues={product ?? undefined}
          categories={categories}
          submitLabel={isEdit ? 'Salvar alterações' : 'Cadastrar produto'}
          onSubmit={handleSubmit}
          saving={saving}
        />
      ) : (
        !loading && <Link to="/">Voltar para o catálogo</Link>
      )}
    </>
  );
}
