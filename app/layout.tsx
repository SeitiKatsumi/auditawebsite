import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "../components/audita/SiteHeader";

const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope", display: "swap" });
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://audita.com.br";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "IA Audita | Clareza para suas decisões", template: "%s | IA Audita" },
  description: "Conheça os serviços da IA Audita: análise de vendedor, cobranças indevidas, dívidas bancárias e organização de documentos com inteligência artificial.",
  alternates: { canonical: "/" },
  openGraph: { title: "IA Audita | Clareza para suas decisões", description: "Documentos organizados e análises com inteligência artificial para apoiar suas decisões.", url: "/", siteName: "IA Audita", locale: "pt_BR", type: "website", images: [{ url: "/images/hero-popular.webp", width: 1672, height: 941 }] },
  twitter: { card: "summary_large_image", title: "IA Audita | Clareza para suas decisões", description: "Conheça nossas análises e serviços.", images: ["/images/hero-popular.webp"] },
  icons: { icon: "/images/audita-oficial-branca.png", apple: "/images/audita-oficial-branca.png" },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR"><body className={manrope.variable}><SiteHeader />{children}</body></html>;
}
