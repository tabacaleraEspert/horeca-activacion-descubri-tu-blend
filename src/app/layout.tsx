import type { Metadata } from "next";
import { Archivo, Hanken_Grotesk } from "next/font/google";
import "./globals.css";

const archivo = Archivo({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["600", "700", "800", "900"],
});

const hanken = Hanken_Grotesk({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Van Kiff · Descubrí tu Blend",
  description:
    "Descubrí tu blend, encontrá tu mejor versión. Activación Van Kiff · Cerro Catedral.",
};

export const viewport = {
  themeColor: "#16130f",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${archivo.variable} ${hanken.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <style>{`
          :root {
            --paper: #efe7d6;
            --paper-2: #e6dcc6;
            --ink: #17130d;
            --teal: #0fb1a4;
            --orange: #eb5f0b;
            --background: var(--paper);
            --foreground: var(--ink);
          }
        `}</style>
      </head>
      <body className="min-h-full" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
