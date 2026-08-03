import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope", display: "swap" });
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://audita.com.br";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "Análise de Vendedor de Imóvel com IA | Audita", template: "%s | Audita" },
  description: "Consulte certidões, organize documentos e identifique riscos relacionados ao vendedor antes de comprar um imóvel.",
  alternates: { canonical: "/analise-de-vendedor" },
  openGraph: { title: "Antes de comprar um imóvel, analise quem está vendendo.", description: "Diligência imobiliária com inteligência artificial.", url: "/analise-de-vendedor", siteName: "Audita", locale: "pt_BR", type: "website", images: [{ url: "/images/hero.webp", width: 1672, height: 941 }] },
  twitter: { card: "summary_large_image", title: "Análise de Vendedor de Imóvel com IA | Audita", description: "Mais clareza antes de assinar, pagar ou avançar na negociação.", images: ["/images/hero.webp"] },
  icons: { icon: "/images/audita-logo.png", apple: "/images/audita-logo.png" },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR"><body className={manrope.variable}>{children}</body></html>;
}
