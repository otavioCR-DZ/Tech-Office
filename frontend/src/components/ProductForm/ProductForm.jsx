import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './ProductForm.module.css';

const EMPTY = {
  name: '',
  category: '',
  base: '',
  promo: '0',
  query: '',
  specs: '',
  purpose: '',
  utility: '',
};

export default function ProductForm({ initialValues, categories, submitLabel, onSubmit, saving }) {
  const [values, setValues] = useState({ ...EMPTY, ...initialValues });

  function handleChange(event) {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    onSubmit({ ...values, base: Number(values.base), promo: Number(values.promo) });
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label className={styles.field}>
        Nome
        <input name="name" value={values.name} onChange={handleChange} maxLength={120} required />
      </label>

      <label className={styles.field}>
        Categoria
        <input
          name="category"
          value={values.category}
          onChange={handleChange}
          list="categorias"
          maxLength={60}
          required
        />
        <datalist id="categorias">
          {categories.map((c) => (
            <option key={c} value={c} />
          ))}
        </datalist>
      </label>

      <div className={styles.row}>
        <label className={styles.field}>
          Preço base estimado (R$)
          <input
            name="base"
            type="number"
            min="0.01"
            step="0.01"
            value={values.base}
            onChange={handleChange}
            required
          />
        </label>
        <label className={styles.field}>
          Promoção típica (%)
          <input
            name="promo"
            type="number"
            min="0"
            max="100"
            step="1"
            value={values.promo}
            onChange={handleChange}
            required
          />
        </label>
      </div>

      <label className={styles.field}>
        Termo de busca nas lojas
        <input name="query" value={values.query} onChange={handleChange} maxLength={150} required />
      </label>

      <label className={styles.field}>
        Especificações
        <textarea name="specs" rows={2} value={values.specs} onChange={handleChange} required />
      </label>

      <label className={styles.field}>
        Utilidade no escritório
        <textarea name="utility" rows={2} value={values.utility} onChange={handleChange} required />
      </label>

      <div className={styles.actions}>
        <button type="submit" className={styles.submit} disabled={saving}>
          {saving ? 'Salvando...' : submitLabel}
        </button>
        <Link to="/" className={styles.cancel}>
          Cancelar
        </Link>
      </div>
    </form>
  );
}
