import type { Metadata } from "next";
import { SellerAnalysisPage2 } from "../../components/audita/SellerAnalysisPage2";

export const metadata: Metadata = {
  title: "Consulte o Vendedor Antes de Comprar um Imóvel",
  description: "Consulte o CPF do vendedor, reúna certidões e identifique pontos de atenção antes de assinar, pagar ou avançar na compra do imóvel.",
  alternates: { canonical: "/analise-de-vendedor-2" },
  openGraph: {
    title: "Vai comprar um imóvel? Confira quem está vendendo.",
    description: "Uma análise simples para descobrir sinais de alerta antes de entregar seu dinheiro.",
    url: "/analise-de-vendedor-2",
    images: [{ url: "/images/hero-popular.webp", width: 1672, height: 941 }],
  },
};

export default function Page() { return <SellerAnalysisPage2 />; }
