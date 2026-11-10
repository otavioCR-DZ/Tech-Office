import styles from './CategoryFilter.module.css';

export default function CategoryFilter({ categories, selected, onSelect }) {
  return (
    <div className={styles.list}>
      {categories.map((c) => (
        <button
          key={c}
          type="button"
          className={c === selected ? styles.active : styles.chip}
          onClick={() => onSelect(c)}
        >
          {c}
        </button>
      ))}
    </div>
  );
}
