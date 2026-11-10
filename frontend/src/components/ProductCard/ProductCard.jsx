import { Link } from 'react-router-dom';
import { Pencil, Trash2 } from 'lucide-react';
import StoreTable from '../StoreTable/StoreTable.jsx';
import styles from './ProductCard.module.css';

export default function ProductCard({ product, onDelete }) {
  return (
    <article className={styles.card}>
      <span className={styles.category}>{product.category}</span>
      <h2 className={styles.title}>{product.name}</h2>
      <span className={styles.promo}>Promoção típica: até -{product.promo}%</span>
      <p><strong>Especificações:</strong> {product.specs}</p>
      {product.purpose && <p><strong>Para que serve:</strong> {product.purpose}</p>}
      <p><strong>Utilidade no escritório:</strong> {product.utility}</p>
      <StoreTable product={product} />
      <div className={styles.actions}>
        <Link to={`/produtos/${product.id}/editar`} className={styles.edit}>
          <Pencil size={14} /> Editar
        </Link>
        <button type="button" className={styles.delete} onClick={() => onDelete(product)}>
          <Trash2 size={14} /> Excluir
        </button>
      </div>
    </article>
  );
}
