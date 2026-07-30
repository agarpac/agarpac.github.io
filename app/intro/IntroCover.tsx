"use client";

import SignalField from "./SignalField";
import TransitionActions from "./TransitionActions";
import styles from "./intro.module.css";

export default function IntroCover() {
  return (
    <section className={styles.page} id="inicio" aria-labelledby="signal-title">
      <header className={styles.nav}>
        <a className={styles.wordmark} href="#inicio" aria-label="AGARPAC, inicio">
          AGARPAC<span aria-hidden="true">/</span>
        </a>
        <p className={styles.location}>Sevilla · remoto</p>
      </header>
      <div className={styles.stage}>
        <div className={styles.copy}>
          <p className={styles.identity}>Alberto Garrido · QA Lead</p>
          <h1 id="signal-title">
            Calidad que comprende.
            <span>
              Ingenier<span className={styles.accent}>IA</span> que mejora.
            </span>
          </h1>
          <p className={styles.role}>
            Quality Engineering · Automatización · Entrega continua
          </p>
          <p className={styles.lede}>
            Conecto riesgo, automatización y herramientas para que los equipos
            tomen mejores decisiones y avancen con confianza.
          </p>
          <TransitionActions />
        </div>
        <div className={styles.fieldWrap}>
          <SignalField className={styles.canvas} />
        </div>
      </div>
    </section>
  );
}
