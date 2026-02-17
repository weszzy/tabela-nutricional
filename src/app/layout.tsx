import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Gerador de Tabela Nutricional ANVISA | Gratuito e Online",
  description: "Crie tabelas nutricionais conforme RDC 429/2020 e IN 75/2020 da ANVISA. Exportação em PNG e PDF. Ferramenta gratuita para produtores artesanais e indústrias alimentícias.",
  keywords: [
    "tabela nutricional",
    "ANVISA",
    "RDC 429/2020",
    "IN 75/2020",
    "rotulagem nutricional",
    "gerador de rótulo",
    "informação nutricional",
    "valor diário",
    "exportar tabela nutricional",
  ],
  authors: [{ name: "Daniel Dutra" }],
  creator: "Daniel Dutra",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    title: "Gerador de Tabela Nutricional ANVISA",
    description: "Ferramenta gratuita para criar tabelas nutricionais conforme padrão ANVISA",
    siteName: "Tabela Nutricional ANVISA",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gerador de Tabela Nutricional ANVISA",
    description: "Crie tabelas nutricionais conforme RDC 429/2020",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
