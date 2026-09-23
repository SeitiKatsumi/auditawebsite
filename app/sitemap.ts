import type { MetadataRoute } from "next";
import { servicePages } from "../lib/service-pages";
export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://auditainteligente.com.br";
  return ["/", "/analise-de-vendedor", "/analise-de-vendedor-2", "/analise-cobrancas-indevidas", "/politica-de-privacidade", "/termos-de-uso", ...servicePages.map(page => `/servicos/${page.slug}`)].map(path => ({ url: `${base}${path}`, lastModified: new Date(), changeFrequency: "monthly", priority: path === "/" ? 1 : .7 }));
}
