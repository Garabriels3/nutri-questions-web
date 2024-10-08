import type { Metadata } from "next";
import React from 'react';
import './globals.css';

export const metadata: Metadata = {
  title: "Quiz da Leticia Nutri",
  description: "Teste seus conhecimentos em nutrição!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}
