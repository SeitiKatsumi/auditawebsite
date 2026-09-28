import Link from "next/link";
import Image from "next/image";
import type { ServicePage } from "../../lib/service-pages";
import s from "./services.module.css";

export function ServiceHeroPhoto({ name, alt, title }: { name: string; alt: string; title: string }) {
  return <figure className={s.heroPhoto} aria-label={title}><Image src={`/images/services/${name}-hero.webp`} alt={alt} width={1440} height={960} priority sizes="(max-width: 760px) 100vw, 70vw"/><figcaption><small>Imagem ilustrativa gerada por IA</small></figcaption></figure>;
}

export function ServiceAction({ page }: { page: ServicePage }) {
  return <a className={s.button} href={`https://app.auditainteligente.com.br/#${page.appHash}`}>{page.cta}<span aria-hidden="true">↗</span></a>;
}

export function ServiceEnd({ page, title, text, faqTitle }: { page: ServicePage; title: string; text: string; faqTitle: string }) {
  return <>
    <section className={`${s.wrap} ${s.faq}`} id="duvidas">
      <div><p className={s.kicker}>Respostas para seguir em frente</p><h2>{faqTitle}</h2><p className={s.note}>{page.limit}</p></div>
      <div>{page.questions.map(item => <details key={item.question}><summary>{item.question}<span aria-hidden="true">+</span></summary><p>{item.answer}</p></details>)}</div>
    </section>
    <section className={s.closing}><div className={s.wrap}><p className={s.kicker}>Seu próximo passo</p><h2>{title}</h2><p>{text}</p><ServiceAction page={page}/>{page.status && <small>{page.status}</small>}</div></section>
    <footer className={s.footer}><div className={s.wrap}><div className={s.sourceLinks}><strong>Fontes para aprofundar</strong>{page.sources?.map(source => <a key={source.url} href={source.url} target="_blank" rel="noopener noreferrer">{source.label} ↗</a>)}</div><div className={s.footerRow}><Link href="/" className={s.brand}>IA Audita</Link><span>Inteligência a serviço das pessoas.</span><nav aria-label="Links institucionais"><Link href="/#servicos">Todas as soluções</Link><Link href="/politica-de-privacidade">Privacidade</Link><Link href="/termos-de-uso">Termos de uso</Link></nav></div></div></footer>
  </>;
}
