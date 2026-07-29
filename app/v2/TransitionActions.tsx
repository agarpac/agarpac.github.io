import styles from "./v2.module.css";

export default function TransitionActions() {
  return (
    <div className={styles.actions}>
      <a className={styles.primaryAction} href="#cv">
        Explorar trayectoria
        <span aria-hidden="true">↘</span>
      </a>
      <div className={styles.secondaryActions}>
        <a href="https://www.linkedin.com/in/agarpac/">
          LinkedIn <span aria-hidden="true">↗</span>
        </a>
        <a href="https://github.com/agarpac">
          GitHub <span aria-hidden="true">↗</span>
        </a>
      </div>
    </div>
  );
}
