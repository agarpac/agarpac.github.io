import type { Metadata } from "next";
import CompatibilityRedirect from "../CompatibilityRedirect";

export const metadata: Metadata = {
  title: "Trayectoria — Alberto Garrido Pacheco",
  description:
    "CV de Alberto Garrido Pacheco, QA Lead especializado en calidad, automatización e ingeniería de producto.",
};

export default function CvPage() {
  return <CompatibilityRedirect href="/#cv" label="Ver el CV en su ubicación actual" />;
}
