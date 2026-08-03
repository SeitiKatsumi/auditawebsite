import type { Metadata } from "next";
import { SellerAnalysisPage } from "../../components/audita/SellerAnalysisPage";

export const metadata: Metadata = {
  title: "Análise de Vendedor de Imóvel com IA",
  description: "Consulte certidões, organize documentos e identifique riscos relacionados ao vendedor antes de comprar um imóvel. Conheça a Análise de Vendedor da Audita.",
};

export default function Page() { return <SellerAnalysisPage />; }
