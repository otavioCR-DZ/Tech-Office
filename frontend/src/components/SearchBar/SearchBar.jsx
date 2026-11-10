import { Search } from 'lucide-react';
import styles from './SearchBar.module.css';

export default function SearchBar({ value, onChange }) {
  return (
    <label className={styles.wrapper}>
      <Search size={18} />
      <input
        className={styles.input}
        type="search"
        placeholder="Buscar produto..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
}
