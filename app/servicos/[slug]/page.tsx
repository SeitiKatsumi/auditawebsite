import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { servicePages } from "../../../lib/service-pages";
import styles from "./service.module.css";

export const dynamicParams = false;
export function generateStaticParams() { return servicePages.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const page = servicePages.find(page => page.slug === slug);
  if (!page) notFound();
  return { title: page.title, description: page.description, alternates: { canonical: `/servicos/${slug}` }, openGraph: { title: `${page.title} | IA Audita`, description: page.description }, twitter: { title: `${page.title} | IA Audita`, description: page.description } };
}
export default async function ServiceLanding({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = servicePages.find(page => page.slug === slug);
  if (!page) notFound();
  const appUrl = `https://app.auditainteligente.com.br/#${page.appHash}`;
  return <main className={styles.page}>
    <section className={styles.hero}>
      <div className={styles.wrap}>
        <nav className={styles.breadcrumb} aria-label="Você está aqui"><Link href="/">Início</Link><span aria-hidden="true">/</span><Link href="/#servicos">Soluções</Link><span aria-hidden="true">/</span><span>{page.category}</span></nav>
        <div className={styles.heroGrid}>
          <div><p className={styles.eyebrow}>{page.eyebrow}</p>{page.status && <p className={styles.status}>{page.status}</p>}<h1>{page.headline}<br/><em>{page.accent}</em></h1><p className={styles.lead}>{page.description}</p><div className={styles.actions}><a className={styles.button} href={appUrl}>{page.cta}<span aria-hidden="true">↗</span></a><a className={styles.textLink} href="#como-funciona">Entenda como funciona ↓</a></div><p className={styles.micro}>Informação organizada. Próximos passos mais claros.</p></div>
          <div className={styles.heroVisual}><Image src={page.image} alt={page.imageAlt} width={800} height={800} priority sizes="(max-width: 760px) 90vw, 42vw"/><p>{page.insight}</p></div>
        </div>
      </div>
    </section>
    <section className={`${styles.wrap} ${styles.intro}`}><p className={styles.eyebrow}>O que muda para você</p><h2>{page.intro}</h2><div className={styles.benefits}>{page.benefits.map(item => <article key={item.title}><h3>{item.title}</h3><p>{item.text}</p></article>)}</div></section>
    <section className={styles.workflow} id="como-funciona"><div className={`${styles.wrap} ${styles.twoColumns}`}><div><p className={styles.eyebrow}>Da informação à decisão</p><h2>Saiba o que reunir.<br/><em>Entenda o que esperar.</em></h2><p className={styles.delivery}>{page.delivery}</p><a className={styles.textLink} href={appUrl}>{page.cta} →</a></div><div className={styles.documentList}><h3>Antes de começar</h3><ul>{page.documents.map(item => <li key={item}>{item}</li>)}</ul><p>Envie documentos pessoais apenas nos canais autenticados indicados pela plataforma.</p></div></div></section>
    <section className={`${styles.wrap} ${styles.faq}`}><div><p className={styles.eyebrow}>Sem letras miúdas</p><h2>Perguntas de quem<br/>quer dar o próximo passo.</h2></div><div>{page.questions.map(item => <details key={item.question}><summary>{item.question}<span aria-hidden="true">+</span></summary><p>{item.answer}</p></details>)}<p className={styles.limit}>{page.limit}</p>{page.sources && <p className={styles.sources}>Para consultar na fonte: {page.sources.map(source => <a key={source.url} href={source.url} target="_blank" rel="noopener noreferrer">{source.label} ↗</a>)}</p>}</div></section>
    <section className={styles.closing}><div className={styles.wrap}><p className={styles.eyebrow}>IA Audita · {page.category}</p><h2>Mais clareza começa<br/>com a informação certa.</h2><a className={styles.button} href={appUrl}>{page.cta}<span aria-hidden="true">↗</span></a></div></section>
    <footer className={styles.footer}><div className={styles.wrap}><Link href="/" className={styles.brand}>IA Audita</Link><p>Inteligência para as decisões da vida.</p><nav aria-label="Links institucionais"><Link href="/#servicos">Todas as soluções</Link><Link href="/politica-de-privacidade">Privacidade</Link><Link href="/termos-de-uso">Termos de uso</Link></nav></div></footer>
  </main>;
}
