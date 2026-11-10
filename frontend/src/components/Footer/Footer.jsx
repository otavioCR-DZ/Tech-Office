import Notice from '../Notice/Notice.jsx';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <Notice>
        Preços são estimativas e promoções são descontos típicos, não ofertas ao vivo. Use os
        links para conferir o valor real em cada loja.
      </Notice>
    </footer>
  );
}
