import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import approaches from "../../content/seller-approaches.json";
import s from "./page.module.css";

export const metadata: Metadata = {
  title: "Central de serviços",
  description: "Conheça todas as soluções da IA Audita. Análises financeiras, documentos, imóveis, benefícios, saúde e educação em uma única central.",
  alternates: { canonical: "https://auditainteligente.com.br/central-de-servicos" },
};

type Service = { name: string; text: string; href: string; status?: string };
const groups: { id: string; name: string; text: string; services: Service[] }[] = [
  { id: "financeiro", name: "Financeiro e tributos", text: "Entenda cobranças, confira valores e organize sua documentação financeira.", services: [
    { name: "Cobranças indevidas · Caso Itaú", text: "Localize seguros e tarifas não reconhecidos em faturas e extratos e organize as evidências em um relatório técnico.", href: "/analise-cobrancas-indevidas" },
    { name: "Dívidas bancárias", text: "Confira contratos, juros, tarifas e evolução do saldo para apoiar a revisão da dívida e a negociação com o banco.", href: "/servicos/dividas-bancarias" },
    { name: "Atualização financeira e cálculos judiciais", text: "Organize a atualização de valores e a memória de cálculo em um relatório para revisão e apoio ao processo.", href: "/servicos/laudos-de-processos-judiciais" },
    { name: "Contas de luz", text: "Confira consumo, tarifas e cobranças nas faturas de energia e reúna informações para solicitar uma revisão.", href: "/servicos/revisao-contas-de-luz" },
    { name: "Auditoria de importação", text: "Cruze documentos da operação, classificação fiscal e possíveis benefícios para apoiar a análise dos tributos da importação.", href: "/servicos/auditoria-de-importacao", status: "Recebimento ainda não habilitado" },
  ] },
  { id: "beneficios", name: "Benefícios e direitos", text: "Conheça propostas de análise para seu histórico e seus documentos.", services: [
    { name: "Cotas antigas do PIS/PASEP", text: "Apoio a titulares e herdeiros na consulta de cotas antigas, organização de documentos e acompanhamento das etapas do pedido.", href: "/servicos/pis-pasep" },
    { name: "Isenção e restituição de IR", text: "Organize laudos e comprovantes para avaliar a isenção por moléstia grave em aposentadorias, pensões e situações previstas.", href: "/servicos/isencao-imposto-de-renda" },
    { name: "Auxílio-acidente", text: "Análise proposta do histórico previdenciário e das limitações após um acidente, com documentos e possíveis valores para avaliação.", href: "/servicos/auxilio-acidente", status: "Em desenvolvimento" },
  ] },
  { id: "imoveis", name: "Imóveis", text: "Mais contexto antes de comprar, consultar ou alugar.", services: [
    { name: "Análise do vendedor de imóvel", text: "Reúna certidões e documentos para conhecer quem está vendendo e identificar pontos de atenção antes de fechar negócio.", href: "/analise-de-vendedor" },
    { name: "Consulta de imóveis", text: "Conheça os canais de pesquisa de informações imobiliárias e o escopo das consultas em validação.", href: "/servicos/consulta-de-imoveis", status: "Em homologação" },
    ...approaches.filter(p => p.slug === "analise-para-locacao").map(p => ({ name: p.title, text: p.description, href: `/servicos/${p.slug}` })),
  ] },
  { id: "negocios", name: "Pessoas e negócios", text: "Documentos e registros para decisões sobre sociedades, contratos e parceiros.", services: approaches.filter(p => p.slug !== "analise-para-locacao").map(p => ({ name: p.title, text: p.description, href: `/servicos/${p.slug}` })) },
  { id: "saude", name: "Saúde e faturamento", text: "Informações organizadas para a equipe e para o cuidado.", services: [
    { name: "Auditoria de glosas", text: "Confira demonstrativos, contratos e autorizações para entender divergências e preparar relatórios e minutas de contestação.", href: "/servicos/auditoria-de-glosas", status: "Em desenvolvimento" },
    { name: "Laudos e exames", text: "Proposta para reunir informações de exames em uma linha do tempo e ajudar a preparar perguntas para o médico.", href: "/servicos/laudos-de-exames", status: "Em desenvolvimento" },
  ] },
  { id: "ia-e-educacao", name: "Inteligência artificial e educação", text: "Apoio no dia a dia e novas formas de descobrir o mundo.", services: [
    { name: "Assistente IA Audita", text: "Converse, resuma documentos, organize ideias e encontre informações em textos, PDFs e imagens.", href: "https://app.auditainteligente.com.br/chat" },
    { name: "Audita Kids", text: "Uma jornada de jogos, descobertas e um álbum digital de figurinhas para aprender em família com Auditron.", href: "/servicos/audita-kids", status: "Em desenvolvimento" },
  ] },
];

export default function ServiceCenter() {
  const total = groups.reduce((sum, group) => sum + group.services.length, 0);
  return <main className={s.page}>
    <section className={s.hero}>
      <Image src="/images/services/laudos-hero.webp" alt="" fill priority sizes="100vw" className={s.heroImage}/>
      <div className={`${s.wrap} ${s.heroContent}`}><p className={s.kicker}>Central de serviços · IA Audita</p><h1>O que você precisa<br/><em>entender hoje?</em></h1><p className={s.lead}>Todas as nossas soluções em um só lugar. Encontre o serviço para sua necessidade, entenda a proposta e veja como dar o próximo passo.</p><a className={s.button} href="#catalogo">Explorar os {total} serviços <span aria-hidden="true">↓</span></a><p className={s.heroNote}>Finanças, documentos, negócios, saúde e educação.</p></div>
    </section>
    <div className={s.wrap} id="catalogo"><div className={s.catalogIntro}><div><p className={s.kicker}>Encontre sua solução</p><h2>Escolha por assunto.</h2></div><p>Os serviços em desenvolvimento ou homologação estão identificados. Consulte o escopo e as condições na página de cada solução.</p></div>
      <nav className={s.categories} aria-label="Categorias de serviços">{groups.map(group => <a key={group.id} href={`#${group.id}`}>{group.name}<span>{group.services.length}</span></a>)}</nav>
      {groups.map(group => <section className={s.category} id={group.id} key={group.id} aria-labelledby={`${group.id}-title`}><div className={s.heading}><h2 id={`${group.id}-title`}>{group.name}</h2><p>{group.text}</p></div><div className={s.cards}>{group.services.map(service => <article key={service.href} className={s.card}>{service.status && <span className={s.status}>{service.status}</span>}<h3>{service.name}</h3><p>{service.text}</p><Link href={service.href} aria-label={`${service.href.startsWith("https:") ? "Acessar" : "Conhecer"} ${service.name}`}>{service.href.startsWith("https:") ? "Acessar o assistente" : "Conhecer o serviço"}<span aria-hidden="true">↗</span></Link></article>)}</div></section>)}
    </div>
    <section className={s.closing}><div className={s.wrap}><p className={s.kicker}>Seu próximo passo</p><h2>Encontrou o que procura?<br/><em>Continue na IA Audita.</em></h2><p>Acesse sua conta para consultar os módulos disponíveis na plataforma.</p><a className={s.button} href="https://app.auditainteligente.com.br/">Acessar plataforma ↗</a></div></section>
    <footer className={s.footer}><div className={s.wrap}><Link href="/">IA Audita</Link><p>Inteligência para as decisões da vida.</p><nav aria-label="Links institucionais"><Link href="/politica-de-privacidade">Privacidade</Link><Link href="/termos-de-uso">Termos de uso</Link></nav></div></footer>
  </main>;
}
