import { ExternalLink } from 'lucide-react';
import { productsService } from '../../services/products.service.js';
import { formatPrice } from '../../utils/format.js';
import styles from './StoreTable.module.css';

export default function StoreTable({ product }) {
  const prices = productsService.getStorePrices(product);
  const best = Math.min(...prices.map((p) => p.price));
  return (
    <table className={styles.table}>
      <tbody>
        {prices.map((p) => (
          <tr key={p.store}>
            <td>
              <a href={p.url} target="_blank" rel="noopener noreferrer">
                {p.store} <ExternalLink size={12} />
              </a>
            </td>
            <td className={p.price === best ? styles.best : ''}>~{formatPrice(p.price)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
