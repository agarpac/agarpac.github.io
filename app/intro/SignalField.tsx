"use client";

import { useState } from "react";
import DitheredObject from "../../components/canvasui/DitheredObject";
import styles from "./intro.module.css";

type SignalFieldProps = {
  className?: string;
};

export default function SignalField({ className }: SignalFieldProps) {
  const [status, setStatus] = useState<"loading" | "ready" | "error">(
    "loading",
  );

  return (
    <div
      className={`${className ?? ""} ${styles.objectStage}`}
      data-object-status={status}
      aria-hidden="true"
    >
      {status !== "ready" ? (
        <div className={styles.objectPoster} aria-hidden="true">
          <span className={styles.posterHead} />
          <span className={styles.posterBody} />
          <span className={styles.posterArmLeft} />
          <span className={styles.posterArmRight} />
          <span className={styles.posterLabel}>
            {status === "error" ? "Render estático" : "Cargando modelo"}
          </span>
        </div>
      ) : null}
      <DitheredObject
        src="/models/robot.glb"
        className={styles.objectCanvas}
        gridSize={4}
        scale={3.35}
        floatIntensity={0.65}
        rotationIntensity={0.52}
        floatSpeed={0.4}
        autoRotationSpeed={-0.17}
        orbit
        zoom={false}
        onLoad={() => setStatus("ready")}
        onError={() => setStatus("error")}
      />
    </div>
  );
}
