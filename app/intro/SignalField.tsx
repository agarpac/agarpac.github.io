"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import DitheredObject from "../../components/canvasui/DitheredObject";
import { useParticleScrollOverlay } from "../../components/canvasui/ParticleScroll";
import styles from "./intro.module.css";

type SignalFieldProps = {
  className?: string;
};

export default function SignalField({ className }: SignalFieldProps) {
  const placeholderRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const { active: overlayActive, target: overlayTarget } =
    useParticleScrollOverlay();
  const [status, setStatus] = useState<"loading" | "ready" | "error">(
    "loading",
  );

  useEffect(() => {
    if (!overlayActive || !overlayTarget) return;

    const placeholder = placeholderRef.current;
    const overlay = overlayRef.current;
    if (!placeholder || !overlay) return;

    let frame = 0;
    const sync = () => {
      frame = 0;
      const placeholderRect = placeholder.getBoundingClientRect();
      const targetRect = overlayTarget.getBoundingClientRect();
      const visible =
        placeholderRect.bottom > targetRect.top &&
        placeholderRect.top < targetRect.bottom &&
        placeholderRect.right > targetRect.left &&
        placeholderRect.left < targetRect.right;

      overlay.style.width = `${placeholderRect.width}px`;
      overlay.style.height = `${placeholderRect.height}px`;
      overlay.style.transform = `translate3d(${placeholderRect.left - targetRect.left}px, ${placeholderRect.top - targetRect.top}px, 0)`;
      overlay.style.visibility = visible ? "visible" : "hidden";
    };
    const scheduleSync = () => {
      if (!frame) frame = requestAnimationFrame(sync);
    };

    const resizeObserver = new ResizeObserver(scheduleSync);
    resizeObserver.observe(placeholder);
    resizeObserver.observe(overlayTarget);
    document.addEventListener("scroll", scheduleSync, true);
    window.addEventListener("resize", scheduleSync);
    scheduleSync();

    return () => {
      if (frame) cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      document.removeEventListener("scroll", scheduleSync, true);
      window.removeEventListener("resize", scheduleSync);
    };
  }, [overlayActive, overlayTarget]);

  const object = (
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
  );

  return (
    <div
      ref={placeholderRef}
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
      {!overlayActive ? object : null}
      {overlayActive && overlayTarget
        ? createPortal(
            <div
              ref={overlayRef}
              className={styles.objectOverlay}
              data-object-status={status}
              aria-hidden="true"
            >
              {object}
            </div>,
            overlayTarget,
          )
        : null}
    </div>
  );
}
