import Link from "next/link";
import Image from "next/image";
import type { ServicePage } from "../../lib/service-pages";
import s from "./services.module.css";

export function ServiceHeroPhoto({ name, alt, title }: { name: string; alt: string; title: string }) {
  const documents: Record<string, { title: string; items: string[] }> = {
    pis: { title: "Organização documental", items: ["Titular e beneficiários", "Histórico profissional", "Documentos a reunir"] },
    ir: { title: "Conferência de requisitos", items: ["Origem dos rendimentos", "Documentação médica", "Datas e retenções"] },
    importacao: { title: "Revisão de importação", items: ["Invoice e packing list", "Classificação fiscal", "Tributos e premissas"] },
    energia: { title: "Leitura da conta de luz", items: ["Consumo e histórico", "Tarifas e lançamentos", "Pontos para conferir"] },
    laudos: { title: "Memória de cálculo", items: ["Principal e datas", "Correção e juros", "Composição do total"] },
  };
  const document = documents[name];
  return <figure className={s.heroPhoto} aria-label={title}><Image src={`/images/services/${name}-hero.webp`} alt={alt} width={1440} height={960} priority sizes="(max-width: 760px) 100vw, 70vw"/><div className={s.heroDocument}><small>Modelo ilustrativo</small><strong>{document.title}</strong><ul>{document.items.map((item, index) => <li key={item}><span aria-hidden="true">0{index + 1}</span><div>{item}<i aria-hidden="true"/></div></li>)}</ul><p>IA Audita <span>Informação com clareza.</span></p></div><figcaption><small>Imagem ilustrativa gerada por IA</small></figcaption></figure>;
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
