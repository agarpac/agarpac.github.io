"use client";

import Link from "next/link";
import SignalField from "./SignalField";
import TransitionActions from "./TransitionActions";
import styles from "./v2.module.css";

export default function IntroCover() {
  return (
    <section className={styles.page} aria-labelledby="signal-title">
      <header className={styles.nav}>
        <Link className={styles.wordmark} href="/" aria-label="AGARPAC, inicio">
          AGARPAC<span aria-hidden="true">/</span>
        </Link>
        <p className={styles.location}>Sevilla · remoto</p>
      </header>
      <div className={styles.stage}>
        <div className={styles.copy}>
          <p className={styles.identity}>Alberto Garrido · QA Lead</p>
          <h1 id="signal-title">
            Hago visible
            <span> lo complejo.</span>
          </h1>
          <p className={styles.role}>
            QA Lead · Quality Engineering · Product Builder
          </p>
          <p className={styles.lede}>
            Conecto riesgo, automatización y producto para que los equipos
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
