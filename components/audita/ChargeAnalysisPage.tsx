"use client";

import Image from "next/image";
import Link from "next/link";
import { MouseEvent, useEffect, useState } from "react";
import styles from "./SellerAnalysisPage2.module.css";

declare global {
  interface Window { dataLayer?: Record<string, unknown>[]; }
}

const appUrl = "https://app.auditainteligente.com.br/#analise-cobrancas";
const officialCaseUrl = "https://www.mpmg.mp.br/portal/menu/comunicacao/noticias/itau-vai-pagar-multas-diarias-se-descumprir-acordo-firmado-com-o-procon-mpmg-e-idec-por-cobrancas-indevidas.shtml";

const occurrences = [
  ["Seguro cartão", "SEGURO CARTÃO", "A descrição pode aparecer abreviada no meio dos demais itens da fatura."],
  ["Proteção", "PROTEÇÃO FINANCEIRA", "Valores pequenos e recorrentes podem continuar por meses sem chamar atenção."],
  ["Seguro LIS", "SEGURO LIS", "A Audita separa o lançamento para você confirmar se houve contratação."],
  ["Seguro de vida", "ITAÚ VIDA", "O nome encontrado é um sinal para conferir, não uma conclusão automática."],
  ["Descrição abreviada", "ITAU SEG AP PF", "A leitura assistida ajuda a localizar descrições bancárias difíceis de entender."],
  ["Após cancelamento", "A cobrança continuou", "Faturas e protocolos ajudam a mostrar se o débito permaneceu depois do pedido de cancelamento."],
];

const faqs = [
  ["Este é o caso do acordo do Itaú com o MPMG e o Idec?", "Sim. O produto usa como contexto o acordo nacional relacionado a seguros cobrados sem consentimento ou mantidos após cancelamento. A análise da Audita ajuda a localizar e documentar cobranças, mas não confirma automaticamente que uma pessoa atende aos critérios do acordo."],
  ["Quem pode pedir ressarcimento pelo acordo?", "O acordo possui requisitos próprios, como prova da cobrança, registro de reclamação até 18 de dezembro de 2025 e ausência de ressarcimento anterior. Quem descobrir agora uma possível cobrança nos últimos cinco anos ainda pode reclamar, pedir cancelamento e avaliar as medidas cabíveis."],
  ["Preciso ter todos os extratos?", "Você precisa enviar ao menos uma fatura, extrato ou print para começar. Quanto maior o período documentado, mais completa pode ser a análise. Com documentos parciais, o resultado também será parcial."],
  ["Quais arquivos posso enviar?", "A plataforma aceita PDF, PNG, JPG ou JPEG, CSV e TXT, com até 12 MB por arquivo. Você pode selecionar vários documentos na mesma análise."],
  ["O cálculo mostra quanto vou receber?", "Não. O cálculo soma somente valores encontrados nos documentos e confirmados por você como não reconhecidos. Juros, correção, eventual devolução em dobro e outros pedidos dependem do caso e de avaliação jurídica."],
  ["A Audita entra com o processo para mim?", "Não. Quando aplicável, a Audita organiza o relatório, prepara uma minuta para revisão e indica os canais oficiais. A conferência e o protocolo final continuam sob responsabilidade da pessoa usuária ou de um profissional."],
  ["Quais cartões entram na análise?", "O fluxo atual é voltado a Itaú, Itaucard e referências de cartões emitidos para redes parceiras. O vínculo da marca com o banco e a existência de uma cobrança precisam ser confirmados nos documentos enviados."],
];

function track(event: string, payload: Record<string, unknown> = {}) {
  if (typeof window !== "undefined") window.dataLayer?.push({ event, landing_version: "charge_analysis", ...payload });
}

function Logo() {
  return <Image src="/images/audita-oficial-branca.png" width={800} height={600} alt="Audita" className={styles.logo} priority />;
}

export function ChargeAnalysisPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => { track("view_charge_analysis_lp"); }, []);

  function goToApp(event: MouseEvent<HTMLAnchorElement>, placement: string) {
    event.preventDefault();
    const query = new URLSearchParams(window.location.search);
    query.set("origem", "landing-cobrancas");
    track("click_charge_analysis_cta", { placement });
    window.location.href = `https://app.auditainteligente.com.br/?${query.toString()}#analise-cobrancas`;
  }

  return <main className={styles.page}>
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/analise-cobrancas-indevidas" aria-label="Audita — início"><Logo /></Link>
        <nav className={menuOpen ? `${styles.nav} ${styles.navOpen}` : styles.nav} aria-label="Navegação principal">
          <a href="#caso-itau" onClick={() => setMenuOpen(false)}>O caso Itaú</a>
          <a href="#como-funciona" onClick={() => setMenuOpen(false)}>Como funciona</a>
          <a href="#o-que-voce-recebe" onClick={() => setMenuOpen(false)}>O que você recebe</a>
          <a href="#duvidas" onClick={() => setMenuOpen(false)}>Dúvidas</a>
        </nav>
        <a className={`${styles.button} ${styles.headerButton}`} href={appUrl} onClick={(event) => goToApp(event, "header")}>Conferir meu Itaú</a>
        <button className={styles.menuButton} aria-label="Abrir menu" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}><span/><span/><span/></button>
      </div>
    </header>

    <section className={styles.hero}>
      <Image src="/images/hero-cobrancas-indevidas.png" fill priority sizes="100vw" alt="Consumidora conferindo faturas e extratos em casa" className={styles.heroImage} />
      <div className={styles.heroShade}/>
      <div className={`${styles.container} ${styles.heroContent}`}>
        <p className={styles.eyebrow}>Caso Itaú · cobranças de seguros sem consentimento</p>
        <h1>O Itaú cobrou um seguro que você não contratou?<br/><em>Descubra nas suas faturas.</em></h1>
        <p className={styles.heroText}>Existe um acordo nacional sobre seguros cobrados sem consentimento entre 2011 e 2025. Envie suas faturas e extratos: a Audita encontra os lançamentos, organiza as provas e calcula o que aparece nos documentos.</p>
        <div className={styles.heroActions}>
          <a className={styles.button} href={appUrl} onClick={(event) => goToApp(event, "hero")}>Verificar minhas cobranças do Itaú <span>→</span></a>
        </div>
        <div className={styles.heroProof}>
          <span>Acordo nacional divulgado pelo MPMG</span><span>Faturas e extratos</span><span>Você confirma cada cobrança</span><span>Relatório em PDF</span>
        </div>
      </div>
    </section>

    <section className={styles.realityStrip}>
      <div className={styles.container}>
        <strong>O caso existe. A cobrança pode estar escondida no seu histórico.</strong>
        <span>Sem olhar os documentos, você pode nem saber quanto pagou.</span>
      </div>
    </section>

    <section className={styles.caseSection} id="caso-itau">
      <div className={`${styles.container} ${styles.caseLayout}`}>
        <div className={styles.caseLead}>
          <p className={styles.kicker}>O caso Itaú</p>
          <h2>O banco assumiu obrigações de ressarcimento. Agora você precisa descobrir se foi cobrado.</h2>
          <p>O Procon-MPMG e o Idec firmaram um acordo nacional com o Itaú sobre seguros cobrados sem consentimento ou mantidos depois do cancelamento. O caso alcança também cartões emitidos em parceria com redes varejistas.</p>
          <a className={styles.sourceLink} href={officialCaseUrl} target="_blank" rel="noreferrer">Ver a informação oficial do MPMG ↗</a>
        </div>
        <div className={styles.caseFacts}>
          <div><strong>2011—2025</strong><span>Período de cobranças contemplado pelo acordo</span></div>
          <div><strong>Todo o Brasil</strong><span>Consumidores do Itaú e cartões de redes parceiras</span></div>
          <div><strong>Faturas e extratos</strong><span>Os documentos são a base para comprovar o que foi cobrado</span></div>
          <div><strong>Cancelamento e ressarcimento</strong><span>O acordo prevê regras próprias para cada situação</span></div>
        </div>
      </div>
      <p className={`${styles.container} ${styles.caseCaution}`}>O enquadramento no acordo depende de requisitos e provas. A análise da Audita não garante ressarcimento nem substitui avaliação jurídica.</p>
    </section>

    <section className={styles.warning} id="o-que-procurar">
      <div className={styles.container}>
        <div className={styles.centerHeading}>
          <p className={styles.kicker}>Como a cobrança pode aparecer</p>
          <h2>Procure estes sinais nas suas <em>faturas do Itaú.</em></h2>
          <p>A Audita reconhece descrições abreviadas e padrões recorrentes. Encontrar um nome não prova irregularidade: você confirma se contratou ou não.</p>
        </div>
        <div className={styles.riskGrid}>{occurrences.map(([category, title, description]) => <article className={styles.riskCard} key={title}>
          <span className={styles.riskCategory}>{category}</span>
          <h3>{title}</h3><p>{description}</p>
        </article>)}</div>
        <p className={styles.disclaimer}>Exemplos de descrições monitoradas pelo produto. A forma do lançamento pode variar conforme o cartão, a época e o documento.</p>
      </div>
    </section>

    <section className={styles.story}>
      <div className={`${styles.container} ${styles.storyGrid}`}>
        <div className={styles.storyImage}>
          <Image src="/images/analise-cobrancas-documentos.png" fill sizes="(max-width: 860px) 100vw, 48vw" alt="Pessoa conferindo lançamentos em documentos financeiros" />
        </div>
        <div className={styles.storyCopy}>
          <p className={styles.kicker}>Cobranças pequenas. Prejuízo acumulado.</p>
          <h2>Você pode ter pago por anos sem perceber.</h2>
          <p>Seguros e proteções costumam aparecer em valores discretos, misturados aos demais itens. A Audita percorre seus arquivos, reúne as recorrências e preserva o documento de origem de cada lançamento.</p>
          <div className={styles.decisionNote}>
            <span>O caso é do Itaú. A análise é do seu histórico.</span>
            <p>Somente valores encontrados nos anexos e marcados por você como não reconhecidos entram no cálculo.</p>
          </div>
          <p className={styles.exampleNote}>A análise aponta indícios e estimativas técnicas. Ela não garante restituição, indenização ou resultado judicial.</p>
          <a className={styles.textLink} href={appUrl} onClick={(event) => goToApp(event, "story")}>Descobrir o que foi cobrado →</a>
        </div>
      </div>
    </section>

    <section className={styles.how} id="como-funciona">
      <div className={`${styles.container} ${styles.howLayout}`}>
        <div className={styles.howIntro}>
          <p className={styles.kicker}>Como recuperar o controle</p>
          <h2>Envie o extrato.<br/><em>A Audita encontra.</em><br/>Você decide.</h2>
          <p>Em poucos passos, a IA Audita transforma faturas espalhadas em uma análise clara do que foi cobrado e do que merece contestação.</p>
          <a className={styles.button} href={appUrl} onClick={(event) => goToApp(event, "how_it_works")}>Analisar faturas e extratos →</a>
        </div>
        <div className={styles.processStack}>
          <article className={styles.processItem}><span>Envie</span><div><h3>Suas faturas ou extratos do Itaú</h3><p>PDF, imagem, CSV ou TXT. Reúna vários meses na mesma análise para enxergar a recorrência.</p></div></article>
          <article className={`${styles.processItem} ${styles.processAccent}`}><span>Analise</span><div><h3>A Audita encontra seguros, proteções e cobranças recorrentes</h3><p>Cada ocorrência permanece ligada ao arquivo, à data e ao valor em que foi encontrada.</p></div></article>
          <article className={styles.processItem}><span>Confirme</span><div><h3>Diga o que você contratou — e o que não reconhece</h3><p>Você responde “reconheço”, “não reconheço” ou “não sei” para cada lançamento.</p></div></article>
          <article className={styles.processItem}><span>Receba</span><div><h3>Cálculo documental, relatório e próximos passos</h3><p>A Audita organiza tudo o que você precisa saber para avaliar a contestação com clareza.</p></div></article>
        </div>
      </div>
    </section>

    <section className={styles.deliverables} id="o-que-voce-recebe">
      <div className={`${styles.container} ${styles.deliverablesGrid}`}>
        <div>
          <p className={styles.kicker}>Tudo num só lugar</p>
          <h2>Veja quanto foi cobrado, quando começou e onde aparece.</h2>
          <p>A Audita organiza tudo e entrega uma análise completa e resumida do que você precisa saber para contestar com mais clareza e tranquilidade.</p>
        </div>
        <div className={styles.checkList}>
          <div><b>✓</b><span><strong>Ocorrências por arquivo</strong><small>Descrição, data, valor e documento de origem</small></span></div>
          <div><b>✓</b><span><strong>Histórico organizado</strong><small>Visão consolidada sem duplicar lançamentos</small></span></div>
          <div><b>✓</b><span><strong>Cálculo do valor documentado</strong><small>Somente do que você marcou como não reconhecido</small></span></div>
          <div><b>✓</b><span><strong>Relatório técnico em PDF</strong><small>Material para revisar, consultar e compartilhar</small></span></div>
        </div>
      </div>
    </section>

    <section className={styles.faq} id="duvidas">
      <div className={`${styles.container} ${styles.faqGrid}`}>
        <div><p className={styles.kicker}>Antes de começar</p><h2>Perguntas comuns sobre a análise.</h2></div>
        <div>{faqs.map(([question, answer], index) => <article key={question}>
          <button onClick={() => setOpenFaq(openFaq === index ? null : index)} aria-expanded={openFaq === index}><span>{question}</span><b>{openFaq === index ? "−" : "+"}</b></button>
          {openFaq === index && <p>{answer}</p>}
        </article>)}</div>
      </div>
    </section>

    <section className={styles.finalCta}>
      <div className={styles.container}>
        <Logo />
        <p>Seu histórico pode ter a resposta</p>
        <h2>Não aceite o “sempre foi assim”.<br/>Confira o que o Itaú cobrou.</h2>
        <a className={styles.button} href={appUrl} onClick={(event) => goToApp(event, "final")}>Verificar minhas faturas agora →</a>
        <small>O resultado depende dos documentos enviados e da sua confirmação.</small>
      </div>
    </section>

    <footer className={styles.footer}><div className={styles.container}><div><Logo/><p>Informação clara para entender seus documentos financeiros.</p></div><div><Link href="/politica-de-privacidade">Política de Privacidade</Link><Link href="/termos-de-uso">Termos de Uso</Link><a href="mailto:contato@audita.com.br">Contato</a></div><p>© {new Date().getFullYear()} Audita. Plataforma tecnológica de auditoria documental e apoio técnico. Não substitui advogado ou Defensoria Pública.</p></div></footer>

    <a className={styles.mobileSticky} href={appUrl} onClick={(event) => goToApp(event, "mobile_sticky")}>Conferir minhas cobranças do Itaú →</a>
  </main>;
}
