import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Alberto Garrido — QA Lead · Automation · Product",
  description:
    "Portfolio de Alberto Garrido Pacheco, QA Lead especializado en liderazgo de calidad, automatización, entrega continua e ingeniería de producto.",
  authors: [{ name: "Alberto Garrido Pacheco" }],
  keywords: [
    "Alberto Garrido",
    "QA Lead",
    "Quality Assurance",
    "Test Automation",
    "CI/CD",
    "Software Engineering",
    "Sevilla",
  ],
  openGraph: {
    title: "Alberto Garrido — Calidad, automatización y producto",
    description:
      "Calidad para comprender sistemas. Ingeniería para mejorarlos.",
    type: "profile",
    locale: "es_ES",
  },
  twitter: {
    card: "summary",
    title: "Alberto Garrido — QA Lead · Automation · Product",
    description:
      "Calidad para comprender sistemas. Ingeniería para mejorarlos.",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
