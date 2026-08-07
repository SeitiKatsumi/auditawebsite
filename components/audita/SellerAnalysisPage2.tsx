"use client";

import Image from "next/image";
import Link from "next/link";
import { MouseEvent, useEffect, useState } from "react";
import styles from "./SellerAnalysisPage2.module.css";

declare global {
  interface Window { dataLayer?: Record<string, unknown>[]; }
}

const appUrl = "https://app.auditainteligente.com.br/";

const risks = [
  ["Documentação", "Casa ou terreno sem registro claro", "Posse, cessão de direitos ou documentação incompleta podem mudar toda a segurança da compra."],
  ["Dívidas", "Dívidas que você não conhecia", "Processos civis, fiscais ou trabalhistas podem exigir uma análise antes de qualquer pagamento."],
  ["Processos", "Venda durante um processo", "Uma negociação pode ser questionada quando há sinais de fraude à execução ou disputa judicial."],
  ["Vínculos", "Vendedor ligado a empresas", "Vínculos com CNPJs e outras pessoas podem revelar situações que não aparecem numa busca simples."],
  ["Direitos", "Mais de uma pessoa com direitos", "Herdeiros, cônjuges, sócios ou terceiros podem precisar participar da negociação."],
  ["Contexto", "Documento que não conta a história toda", "Uma certidão isolada raramente mostra o cenário completo. É preciso organizar e cruzar informações."],
];

const faqs = [
  ["A Audita analisa o imóvel?", "Esta análise é focada no vendedor. Matrícula, situação física e documentação do imóvel precisam de uma verificação própria e complementar."],
  ["Apareceu um processo. Devo desistir da compra?", "Não necessariamente. Uma ocorrência precisa ser entendida no contexto. O relatório ajuda você a saber o que perguntar e quando buscar apoio especializado."],
  ["A análise garante que não vou ter prejuízo?", "Não. Nenhuma consulta promete risco zero. A Audita organiza fontes disponíveis e destaca pontos de atenção para você decidir com mais informação."],
  ["O resultado sai na hora?", "O tempo depende da disponibilidade dos órgãos e das fontes consultadas. Você acompanha o andamento e recebe os documentos organizados."],
];

function track(event: string, payload: Record<string, unknown> = {}) {
  if (typeof window !== "undefined") window.dataLayer?.push({ event, landing_version: "popular_v2", ...payload });
}

function Logo() {
  return <Image src="/images/audita-oficial-branca.png" width={800} height={600} alt="Audita" className={styles.logo} priority />;
}

export function SellerAnalysisPage2() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => { track("view_seller_analysis_lp_v2"); }, []);

  function goToApp(event: MouseEvent<HTMLAnchorElement>, placement: string) {
    event.preventDefault();
    const query = new URLSearchParams(window.location.search);
    query.set("origem", "landing-popular");
    track("click_v2_cta", { placement });
    window.location.href = `${appUrl}?${query.toString()}`;
  }

  return <main className={styles.page}>
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/analise-de-vendedor-2" aria-label="Audita — início"><Logo /></Link>
        <nav className={menuOpen ? `${styles.nav} ${styles.navOpen}` : styles.nav} aria-label="Navegação principal">
          <a href="#riscos" onClick={() => setMenuOpen(false)}>O que pode dar errado</a>
          <a href="#como-funciona" onClick={() => setMenuOpen(false)}>Como funciona</a>
          <a href="#duvidas" onClick={() => setMenuOpen(false)}>Dúvidas</a>
        </nav>
        <a className={`${styles.button} ${styles.headerButton}`} href={appUrl} onClick={(event) => goToApp(event, "header")}>Analisar vendedor</a>
        <button className={styles.menuButton} aria-label="Abrir menu" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}><span/><span/><span/></button>
      </div>
    </header>

    <section className={styles.hero}>
      <Image src="/images/hero-popular.webp" fill priority sizes="100vw" alt="Casal brasileiro conferindo documentos antes de comprar uma casa" className={styles.heroImage} />
      <div className={styles.heroShade}/>
      <div className={`${styles.container} ${styles.heroContent}`}>
        <p className={styles.eyebrow}>Antes de entregar seu dinheiro</p>
        <h1>Vai comprar um imóvel?<br/><em>Confira quem está vendendo.</em></h1>
        <p className={styles.heroText}>Uma dívida, um processo ou um documento irregular pode transformar o sonho da casa própria em um problemão. A Audita consulta o CPF do vendedor e mostra os sinais de alerta em linguagem simples.</p>
        <div className={styles.heroActions}>
          <a className={styles.button} href={appUrl} onClick={(event) => goToApp(event, "hero")}>Começar auditoria do CPF agora <span>→</span></a>
        </div>
        <div className={styles.heroProof}>
          <span>✓ Certidões oficiais</span><span>✓ Documentos organizados</span><span>✓ Análise assistida por IA</span><span>✓ Parecer objetivo</span>
        </div>
      </div>
    </section>

    <section className={styles.realityStrip}>
      <div className={styles.container}>
        <strong>O imóvel parece perfeito.</strong>
        <span>Mas você já pesquisou a pessoa que vai receber o seu dinheiro?</span>
      </div>
    </section>

    <section className={styles.warning} id="riscos">
      <div className={styles.container}>
        <div className={styles.centerHeading}>
          <p className={styles.kicker}>Não compre no escuro</p>
          <h2>Uma compra mal feita pode levar embora <em>anos de economia.</em></h2>
          <p>Antes de assinar contrato, pagar sinal ou fazer transferência, veja o que pode estar escondido por trás do vendedor.</p>
        </div>
        <div className={styles.riskGrid}>{risks.map(([category, title, description]) => <article className={styles.riskCard} key={title}>
          <span className={styles.riskCategory}>{category}</span>
          <h3>{title}</h3><p>{description}</p>
        </article>)}</div>
        <p className={styles.disclaimer}>Uma ocorrência isolada não significa que a compra é inviável. Cada situação precisa ser entendida dentro do seu contexto.</p>
      </div>
    </section>

    <section className={styles.story}>
      <div className={`${styles.container} ${styles.storyGrid}`}>
        <div className={styles.storyImage}>
          <Image src="/images/risco-compra-popular.webp" fill sizes="(max-width: 860px) 100vw, 48vw" alt="Casal conferindo contrato, documentos e chaves de um imóvel" />
        </div>
        <div className={styles.storyCopy}>
          <p className={styles.kicker}>Pense antes de transferir</p>
          <h2>Você colocaria as economias da família numa compra sem olhar quem está vendendo?</h2>
          <p>Imagine pagar por uma casa, investir em melhorias e só depois descobrir que havia disputa de posse, documentação incompleta ou direitos de terceiros.</p>
          <div className={styles.decisionNote}>
            <span>Antes da assinatura</span>
            <p>Chegue à mesa com perguntas melhores — e não descubra depois que faltava uma checagem.</p>
          </div>
          <p className={styles.exampleNote}>Exemplo ilustrativo. O alcance da análise depende dos dados fornecidos e da disponibilidade das fontes consultadas.</p>
          <a className={styles.textLink} href={appUrl} onClick={(event) => goToApp(event, "story")}>Quero conferir antes de pagar →</a>
        </div>
      </div>
    </section>

    <section className={styles.how} id="como-funciona">
      <div className={`${styles.container} ${styles.howLayout}`}>
        <div className={styles.howIntro}>
          <p className={styles.kicker}>Sem complicação</p>
          <h2>Um CPF entra.<br/><em>O que importa sai organizado.</em></h2>
          <p>Sem linguagem de cartório e sem dezenas de abas abertas. Você informa o vendedor; a Audita devolve o que merece sua atenção.</p>
          <a className={styles.button} href={appUrl} onClick={(event) => goToApp(event, "how_it_works")}>Começar minha análise →</a>
        </div>
        <div className={styles.processStack}>
          <article className={styles.processItem}><span>Você informa</span><div><h3>CPF e dados básicos do vendedor</h3><p>O ponto de partida para saber quem está do outro lado da compra.</p></div></article>
          <article className={`${styles.processItem} ${styles.processAccent}`}><span>A Audita cruza</span><div><h3>Certidões, vínculos e ocorrências</h3><p>As fontes disponíveis são reunidas e lidas como uma história, não como PDFs soltos.</p></div></article>
          <article className={styles.processItem}><span>Você recebe</span><div><h3>Documentos e sinais de alerta</h3><p>Uma visão clara do que perguntar antes de assinar ou transferir.</p></div></article>
        </div>
      </div>
    </section>

    <section className={styles.deliverables}>
      <div className={`${styles.container} ${styles.deliverablesGrid}`}>
        <div>
          <p className={styles.kicker}>Tudo num só lugar</p>
          <h2>Chega de abrir dezenas de sites e guardar PDF solto.</h2>
          <p>A Audita organiza tudo e te entrega uma análise completa e resumida, com tudo o que você precisa saber para comprar com tranquilidade.</p>
        </div>
        <div className={styles.checkList}>
          <div><b>✓</b><span><strong>Dados conferidos</strong><small>Validação das informações básicas</small></span></div>
          <div><b>✓</b><span><strong>Certidões reunidas</strong><small>Documentos disponíveis centralizados</small></span></div>
          <div><b>✓</b><span><strong>Pontos de atenção</strong><small>Ocorrências destacadas com clareza</small></span></div>
          <div><b>✓</b><span><strong>Relatório em PDF</strong><small>Material organizado para consultar e compartilhar</small></span></div>
        </div>
      </div>
    </section>

    <section className={styles.faq} id="duvidas">
      <div className={`${styles.container} ${styles.faqGrid}`}>
        <div><p className={styles.kicker}>Dúvidas comuns</p><h2>Perguntas que todo comprador deveria fazer.</h2></div>
        <div>{faqs.map(([question, answer], index) => <article key={question}>
          <button onClick={() => setOpenFaq(openFaq === index ? null : index)} aria-expanded={openFaq === index}><span>{question}</span><b>{openFaq === index ? "−" : "+"}</b></button>
          {openFaq === index && <p>{answer}</p>}
        </article>)}</div>
      </div>
    </section>

    <footer className={styles.footer}><div className={styles.container}><div><Logo/><p>Informação clara para uma compra mais segura.</p></div><div><Link href="/politica-de-privacidade">Política de Privacidade</Link><Link href="/termos-de-uso">Termos de Uso</Link><a href="mailto:contato@audita.com.br">Contato</a></div><p>© {new Date().getFullYear()} Audita. Análise informativa. Não substitui assessoria jurídica.</p></div></footer>

    <a className={styles.mobileSticky} href={appUrl} onClick={(event) => goToApp(event, "mobile_sticky")}>Analisar vendedor agora →</a>
  </main>;
}
