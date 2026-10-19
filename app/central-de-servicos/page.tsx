import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { serviceGroups as groups } from "../../content/service-catalog";
import s from "./page.module.css";

export const metadata: Metadata = {
  title: "Central de serviços",
  description: "Conheça todas as soluções da IA Audita. Análises financeiras, documentos, imóveis, benefícios, saúde e educação em uma única central.",
  alternates: { canonical: "https://auditainteligente.com.br/central-de-servicos" },
};

export default function ServiceCenter() {
  const total = groups.reduce((sum, group) => sum + group.services.length, 0);
  return <main className={s.page}>
    <section className={s.hero}>
      <Image src="/images/services/laudos-hero.webp" alt="" fill priority sizes="100vw" className={s.heroImage}/>
      <div className={`${s.wrap} ${s.heroContent}`}><p className={s.kicker}>Central de serviços · IA Audita</p><h1>O que você precisa<br/><em>entender hoje?</em></h1><p className={s.lead}>Todas as nossas soluções em um só lugar. Encontre o serviço para sua necessidade, entenda a proposta e veja como dar o próximo passo.</p><a className={s.button} href="#catalogo">Explorar os {total} serviços <span aria-hidden="true">↓</span></a><p className={s.heroNote}>Finanças, documentos, negócios, saúde e educação.</p></div>
    </section>
    <div className={s.wrap} id="catalogo"><div className={s.catalogIntro}><div><p className={s.kicker}>Encontre sua solução</p><h2>Escolha por assunto.</h2></div><p>Os serviços em desenvolvimento ou homologação estão identificados. Consulte o escopo e as condições na página de cada solução.</p></div>
      <nav className={s.categories} aria-label="Categorias de serviços">{groups.map(group => <a key={group.id} href={`#${group.id}`}>{group.name}<span>{group.services.length}</span></a>)}</nav>
      {groups.map(group => <section className={s.category} id={group.id} key={group.id} aria-labelledby={`${group.id}-title`}><div className={s.heading}><h2 id={`${group.id}-title`}><span className={s.categoryIcon} aria-hidden="true"><Image src={`/icons/${group.icon}.svg`} alt="" width={28} height={28}/></span>{group.name}</h2><p>{group.text}</p></div><div className={s.cards}>{group.services.map(service => <article key={service.href} className={s.card}>{service.status && <span className={s.status}>{service.status}</span>}<h3>{service.name}</h3><p>{service.text}</p><Link href={service.href} aria-label={`${service.href.startsWith("https:") ? "Acessar" : "Conhecer"} ${service.name}`}>{service.href.startsWith("https:") ? "Acessar o assistente" : "Conhecer o serviço"}<span aria-hidden="true">↗</span></Link></article>)}</div></section>)}
    </div>
    <section className={s.closing}><div className={s.wrap}><p className={s.kicker}>Seu próximo passo</p><h2>Encontrou o que procura?<br/><em>Continue na IA Audita.</em></h2><p>Acesse sua conta para consultar os módulos disponíveis na plataforma.</p><a className={s.button} href="https://app.auditainteligente.com.br/">Acessar plataforma ↗</a></div></section>
    <footer className={s.footer}><div className={s.wrap}><Link href="/">IA Audita</Link><p>Inteligência para as decisões da vida.</p><nav aria-label="Links institucionais"><Link href="/politica-de-privacidade">Privacidade</Link><Link href="/termos-de-uso">Termos de uso</Link></nav></div></footer>
  </main>;
}
