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
  ["Seguro LIS", "SEGURO LIS", "A IA Audita separa o lançamento para você confirmar se houve contratação."],
  ["Seguro de vida", "ITAÚ VIDA", "O nome encontrado é um sinal para conferir, não uma conclusão automática."],
  ["Descrição abreviada", "ITAU SEG AP PF", "A leitura assistida ajuda a localizar descrições bancárias difíceis de entender."],
  ["Após cancelamento", "A cobrança continuou", "Faturas e protocolos ajudam a mostrar se o débito permaneceu depois do pedido de cancelamento."],
];

const faqs = [
  ["Este é o caso do acordo do Itaú com o MPMG e o Idec?", "Sim. O produto usa como contexto o acordo nacional relacionado a seguros cobrados sem consentimento ou mantidos após cancelamento. A análise da IA Audita ajuda a localizar e documentar cobranças, mas não confirma automaticamente que uma pessoa atende aos critérios do acordo."],
  ["Quem pode pedir ressarcimento pelo acordo?", "O acordo possui requisitos próprios, como prova da cobrança, registro de reclamação até 18 de dezembro de 2025 e ausência de ressarcimento anterior. Quem descobrir agora uma possível cobrança nos últimos cinco anos ainda pode reclamar, pedir cancelamento e avaliar as medidas cabíveis."],
  ["Preciso ter todos os extratos?", "Você precisa enviar ao menos uma fatura, extrato ou print para começar. Quanto maior o período documentado, mais completa pode ser a análise. Com documentos parciais, o resultado também será parcial."],
  ["Quais arquivos posso enviar?", "A plataforma aceita PDF, PNG, JPG ou JPEG, CSV e TXT, com até 12 MB por arquivo. Você pode selecionar vários documentos na mesma análise."],
  ["O cálculo mostra quanto vou receber?", "Não. O cálculo soma somente valores encontrados nos documentos e confirmados por você como não reconhecidos. Juros, correção, eventual devolução em dobro e outros pedidos dependem do caso e de avaliação jurídica."],
  ["A IA Audita entra com o processo para mim?", "Não. Quando aplicável, a IA Audita organiza o relatório, prepara uma minuta para revisão e indica os canais oficiais. A conferência e o protocolo final continuam sob responsabilidade da pessoa usuária ou de um profissional."],
  ["Quais cartões entram na análise?", "O fluxo atual é voltado a Itaú, Itaucard e referências de cartões emitidos para redes parceiras. O vínculo da marca com o banco e a existência de uma cobrança precisam ser confirmados nos documentos enviados."],
];

function track(event: string, payload: Record<string, unknown> = {}) {
  if (typeof window !== "undefined") window.dataLayer?.push({ event, landing_version: "charge_analysis", ...payload });
}

function Logo() {
  return <Image src="/images/audita-oficial-branca.png" width={800} height={600} alt="IA Audita" className={styles.logo} priority />;
}

export function ChargeAnalysisPage() {
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

    <section className={`${styles.hero} ${styles.chargeHero}`}>
      <Image src="/images/hero-cobrancas-indevidas.png" fill priority sizes="100vw" alt="Consumidora conferindo faturas e extratos em casa" className={styles.heroImage} />
      <div className={styles.heroShade}/>
      <div className={`${styles.container} ${styles.heroContent}`}>
        <p className={styles.eyebrow}>Caso Itaú · cobranças de seguros sem consentimento</p>
        <h1 className={styles.chargeQuestion}>O Itaú cobrou um seguro que você não contratou?</h1>
        <h2 className={styles.chargeAlert}>A inclusão de seguros sem sua autorização é ILEGAL</h2>
        <div className={styles.chargeLegal}>
          <p className={styles.chargeLegalIntro}>(Art. 39, I do CDC) e dá direito à devolução dos valores. Essa prática abusiva foi comprovada na Ação Civil Coletiva nº 5085307-63.2016.8.13.0024 (TJMG) para cobranças ocorridas desde 2011 até a presente data, em que o Itaú se comprometeu a ressarcir os consumidores.</p>
          <p className={styles.chargeEvidenceLead}>Confira estes seguros e descrições de lançamentos nas suas faturas e extratos e verifique se houve contratação:</p>
          <ul className={styles.chargeInsuranceList}>
            <li><strong>Prestamista</strong><span>Embutido em empréstimos e financiamentos</span></li>
            <li><strong>Cartão/Bolsa Protegida, Perda e Roubo</strong><span>Tarifas mensais na fatura</span></li>
            <li><strong>Proteção Financeira / Perda de Renda</strong><span>Cobrada para quitar faturas</span></li>
            <li><strong>Acidentes Pessoais / Vida</strong><span>Débitos em conta ou cartão</span></li>
            <li><strong>Tarifas e Pacotes de Terceiros</strong><span>Assistências não solicitadas</span><span>Envio de mensagem automática</span></li>
            <li><strong>Seguro de AP premiado</strong><span>Seguro AP, AP Premiado ou Seguro Acidentes Pessoais</span></li>
            <li><strong>Ligue bloqueio</strong><span>Confira também variações de grafia dessa descrição</span></li>
            <li><strong>Renda premiada master</strong><span>Renda premiada, Renda premiada master ou Seguro Renda</span></li>
            <li><strong>Acidente pessoal premiado</strong><span>Acidentes pessoais ou Seg. Acidente Pessoal</span></li>
          </ul>
          <p className={styles.chargeCoverage}><strong>Abrangência citada:</strong> cartões Itaú, Itaucard e <a href={appUrl} onClick={(event) => goToApp(event, "partners")} style={{ textDecoration: "underline", textUnderlineOffset: "3px" }}>133 parceiras</a>, como Casas Bahia, Magalu, Ponto e Marisa, etc.</p>
        </div>
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
      <p className={`${styles.container} ${styles.caseCaution}`}>O enquadramento no acordo depende de requisitos e provas. A análise da IA Audita não garante ressarcimento nem substitui avaliação jurídica.</p>
    </section>

    <section className={styles.agreementSection} id="acordo-e-via-judicial" aria-labelledby="agreement-title">
      <div className={styles.container}>
        <p className={styles.kicker}>Acordo e via judicial</p>
        <h2 id="agreement-title">Entenda as limitações do acordo e as possibilidades da via judicial.</h2>
        <figure className={styles.agreementClause}>
          <blockquote>9.1.1. As condições para o consumidor ter direito ao ressarcimento são: 1. ter evidências da cobrança de seguro não contratado ou cobrado após o pedido de cancelamento; 2. ter evidência de que reclamou pelo seguro não contratado ou não cancelado após o pedido de cancelamento, nos canais oficiais de reclamação, entre os quais o SINDEC, consumidor.gov.br, Pró-Consumidor, Ministérios Públicos, Defensorias Públicas, IDEC, reclame aqui e outros, <mark>apesar de haver contrato assinado; e 3. a reclamação ser posterior à 13/06/2011 e anterior à assinatura do presente instrumento por todas as partes. Em todos os casos, o consumidor não pode ter sido ressarcido até então.</mark></blockquote>
          <figcaption><em>Sub cláusula 9.1.1 do Instrumento de Acordo de  Transação, assinado em 17.12.2025 TJMG, destacada a condição do item 3</em></figcaption>
        </figure>
        <div className={styles.agreementGrid}>
          <article>
            <h3>Quais são os requisitos do acordo?</h3>
            <p>O acordo firmado entre o Itaú, o Procon-MPMG e o Idec estabelece condições específicas para o ressarcimento administrativo.</p>
            <ul>
              <li><strong>Evidências da cobrança:</strong> documentos que mostrem seguro não contratado ou cobranças mantidas após o pedido de cancelamento.</li>
              <li><strong>Reclamação registrada:</strong> segundo o MPMG, o acordo contempla situações entre 13/06/2011 e 18/12/2025 e exige reclamação até 18/12/2025, nos canais admitidos.</li>
              <li><strong>Ausência de ressarcimento anterior:</strong> o consumidor não pode ter sido ressarcido pelos mesmos valores.</li>
            </ul>
            <p>Não atender aos requisitos desse acordo não significa perder automaticamente qualquer possibilidade de restituição. Quem identificar uma cobrança pode registrar reclamação, pedir cancelamento e avaliar os caminhos disponíveis para o seu caso.</p>
            <a className={styles.sourceLink} href={officialCaseUrl} target="_blank" rel="noreferrer">Consultar os requisitos divulgados pelo MPMG ↗</a>
          </article>
          <article>
            <h3>Por que avaliar a via judicial?</h3>
            <p>Quando o pedido não é resolvido administrativamente, a ação individual pode permitir a discussão das cobranças e de eventuais prejuízos. Conforme os fatos, as provas e os requisitos legais, podem ser avaliados:</p>
            <ol>
              <li><strong>Devolução em dobro (repetição do indébito):</strong> pode ser cabível para valores pagos indevidamente, observadas as condições do CDC, a hipótese de engano justificável e a jurisprudência aplicável.</li>
              <li><strong>Juros e correção monetária:</strong> os índices e os termos iniciais dependem da natureza do pedido e das regras aplicáveis ao caso.</li>
              <li><strong>Danos morais, perdas e danos:</strong> eventuais pedidos exigem fundamentos e avaliação das circunstâncias; a indenização não decorre automaticamente de toda cobrança indevida.</li>
            </ol>
            <p>O STJ possui entendimento sobre a devolução em dobro por cobrança contrária à boa-fé objetiva. A aplicação depende, entre outros fatores, da data da cobrança e das particularidades do processo.</p>
            <a className={styles.sourceLink} href="https://processo.stj.jus.br/jurisprudencia/externo/informativo/?livre=%40CNOT%3D020568" target="_blank" rel="noreferrer">Consultar o entendimento do STJ ↗</a>
          </article>
        </div>
        <div className={styles.agreementReport}>
          <h3>O primeiro passo é documentar o que foi cobrado.</h3>
          <p>Com suas faturas e extratos, a IA Audita identifica possíveis débitos indevidos e organiza datas, valores e documentos em um relatório técnico. Esse material apoia a avaliação profissional sobre restituição, eventuais encargos e próximos passos. A análise de juros e da evolução de dívidas possui um <Link className={styles.sourceLink} href="/servicos/dividas-bancarias">serviço específico de auditoria financeira</Link>.</p>
          <p>A decisão de ingressar com uma ação deve considerar provas, prazos, custos e riscos. Não há garantia de indenização nem de ganho percentual em relação ao acordo.</p>
          <a className={styles.button} href={appUrl} onClick={(event) => goToApp(event, "agreement")}>Analisar minhas faturas e extratos →</a>
        </div>
      </div>
    </section>

    <section className={styles.warning} id="o-que-procurar">
      <div className={styles.container}>
        <div className={styles.centerHeading}>
          <p className={styles.kicker}>Como a cobrança pode aparecer</p>
          <h2>Procure estes sinais nas suas <em>faturas do Itaú.</em></h2>
          <p>A IA Audita reconhece descrições abreviadas e padrões recorrentes. Encontrar um nome não prova irregularidade: você confirma se contratou ou não.</p>
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
          <p>Seguros e proteções costumam aparecer em valores discretos, misturados aos demais itens. A IA Audita percorre seus arquivos, reúne as recorrências e preserva o documento de origem de cada lançamento.</p>
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
          <p className={styles.kicker}>Como conseguir o extrato</p>
          <h2>Precisa dos extratos?<br/><em>Veja onde solicitar.</em></h2>
          <p>Para solicitar a emissão ou uma cópia dos extratos e faturas históricas do Itaú, utilize os canais oficiais do banco. Escolha a opção mais prática para você e reúna os documentos para a análise.</p>
          <a className={styles.button} href={appUrl} onClick={(event) => goToApp(event, "how_it_works")}>Analisar faturas e extratos →</a>
        </div>
        <div className={styles.processStack}>
          <article className={styles.processItem}><span>Aplicativo</span><div><h3>Aplicativo Itaú ou Cartões</h3><p>Acesse a área de extratos ou faturas e procure as opções de consultar e exportar em PDF. Os nomes dos menus podem variar conforme o aplicativo.</p></div></article>
          <article className={`${styles.processItem} ${styles.processAccent}`}><span>Pelo site</span><div><h3>Internet Banking Itaú</h3><p>Acesse sua conta no site do Itaú. Na área de Conta Corrente ou Cartões, consulte os extratos e faturas mês a mês.</p></div></article>
          <article className={styles.processItem}><span>Presencial</span><div><h3>Agência bancária</h3><p>Solicite os documentos presencialmente ao gerente ou consulte as opções disponíveis no caixa eletrônico.</p></div></article>
          <article className={styles.processItem}><span>Telefone</span><div><h3>SAC Itaú: <a href="tel:08007280728">0800 728 0728</a></h3><p>Canal de atendimento geral. Peça orientação para solicitar a emissão ou cópia dos extratos e faturas históricas.</p></div></article>
        </div>
      </div>
    </section>

    <section className={styles.deliverables} id="o-que-voce-recebe">
      <div className={`${styles.container} ${styles.deliverablesGrid}`}>
        <div>
          <p className={styles.kicker}>Tudo num só lugar</p>
          <h2>Veja quanto foi cobrado, quando começou e onde aparece.</h2>
          <p>A IA Audita organiza tudo e entrega uma análise completa e resumida do que você precisa saber para contestar com mais clareza e tranquilidade.</p>
        </div>
        <div className={styles.checkList}>
          <div><b>✓</b><span><strong>Ocorrências por arquivo</strong><small>Descrição, data, valor e documento de origem</small></span></div>
          <div><b>✓</b><span><strong>Histórico organizado</strong><small>Visão consolidada sem duplicar lançamentos</small></span></div>
          <div><b>✓</b><span><strong>Cálculo do valor documentado</strong><small>Somente do que você marcou como não reconhecido</small></span></div>
          <div><b>✓</b><span><strong>Relatório técnico em PDF</strong><small>Material para revisar, consultar e compartilhar</small></span></div>
        </div>
      </div>
    </section>

    <section className={styles.agreementSection} id="jurisprudencia" aria-labelledby="jurisprudence-title">
      <div className={styles.container}>
        <p className={styles.kicker}>Cobranças indevidas nos tribunais</p>
        <h2 id="jurisprudence-title">Jurisprudência consolidada e milhares de julgados nos Tribunais de todo Brasil</h2>
        <p>O contexto é o de ações sobre cobranças e descontos realizados pelo Banco Itaú sem autorização dos clientes, discutidas nos Tribunais e nas Turmas Recursais. Os pedidos podem envolver a restituição em dobro dos valores pagos, acrescida de juros e correção monetária, além de indenização por danos morais.</p>
        <p>Cada decisão deve ser analisada conforme os fatos, as provas e o entendimento aplicado ao processo. A devolução em dobro e a indenização por danos morais não são automáticas, e decisões anteriores não garantem o mesmo resultado em outros casos.</p>
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
        <h2>VEJA SE VOCÊ TEM VALORES A RECEBER.<br/>14 ANOS DE COBRANÇAS INDEVIDAS ITAÚ</h2>
        <a className={styles.button} href={appUrl} onClick={(event) => goToApp(event, "final")}>Verificar minhas faturas agora →</a>
        <small>O resultado depende dos documentos enviados e da sua confirmação.</small>
      </div>
    </section>

    <section className={`${styles.agreementSection} ${styles.practicalGuide}`} id="guia-pratico" aria-labelledby="guide-title">
      <div className={styles.container}>
        <p className={styles.kicker}>Relatório técnico e guia prático</p>
        <h2 id="guide-title">Entenda o acordo.<br/>Organize os documentos.<br/>Avalie os próximos passos.</h2>
        <h3>O processo coletivo MPMG / Idec</h3>
        <p>A ação coletiva movida pelo Ministério Público de Minas Gerais e pelo Idec contra o Itaú resultou em um acordo com regras de prevenção, transparência e ressarcimento de cobranças de seguros sem consentimento ou mantidas após o cancelamento. O enquadramento depende dos requisitos e das provas de cada caso.</p>
        <div className={styles.agreementGrid}>
          <article>
            <h3>Acordo administrativo</h3>
            <p>Segundo o MPMG, os requisitos incluem evidências da cobrança, reclamação registrada até 18/12/2025 e ausência de ressarcimento anterior. São admitidos canais do banco e canais oficiais de reclamação.</p>
            <p>Não atender a esse recorte não elimina automaticamente outras possibilidades de restituição. O pedido deve ser avaliado conforme a data, os documentos e as regras aplicáveis.</p>
            <a className={styles.sourceLink} href={officialCaseUrl} target="_blank" rel="noreferrer">Ver as condições oficiais do acordo ↗</a>
          </article>
          <article>
            <h3>Ação judicial individual</h3>
            <p>A via judicial permite discutir eventual devolução em dobro, juros, correção monetária e indenização por danos morais e materiais, quando houver fundamento. Esses pedidos não são concedidos automaticamente.</p>
            <p>A jurisprudência orienta a análise, mas cada processo depende de provas e das circunstâncias concretas. Não há garantia de ganho percentual em relação ao acordo.</p>
            <a className={styles.sourceLink} href="#jurisprudencia">Entender o contexto dos julgados →</a>
          </article>
        </div>
        <div className={styles.agreementReport}>
          <h3>Auditoria financeira e organização das provas</h3>
          <p>Faturas e extratos permitem identificar débitos, datas, descrições e valores. A IA Audita organiza os lançamentos confirmados por você em um relatório técnico para apoiar a contestação e a avaliação profissional. A apuração de juros e da evolução de dívidas faz parte do <Link className={styles.sourceLink} href="/servicos/dividas-bancarias">serviço de auditoria financeira</Link>; cálculos de restituição em dobro e de perdas e danos dependem de análise específica.</p>
        </div>
        <div className={styles.guideStepsLayout}>
          <article className={styles.guideSteps}>
            <h3>Passo a passo para buscar seus valores</h3>
            <ol>
              <li><strong>Obtenha os extratos e as faturas históricas.</strong> Solicite os documentos do período das cobranças e guarde protocolos de reclamação e cancelamento.</li>
              <li><strong>Organize a análise técnica.</strong> Confira os lançamentos, identifique o que não reconhece e reúna os documentos que sustentam a contestação.</li>
              <li><strong>Avalie as medidas cabíveis.</strong> Busque orientação de advogado ou da Defensoria Pública para analisar prazos, custos, riscos e a possibilidade de uma ação individual.</li>
            </ol>
          </article>
          <article>
            <h3>Como conseguir os extratos no Itaú</h3>
            <ul>
              <li><strong>Aplicativo Itaú / Cartões:</strong> procure a área de extratos ou faturas e as opções de consultar e exportar em PDF.</li>
              <li><strong>Internet Banking:</strong> consulte os extratos mês a mês na área de Conta Corrente ou Cartões.</li>
              <li><strong>Agência bancária:</strong> solicite ao gerente ou consulte as opções do caixa eletrônico.</li>
              <li><strong>SAC Itaú:</strong> <a className={styles.textLink} href="tel:08007280728">0800 728 0728</a>. Peça orientação para obter cópias dos documentos.</li>
            </ul>
          </article>
        </div>
        <a className={styles.button} href={appUrl} onClick={(event) => goToApp(event, "practical_guide")}>Iniciar a análise dos meus extratos →</a>
      </div>
    </section>

    <footer className={styles.footer}><div className={styles.container}><div><Logo/><p>Informação clara para entender seus documentos financeiros.</p></div><div><Link href="/politica-de-privacidade">Política de Privacidade</Link><Link href="/termos-de-uso">Termos de Uso</Link><a href="mailto:contato@audita.com.br">Contato</a></div><p>© {new Date().getFullYear()} IA Audita. Plataforma tecnológica de auditoria documental e apoio técnico. Não substitui advogado ou Defensoria Pública.</p></div></footer>

    <a className={styles.mobileSticky} href={appUrl} onClick={(event) => goToApp(event, "mobile_sticky")}>Conferir minhas cobranças do Itaú →</a>
  </main>;
}
