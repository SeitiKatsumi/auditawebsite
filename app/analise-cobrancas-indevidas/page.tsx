import type { Metadata } from "next";
import { ChargeAnalysisPage } from "../../components/audita/ChargeAnalysisPage";

export const metadata: Metadata = {
  title: "Caso Itaú: Análise de Cobranças em Faturas e Extratos",
  description: "Descubra seguros e cobranças que você não reconhece em faturas do Itaú e Itaucard. A Audita organiza os documentos, os valores e as evidências.",
  alternates: { canonical: "/analise-cobrancas-indevidas" },
  openGraph: {
    title: "O Itaú cobrou um seguro que você não contratou?",
    description: "Envie faturas e extratos. A Audita encontra os lançamentos, organiza as provas e calcula o que aparece nos documentos.",
    url: "/analise-cobrancas-indevidas",
    images: [{ url: "/images/hero-cobrancas-indevidas.png", width: 1672, height: 941 }],
  },
};

export default function Page() { return <ChargeAnalysisPage />; }
