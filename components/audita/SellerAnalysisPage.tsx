"use client";
import Image from "next/image";
import Link from "next/link";
import { MouseEvent, useEffect, useMemo } from "react";
import sellerApproaches from "../../content/seller-approaches.json";
import { DocumentaryAnalysisContent } from "./DocumentaryAnalysisContent";
import styles from "./SellerAnalysisPage.module.css";

type SellerApproach = (typeof sellerApproaches)[number];

const documents = [
  { title: "Vendedor", icon: "person", subtitle: "A situação de quem vende também importa.", description: "Consultamos certidões e documentos do vendedor para identificar possíveis ocorrências que podem impactar a negociação, como ações cíveis, fiscais, trabalhistas, protestos e outras informações públicas.", items: ["Certidões cíveis e distribuição de ações", "Débitos fiscais: federal, estadual e municipal", "Ações trabalhistas e outras obrigações", "Protestos e restrições em cadastros públicos", "Outros pontos de atenção, conforme o caso"] },
  { title: "Imóvel", icon: "house", subtitle: "A regularidade do imóvel é parte da segurança.", description: "A diligência complementar considera a documentação do imóvel, sua situação registral e eventuais ônus, além de informações relacionadas ao condomínio, quando aplicável.", items: ["Matrícula e situação registral no cartório", "Ônus, gravames e indisponibilidades", "Ações envolvendo o imóvel", "Situação do condomínio, quando aplicável", "Outros documentos relevantes, conforme o caso"] },
];
const journey = [
  ["Consultar.", "Informe os dados do vendedor e do imóvel. A IA Audita consulta certidões e documentos em fontes oficiais, conforme o escopo disponível no aplicativo."],
  ["Entender.", "Receba informações organizadas, com os documentos encontrados e os pontos de atenção em uma linguagem clara e objetiva."],
  ["Aprofundar.", "Se houver algo que exija investigação, avalie uma análise complementar, com leitura de processos e documentos adicionais, conforme o seu caso."],
];
const scenarios = [
  ["Imóvel urbano", "Apartamento, casa ou terreno", "Matrícula atualizada e titularidade; ônus e restrições; cadastro e débitos de IPTU; regularidade da construção e uso do solo. Em condomínios, também é importante conferir as obrigações da unidade."],
  ["Imóvel rural", "Terra, documentação e limites", "Além da matrícula e do histórico de titularidade, a análise pode envolver CCIR, ITR, CAR, dados do SIGEF/INCRA, limites da área e eventuais restrições ambientais. Os cadastros precisam ser avaliados em conjunto."],
  ["Imóvel na planta", "A compra começa antes da entrega", "Avalie a incorporadora e a SPE, o registro da incorporação, o memorial descritivo, as licenças e as condições do contrato. Histórico de processos e documentação da obra podem exigir uma verificação específica."],
  ["Situações especiais", "Cada negociação pede um olhar próprio", "Herança, leilão, usufruto, ocupação, áreas da União ou divergências de registro exigem documentos e cuidados próprios. Identifique essas condições no início para definir o alcance da diligência."],
];
function Icon({name}: {name: string}) { return <Image src={`/icons/${name}.svg`} alt="" width={28} height={28} aria-hidden="true" />; }
const faqs = [
  ["As certidões estão incluídas no plano?", "As certidões de TJ, TRT e Receita Federal fazem parte da consulta prevista no plano, conforme sua abrangência e a disponibilidade das fontes. Quando surgem processos ou pontos que exigem aprofundamento, o assinante pode solicitar a Due Diligence Avançada. Eventuais taxas de cartório são informadas antes da emissão dos documentos adicionais."],
  ["Por que verificar empresas vinculadas ao vendedor?", "O vendedor pode participar de empresas com processos ou obrigações que merecem avaliação. Identificar o vínculo não significa que ele responde pessoalmente por todas as dívidas: é necessário analisar o tipo de responsabilidade, os processos e as decisões existentes."],
  ["Quanto custa e qual é o prazo?", "O escopo, os valores e as condições são apresentados no aplicativo. A disponibilidade das certidões, os prazos dos órgãos e eventuais custos de cartório podem variar conforme o caso."],
  ["O que é a Análise de Vendedor?", "É uma diligência que reúne certidões e documentos oficiais, organiza as informações e destaca ocorrências relevantes para apoiar a decisão de compra."],
  ["A IA Audita analisa o imóvel?", "Este serviço é focado no vendedor. A análise do imóvel é uma etapa complementar e deve considerar matrícula, condição física, urbanística e demais documentos aplicáveis."],
  ["A existência de um processo impede a venda?", "Não necessariamente. Uma ocorrência precisa ser compreendida dentro de seu contexto, natureza, fase e possível impacto na negociação."],
  ["A análise garante que a compra não terá riscos?", "Não. A IA Audita reduz a assimetria de informação e apoia a tomada de decisão, sem prometer risco zero ou substituir orientação jurídica especializada."],
  ["A inteligência artificial toma a decisão?", "Não. A tecnologia auxilia na leitura e organização. A decisão permanece com o comprador e seus profissionais de confiança."],
  ["Posso compartilhar o resultado com meu advogado?", "Sim. O material organizado facilita o alinhamento com advogados, corretores e demais profissionais envolvidos."],
  ["As informações ficam protegidas?", "Os dados são tratados para a finalidade da solicitação, com práticas de segurança e privacidade descritas em nossa Política de Privacidade."],
];

function track(event: string, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  const dataLayer = (window as Window & { dataLayer?: unknown[] }).dataLayer ||= [];
  dataLayer.push({ event, page: "seller_analysis", device: window.innerWidth < 768 ? "mobile" : "desktop", ...params });
}

function Logo() { return <Image src="/images/audita-oficial-branca.png" width={800} height={600} alt="IA Audita" className="brand-logo" priority />; }

export function SellerAnalysisPage({ approach }: { approach?: SellerApproach } = {}) {
  const utms = useMemo(() => typeof window === "undefined" ? {} : Object.fromEntries(new URLSearchParams(window.location.search).entries()), []);
  const appUrl = "https://app.auditainteligente.com.br/";
  const goToApp = (event: MouseEvent<HTMLAnchorElement>, plan?: string) => {
    event.preventDefault();
    const query = new URLSearchParams(window.location.search);
    if (plan) query.set("plano", plan);
    window.location.href = `${appUrl}${query.size ? `?${query}` : ""}`;
  };
  useEffect(() => { track("view_seller_analysis_lp", { ...utms, approach: approach?.slug ?? "vendedor" }); }, [utms, approach?.slug]);

  const schema = { "@context":"https://schema.org", "@graph":[{ "@type":"Service", name:approach?.title ?? "Análise de Vendedor de Imóvel", provider:{"@type":"Organization",name:"IA Audita"}, areaServed:"BR", serviceType:approach ? "Análise documental com inteligência artificial" : "Diligência imobiliária com inteligência artificial", description:approach?.description ?? "Consulta e organização de certidões e documentos para apoiar a análise de riscos relacionados ao vendedor de um imóvel." }, ...(!approach ? [{ "@type":"FAQPage", mainEntity:faqs.map(([name,text])=>({"@type":"Question",name,acceptedAnswer:{"@type":"Answer",text}})) }] : [])] };

  return <main className={styles.page}>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    <section className={styles.hero}>
      <Image src={approach?.heroImage ?? "/images/seller-diligence-hero.webp"} alt={approach?.heroAlt ?? "Casa contemporânea ao entardecer e exemplo ilustrativo de relatório de análise do vendedor"} fill priority sizes="100vw" className={styles.heroImage} />
      <div className={styles.container}><div className={styles.heroCopy}>
        <p className={styles.eyebrow}>{approach?.eyebrow ?? "Diligência imobiliária com inteligência artificial"}</p>
        <h1>{approach ? <>{approach.headline} <span>{approach.accent}</span></> : <>Antes de comprar um imóvel, conheça <span>quem está vendendo.</span></>}</h1>
        <p>{approach?.description ?? "Certidões, documentos e pontos de atenção organizados para você decidir com mais clareza."}</p>
        <div className={styles.actions}><a className={styles.button} href={appUrl} onClick={(event)=>{track("click_hero_cta", { approach: approach?.slug ?? "vendedor" });goToApp(event);}}>{approach?.cta ?? "Analisar o vendedor"} <Icon name="arrow-right" /></a><a href="#analise">O que será consultado</a></div>
        <small>{approach?.note ?? "Mais segurança na negociação, com informação."}</small>
      </div></div>
    </section>
    {approach ? <DocumentaryAnalysisContent approach={approach} /> : <>
    <section className={styles.section} id="analise"><div className={styles.container}>
      <p className={styles.eyebrow}>Mais contexto para uma boa decisão</p>
      <h2>ANTES DE ASSINAR ESCRITURA <span>FAÇA ANÁLISE DAS CERTIDÕES.</span></h2>
      <p className={styles.intro}>A compra de um imóvel envolve mais do que o bem. A situação de quem vende e a regularidade do imóvel fazem parte da decisão. A IA Audita organiza essas informações de forma clara, para você avaliar com tranquilidade.</p>
      <div className={styles.documentGrid}>{documents.map(doc=><article key={doc.title}>
        <div className={styles.documentTitle}><div className={styles.icon}><Icon name={doc.icon}/></div><div><h3>{doc.title}</h3><p>{doc.subtitle}</p></div></div>
        <p>{doc.description}</p><h4>Principais documentos analisados</h4>
        <ul className={styles.checklist}>{doc.items.map(item=><li key={item}>{item}</li>)}</ul>
      </article>)}</div>
      <p className={styles.note}>As consultas dependem da localidade, da disponibilidade das fontes e do escopo contratado. A análise do imóvel pode ser complementar à consulta do vendedor.</p>
    </div></section>
    <section className={styles.section} id="lei-e-seguranca-da-compra"><div className={styles.container}>
      <p className={styles.eyebrow}>Alerta IA Audita · Antes da compra do imóvel</p>
      <h2>Vai comprar um imóvel?<br/><span>Analise com a IA Audita antes de assinar.</span></h2>
      <p className={styles.intro}>O cartório pode lavrar a escritura mesmo que existam ações contra o vendedor, desde que atendidos os requisitos legais e não haja impedimento aplicável. A possibilidade de fazer a escritura, por si só, não garante que a operação esteja livre de riscos.</p>
      <div className={styles.scenarios}>
        <article><h3>1. O que a lei dispensa</h3><p>O art. 54, § 2º, inciso II, da Lei nº 13.097/2015 prevê que não se exige a apresentação de certidões forenses ou de distribuidores judiciais para a validade ou eficácia dos negócios imobiliários abrangidos pelo artigo, nem para caracterizar a boa-fé do adquirente. Essa dispensa legal não impede uma análise documental voluntária antes da compra.</p></article>
        <article><h3>2. Por que conferir a matrícula e as ações</h3><p>A lei valoriza as informações registradas na matrícula e protege o adquirente de boa-fé, observadas as exceções legais. Confira a matrícula atualizada, os ônus e as averbações. Se houver ações conhecidas contra o vendedor, avalie sua natureza, fase e possível relação com o imóvel antes de decidir.</p></article>
        <article><h3>3. Quando pode existir risco de penhora</h3><p>A existência de um processo não torna toda venda irregular. Porém, se estiverem presentes os requisitos legais para reconhecer fraude à execução, a alienação poderá não produzir efeitos perante o credor e o imóvel poderá sofrer penhora. Na regra geral sintetizada pela Súmula 375 do STJ, importam o registro da penhora ou a prova de má-fé do adquirente. Regimes específicos e as circunstâncias do caso exigem avaliação jurídica.</p></article>
        <article><h3>4. Atenção às declarações que você assina</h3><p>Declarar que tinha conhecimento de ações contra o vendedor pode ser relevante na avaliação da sua conduta e dificultar uma defesa baseada no desconhecimento dessas ações. Isso não significa automaticamente má-fé nem elimina o direito de defesa. Antes de assinar uma declaração de ciência, procure entender quais processos ela menciona e quais consequências podem afetar a negociação.</p></article>
      </div>
      <div className={styles.outputs}><article><div><h3>Conheça os riscos antes de comprometer seu patrimônio.</h3><p>Conte com a IA Audita para organizar as certidões do vendedor, identificar ocorrências nas fontes consultadas e destacar os pontos que merecem investigação. Reúna também a matrícula atualizada e a minuta da escritura para a conferência da negociação. Havendo processos, solicite uma análise aprofundada conforme o escopo disponível e obtenha orientação jurídica sobre seus possíveis efeitos. Antes de assinar, transforme documentos em informação para decidir com mais clareza.</p><p className={styles.note}>A IA Audita apoia a análise documental; a contratação do serviço não é requisito legal para a compra ou para a caracterização da boa-fé e não garante ausência de riscos.</p></div></article></div>
      <div className={styles.actions}><a className={styles.button} href={appUrl} onClick={event => goToApp(event)}>Analisar com a IA Audita <Icon name="arrow-right" /></a></div>
      <div className={styles.actions}><a className={styles.textLink} href="https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2015/lei/l13097.htm#art54" target="_blank" rel="noopener noreferrer">Consultar o art. 54 no Planalto ↗</a><a className={styles.textLink} href="https://scon.stj.jus.br/SCON/pesquisar.jsp?b=SUMU&sumula=375" target="_blank" rel="noopener noreferrer">Consultar a Súmula 375 do STJ ↗</a></div>
    </div></section>
    <section className={styles.section} id="como-funciona"><div className={styles.container}>
      <p className={styles.eyebrow}>Como funciona</p><h2>Consultar. Entender. Aprofundar.</h2>
      <p className={styles.intro}>Um processo simples para você ter mais clareza antes de avançar na negociação.</p>
      <ol className={styles.journey}>{journey.map(([title,description],i)=><li key={title}><span className={styles.number}>{i+1}</span><div><h3>{title}</h3><p>{description}</p></div>{i<2&&<Icon name="arrow-right"/>}</li>)}</ol>
    </div></section>
    <section className={styles.section} id="certidoes-e-due-diligence"><div className={styles.container}>
      <p className={styles.eyebrow}>Da consulta inicial à auditoria aprofundada</p>
      <h2>Certidões no plano.<br/><span>Mais profundidade quando necessário.</span></h2>
      <p className={styles.intro}>A consulta inicial reúne certidões de TJ, TRT e Receita Federal. O resultado orienta o próximo passo: entender os documentos ou investigar as ocorrências com uma Due Diligence Avançada.</p>
      <div className={styles.scenarios}>
        <article><h3>Sem processos identificados</h3><h4>Certidões inclusas no plano</h4><p>Você recebe as certidões disponíveis e as informações organizadas para avaliar a negociação. O resultado se refere às fontes, à abrangência e à data consultadas.</p><p className={styles.note}>Não encontrar processos não garante ausência de riscos. A documentação do imóvel e os demais cuidados da compra continuam importantes.</p></article>
        <article><h3>Com processos identificados</h3><h4>Alerta da IA e solicitação de análise avançada</h4><p>A IA sinaliza as ocorrências para que o assinante possa solicitar a Due Diligence Avançada. Após a definição do escopo e o pagamento das taxas de cartório aplicáveis, são emitidos os documentos adicionais para uma auditoria mais profunda.</p><p className={styles.note}>Um alerta não é um impedimento automático à compra. A natureza e a fase de cada processo precisam ser avaliadas.</p></article>
      </div>
      <div className={styles.actions}><a className={styles.button} href={appUrl} onClick={event=>goToApp(event)}>Consultar meu plano <Icon name="arrow-right"/></a><a href="#cnpj-vinculado">E se o vendedor tiver uma empresa?</a></div>
    </div></section>
    <section className={styles.section} id="cnpj-vinculado"><div className={styles.container}>
      <p className={styles.eyebrow}>Pessoa física, vínculos empresariais</p>
      <h2>O vendedor tem uma empresa?<br/><span>Esse vínculo também merece atenção.</span></h2>
      <p className={styles.intro}>A checagem de CNPJ vinculado amplia o olhar sobre o vendedor pessoa física: identifica participações empresariais e organiza informações que podem exigir uma investigação adicional.</p>
      <div className={styles.outputs}>
        <article><Icon name="person"/><div><h3>1. Identificação de vínculos e quadro societário</h3><p>A checagem cruza os dados de identificação do vendedor com as informações cadastrais e do Quadro de Sócios e Administradores (QSA) disponíveis, buscando vínculos como sócio, administrador ou titular. A cobertura depende do tipo de empresa e do acesso às fontes; ausência de resultado não comprova ausência de vínculo.</p></div></article>
        <article><Icon name="briefcase"/><div><h3>2. Levantamento das certidões da empresa</h3><p>Identificado um CNPJ, a investigação considera documentos e ocorrências da pessoa jurídica, conforme o escopo da análise:</p><ul className={styles.checklist}><li><strong>Trabalhista — CNDT e TRTs:</strong> débitos e processos trabalhistas que mereçam avaliação.</li><li><strong>Fiscal — Receita Federal, SEFAZ e Prefeitura:</strong> débitos e inscrições em dívida ativa nas esferas consultadas.</li><li><strong>Falência e recuperação judicial:</strong> registros de processos que ajudem a contextualizar a situação da empresa.</li></ul></div></article>
        <article><Icon name="file-earmark-text"/><div><h3>3. Avaliação de possíveis reflexos sobre o patrimônio</h3><p>A análise organiza indícios de execuções, pedidos de responsabilização do sócio, constrições e decisões que possam afetar a negociação. Esses pontos orientam a revisão jurídica sobre restrições atuais ou possíveis questionamentos futuros da venda.</p></div></article>
      </div>
      <p className={styles.note}>Dívida da empresa não implica automaticamente penhora de bens do sócio. O art. 50 do Código Civil prevê a desconsideração em caso de abuso da personalidade jurídica, caracterizado por desvio de finalidade ou confusão patrimonial. Questões trabalhistas e fiscais também exigem avaliação das regras específicas e das decisões do caso. A IA sinaliza pontos de atenção; não decreta impedimentos nem prevê a anulação de uma venda.</p>
      <a className={styles.textLink} href="https://www.planalto.gov.br/ccivil_03/leis/2002/l10406compilada.htm#art50" target="_blank" rel="noopener noreferrer">Consultar o art. 50 do Código Civil</a>
    </div></section>
    <section className={styles.banner}><div className={`${styles.container} ${styles.bannerInner}`}>
      <div><p className={styles.eyebrow}>Informação hoje. Decisões melhores amanhã.</p><h2>Analise o vendedor agora.</h2><p>Tenha uma visão mais completa antes de assinar.</p><div className={styles.actions}><a className={styles.button} href={appUrl} onClick={event=>goToApp(event)}>Analisar o vendedor <Icon name="arrow-right"/></a><a href="#documentos">Conhecer as verificações</a></div></div>
      <div className={styles.assurances}>{[["file-earmark-text","Fontes oficiais"],["briefcase","Processo seguro"],["chat-left-text","Informação para decidir"]].map(([icon,label])=><div key={label}><Icon name={icon}/><span>{label}</span></div>)}</div>
    </div></section>
    <section className={styles.section} id="documentos"><div className={styles.container}>
      <p className={styles.eyebrow}>Entenda o que está por trás da consulta</p><h2>Não basta reunir certidões.<br/><span>É preciso entender o que elas dizem.</span></h2>
      <div className={styles.detailsGrid}>
        <div><p className={styles.intro}>Um documento pode trazer uma ocorrência que exige contexto. Outro pode estar indisponível ou precisar de atualização. A análise organiza essas diferenças para ajudar você a fazer as perguntas certas.</p><a className={styles.textLink} href={appUrl} onClick={event=>goToApp(event)}>Consultar opções no aplicativo</a></div>
        <div className={styles.accordions}>
          <details open><summary>Certidões cíveis e processos judiciais</summary><p>Ajudam a localizar ações e ocorrências relacionadas ao vendedor. Quando há um processo, sua natureza, fase e possível relação com o patrimônio precisam ser avaliadas antes de tirar conclusões.</p></details>
          <details><summary>Débitos fiscais e obrigações trabalhistas</summary><p>Reúnem informações das esferas federal, estadual e municipal e da Justiça do Trabalho, conforme a consulta. Uma pendência pode exigir esclarecimentos, comprovantes ou análise profissional adicional.</p></details>
          <details><summary>Protestos, restrições e indisponibilidades</summary><p>Sinalizam registros que merecem atenção. A identificação correta da pessoa, a data da consulta e a abrangência da fonte são essenciais para interpretar o resultado.</p></details>
          <details><summary>Matrícula, titularidade e ônus do imóvel</summary><p>Na diligência complementar do imóvel, a matrícula ajuda a verificar os titulares e os registros existentes. Compare os dados do documento com a negociação e esclareça eventuais gravames, restrições ou divergências.</p></details>
        </div>
      </div>
    </div></section>
    <section className={styles.section} id="tipo-de-imovel"><div className={styles.container}>
      <p className={styles.eyebrow}>Cuidados conforme a negociação</p><h2>Cada imóvel tem <span>suas próprias perguntas.</span></h2><p className={styles.intro}>Além do vendedor, o tipo de bem orienta os documentos que podem ser necessários em uma diligência complementar.</p>
      <div className={styles.scenarios}>{scenarios.map(([title,subtitle,description],i)=><article key={title}><span className={styles.index}>0{i+1}</span><h3>{title}</h3><h4>{subtitle}</h4><p>{description}</p></article>)}</div>
    </div></section>
    <section className={styles.section} id="relatorio"><div className={`${styles.container} ${styles.detailsGrid}`}>
      <div><p className={styles.eyebrow}>Da informação ao próximo passo</p><h2>Um resultado para ler,<br/><span>compartilhar e avaliar.</span></h2><p className={styles.intro}>Use a análise para conversar com o vendedor, seu corretor ou advogado. A decisão continua sendo sua, apoiada por informações organizadas.</p></div>
      <div className={styles.outputs}>{[["Documentos reunidos","Consulte as certidões e os materiais obtidos dentro do escopo da solicitação."],["Pontos de atenção em contexto","Entenda o que foi encontrado, o que falta esclarecer e quais verificações podem ser necessárias."],["Próximos passos mais claros","Avalie se é preciso atualizar documentos, aprofundar processos ou buscar uma revisão especializada."]].map(([title,description])=><article key={title}><Icon name="file-earmark-text"/><div><h3>{title}</h3><p>{description}</p></div></article>)}</div>
    </div></section>
    <section className={styles.section} id="exemplo-preventivo" aria-labelledby="example-title"><div className={styles.container}>
      <div className={styles.detailsGrid}>
        <div>
          <p className={styles.eyebrow}>Caso noticiado · Angra dos Reis (RJ)</p>
          <h2 id="example-title">Uma mansão de R$ 10 milhões.<br/><span>A compra não encerrou a disputa pela posse.</span></h2>
          <p className={styles.intro}>O caso envolve uma mansão na Ilha Comprida, em Angra dos Reis, avaliada nas reportagens em cerca de R$ 10 milhões. Em 2020, uma empresa negociou o imóvel e passou a ocupá-lo. Em maio de 2022, os ocupantes receberam um oficial de Justiça e policiais para cumprir uma ordem de reintegração de posse, segundo o Poder360.</p>
          <p className={styles.intro}>A controvérsia envolvia uma cadeia anterior de negócios e direitos reivindicados por outra empresa. A reportagem também descreve a posterior regularização cadastral na Secretaria do Patrimônio da União (SPU) e a emissão de uma autorização de transferência. O ponto decisivo: quem negociou e ocupou a casa enfrentou direitos de terceiros que não se resolviam apenas com o contrato de compra.</p>
          <p className={styles.note}>Este resumo descreve o recorte histórico noticiado em novembro de 2022, não o andamento atual dos processos.</p>

        </div>
        <figure className={styles.caseImage}><Image src="/images/caso-angra-prevencao.png" width={815} height={1024} sizes="(max-width: 700px) 100vw, 520px" alt="Peça ilustrativa sobre análise preventiva de uma negociação imobiliária em Angra dos Reis."/></figure>
      </div>
      <div className={styles.scenarios}>
        <article><h3>R$ 12 milhões: o cenário do relatório.</h3><p>O material de referência simula R$ 10 milhões na aquisição mais R$ 2 milhões em benfeitorias: R$ 12 milhões de exposição financeira. Essa soma é uma hipótese didática, não um prejuízo comprovado do caso. O risco ilustrado é comprometer recursos na compra e nas obras e depois enfrentar a retirada do imóvel; eventual indenização exige análise própria.</p><p><strong>Irregularidade na SPU:</strong> Não há autorização de ocupação ou aforamento regular na Secretaria do Patrimônio da União.</p></article>
        <article><h3>O que a IA Audita poderia ajudar a evitar?</h3><p><strong>Pagar o sinal, assumir parcelas ou investir em reformas sem conhecer os riscos da negociação.</strong> Ao organizar as certidões e apontar processos e inconsistências encontrados na análise do vendedor, a IA Audita poderia alertar o comprador para a necessidade de esclarecer os direitos oferecidos antes de comprometer o dinheiro.</p><p>Com esse alerta em mãos, o comprador poderia suspender o pagamento, exigir documentos e regularização ou desistir da compra após orientação jurídica. Isso poderia evitar a exposição financeira de avançar com uma negociação ainda não esclarecida e de iniciar obras antes de verificar a segurança da posse.</p><p>A verificação completa do imóvel, da SPU e da cadeia de contratos exige escopo complementar. A utilidade preventiva é dar informação para decidir antes de pagar; não há como garantir que a análise impediria a disputa ou a perda nesse caso.</p></article>
      </div>
      <p className={styles.note}>Caso apresentado sem nomes no texto. A cronologia acima vem da reportagem; as verificações e o cenário financeiro são uma simulação preventiva. Não houve auditoria da IA Audita nesse caso. Não é possível afirmar que uma consulta de R$ 99 impediria a perda, nem que todas as verificações descritas estejam incluídas nesse valor.</p>
      <a className={styles.textLink} href="#certidoes-e-due-diligence">Entenda a consulta de certidões e a análise avançada →</a>
    </div></section>
    <section className={styles.section} id="duvidas"><div className={`${styles.container} ${styles.detailsGrid}`}>
      <div><p className={styles.eyebrow}>Antes de começar</p><h2>Suas dúvidas,<br/><span>com clareza.</span></h2></div>
      <div className={styles.accordions}>{faqs.map(([q,a])=><details key={q}><summary>{q}</summary><p>{a}</p></details>)}</div>
    </div></section>
    </>}
    {approach && <section className={styles.banner}><div className={styles.container}><h2>{approach.closingTitle}</h2><p className={styles.intro}>{approach.closingDescription}</p><div className={styles.actions}><a className={styles.button} href={appUrl} onClick={event => goToApp(event)}>{approach.cta} <Icon name="arrow-right" /></a></div></div></section>}
    <footer className={styles.footer}><div className={styles.container}><div className={styles.footerTop}><Link href="/" aria-label="IA Audita — início"><Logo/></Link><p>{approach ? "Documentos e contexto para decisões mais informadas." : "Mais informação para uma decisão imobiliária consciente."}</p><Link href="/politica-de-privacidade">Política de Privacidade</Link><Link href="/termos-de-uso">Termos de Uso</Link></div><p>A IA Audita organiza informações para apoiar a tomada de decisão. A análise não substitui assessoria jurídica{approach ? " ou verificações complementares." : ", vistoria ou verificações complementares."}</p><small>© {new Date().getFullYear()} IA Audita. Todos os direitos reservados.</small></div></footer>
  </main>;
}
