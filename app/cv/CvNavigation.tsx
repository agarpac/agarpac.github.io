"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./cv.module.css";

const sections = [
  ["#perfil", "Perfil"],
  ["#trayectoria", "Trayectoria"],
  ["#capacidades", "Capacidades"],
  ["#proyectos", "Proyectos"],
  ["#formacion", "Formación"],
  ["#certificaciones", "Certificaciones"],
] as const;

function formatUnit(value: number, singular: string, plural: string) {
  return `${value} ${value === 1 ? singular : plural}`;
}

export function CompanyTenure() {
  const today = new Date();
  const totalMonths =
    (today.getFullYear() - 2017) * 12 + today.getMonth() - 9 + 1;
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;
  const parts = [
    years > 0 ? formatUnit(years, "año", "años") : null,
    months > 0 ? formatUnit(months, "mes", "meses") : null,
  ].filter(Boolean);

  // Anchored to the company named alongside it: the career list also holds
  // roles at other companies, so an unqualified "total" would read as the
  // whole career.
  return <span>{parts.join(" ")} en plantilla</span>;
}

export default function CvNavigation() {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      buttonRef.current?.focus();
    };

    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [open]);

  const renderLinks = () =>
    sections.map(([href, label]) => (
      <a key={href} href={href} onClick={() => setOpen(false)}>
        {label}
      </a>
    ));

  return (
    <>
      <nav className={styles.nav} aria-label="Secciones del currículum">
        {renderLinks()}
      </nav>
      <button
        ref={buttonRef}
        className={styles.menuButton}
        type="button"
        aria-expanded={open}
        aria-controls="cv-mobile-navigation"
        aria-label={open ? "Cerrar navegación" : "Abrir navegación"}
        onClick={() => setOpen((current) => !current)}
      >
        <span aria-hidden="true" />
        <span aria-hidden="true" />
      </button>
      <nav
        className={styles.mobileNav}
        id="cv-mobile-navigation"
        aria-label="Secciones del currículum"
        hidden={!open}
      >
        {renderLinks()}
      </nav>
    </>
  );
}
