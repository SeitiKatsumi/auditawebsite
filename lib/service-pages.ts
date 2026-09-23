import pages from "../content/service-pages.json";

export type ServicePage = {
  slug: string; title: string; category: string; eyebrow: string;
  headline: string; accent: string; description: string; status?: string;
  cta: string; appHash: string; image: string; imageAlt: string;
  insight: string; intro: string; benefits: { title: string; text: string }[];
  documents: string[]; delivery: string; limit: string;
  questions: { question: string; answer: string }[];
  sources?: { label: string; url: string }[];
};
export const servicePages = pages as ServicePage[];
