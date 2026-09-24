import type { Metadata } from "next";
import { SellerAnalysisPage } from "../../components/audita/SellerAnalysisPage";

export const metadata: Metadata = {
  title: "Análise de Vendedor de Imóvel com IA",
  description: "Consulte certidões, organize documentos e identifique riscos relacionados ao vendedor antes de comprar um imóvel. Conheça a Análise de Vendedor da IA Audita.",
  alternates: { canonical: "/analise-de-vendedor" },
  openGraph: {
    title: "Antes de comprar um imóvel, conheça quem está vendendo",
    description: "Certidões, documentos e pontos de atenção organizados para você decidir com mais clareza.",
    url: "/analise-de-vendedor",
    images: [{ url: "/images/seller-diligence-hero.webp", width: 1800, height: 1002, alt: "Análise de vendedor de imóvel — IA Audita" }],
  },
};

export default function Page() { return <SellerAnalysisPage />; }
