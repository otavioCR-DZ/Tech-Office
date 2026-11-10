import { CircleAlert, CircleCheck, Info } from 'lucide-react';
import styles from './Notice.module.css';

const ICONS = { info: Info, success: CircleCheck, error: CircleAlert };

export default function Notice({ children, type = 'info' }) {
  const Icon = ICONS[type];
  return (
    <p className={`${styles.notice} ${styles[type]}`} role={type === 'error' ? 'alert' : undefined}>
      <Icon size={16} /> <span>{children}</span>
    </p>
  );
}
