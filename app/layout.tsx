import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const htmlInCanvasOriginTrial =
  "Ars5o1j/IrggUPHjAHCzdSB9bqAe/sK/U0cnH+x0Xdiuk4JttDZmuqsmYEbKBJ0J9vRF6G0OSBes4DpCPOiuaAAAAABXeyJvcmlnaW4iOiJodHRwczovL2FnYXJwYWMuZ2l0aHViLmlvOjQ0MyIsImZlYXR1cmUiOiJIVE1MSW5DYW52YXMiLCJleHBpcnkiOjE3OTI0NTQ0MDB9";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Alberto Garrido — QA Lead · Automation",
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
    title: "Alberto Garrido — Calidad y automatización",
    description:
      "Calidad para comprender productos. Ingeniería para mejorarlos.",
    type: "profile",
    locale: "es_ES",
  },
  twitter: {
    card: "summary",
    title: "Alberto Garrido — QA Lead · Automation",
    description:
      "Calidad para comprender productos. Ingeniería para mejorarlos.",
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "16x16 32x32 48x48" },
    ],
    shortcut: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <meta httpEquiv="origin-trial" content={htmlInCanvasOriginTrial} />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
