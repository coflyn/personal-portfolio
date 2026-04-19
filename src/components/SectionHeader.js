import styles from "./SectionHeader.module.css";

export default function SectionHeader({ label, title, description, children, className = "" }) {
  return (
    <div className={`${styles.header} ${className}`}>
      <div className={styles.textGroup}>
        {label && <p className="section-label">{label}</p>}
        {title && <h2 className="section-title">{title}</h2>}
        {description && <p className="section-description">{description}</p>}
      </div>
      {children}
    </div>
  );
}
