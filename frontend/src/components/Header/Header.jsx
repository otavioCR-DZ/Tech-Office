import { Link } from 'react-router-dom';
import { Monitor, Plus } from 'lucide-react';
import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <Link to="/" className={styles.brand}>
        <Monitor size={24} /> TechOffice
      </Link>
      <span className={styles.tagline}>TI básico para escritório</span>
      <Link to="/produtos/novo" className={styles.newButton}>
        <Plus size={16} /> Novo produto
      </Link>
    </header>
  );
}
