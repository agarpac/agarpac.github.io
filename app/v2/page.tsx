import type { Metadata } from "next";
import CompatibilityRedirect from "../CompatibilityRedirect";

export const metadata: Metadata = {
  title: "AGARPAC — Alberto Garrido",
  description:
    "Introducción interactiva al perfil profesional de Alberto Garrido, QA Lead y Product Builder.",
};

export default function SignalFieldPage() {
  return <CompatibilityRedirect href="/" label="Ir a la portada actual" />;
}
