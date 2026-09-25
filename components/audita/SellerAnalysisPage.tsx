"use client";
import Image from "next/image";
import Link from "next/link";
import { MouseEvent, useEffect, useMemo } from "react";
import styles from "./SellerAnalysisPage.module.css";

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

export function SellerAnalysisPage() {
  const utms = useMemo(() => typeof window === "undefined" ? {} : Object.fromEntries(new URLSearchParams(window.location.search).entries()), []);
  const appUrl = "https://app.auditainteligente.com.br/";
  const goToApp = (event: MouseEvent<HTMLAnchorElement>, plan?: string) => {
    event.preventDefault();
    const query = new URLSearchParams(window.location.search);
    if (plan) query.set("plano", plan);
    window.location.href = `${appUrl}${query.size ? `?${query}` : ""}`;
  };
  useEffect(() => { track("view_seller_analysis_lp", { ...utms }); }, [utms]);

  const schema = { "@context":"https://schema.org", "@graph":[{ "@type":"Service", name:"Análise de Vendedor de Imóvel", provider:{"@type":"Organization",name:"IA Audita"}, areaServed:"BR", serviceType:"Diligência imobiliária com inteligência artificial", description:"Consulta e organização de certidões e documentos para apoiar a análise de riscos relacionados ao vendedor de um imóvel." },{ "@type":"FAQPage", mainEntity:faqs.map(([name,text])=>({"@type":"Question",name,acceptedAnswer:{"@type":"Answer",text}})) }] };

  return <main className={styles.page}>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    <section className={styles.hero}>
      <Image src="/images/seller-diligence-hero.webp" alt="Casa contemporânea ao entardecer e exemplo ilustrativo de relatório de análise do vendedor" fill priority sizes="100vw" className={styles.heroImage} />
      <div className={styles.container}><div className={styles.heroCopy}>
        <p className={styles.eyebrow}>Diligência imobiliária com inteligência artificial</p>
        <h1>Antes de comprar um imóvel, conheça <span>quem está vendendo.</span></h1>
        <p>Certidões, documentos e pontos de atenção organizados para você decidir com mais clareza.</p>
        <div className={styles.actions}><a className={styles.button} href={appUrl} onClick={(event)=>{track("click_hero_cta");goToApp(event);}}>Analisar o vendedor <Icon name="arrow-right" /></a><a href="#analise">O que será consultado</a></div>
        <small>Mais segurança na negociação, com informação.</small>
      </div></div>
    </section>
    <section className={styles.section} id="analise"><div className={styles.container}>
      <p className={styles.eyebrow}>Mais contexto para uma boa decisão</p>
      <h2>Escritura assinada <span>não encerra a análise.</span></h2>
      <p className={styles.intro}>A compra de um imóvel envolve mais do que o bem. A situação de quem vende e a regularidade do imóvel fazem parte da decisão. A IA Audita organiza essas informações de forma clara, para você avaliar com tranquilidade.</p>
      <div className={styles.documentGrid}>{documents.map(doc=><article key={doc.title}>
        <div className={styles.documentTitle}><div className={styles.icon}><Icon name={doc.icon}/></div><div><h3>{doc.title}</h3><p>{doc.subtitle}</p></div></div>
        <p>{doc.description}</p><h4>Principais documentos analisados</h4>
        <ul className={styles.checklist}>{doc.items.map(item=><li key={item}>{item}</li>)}</ul>
      </article>)}</div>
      <p className={styles.note}>As consultas dependem da localidade, da disponibilidade das fontes e do escopo contratado. A análise do imóvel pode ser complementar à consulta do vendedor.</p>
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
          <p className={styles.eyebrow}>Um caso para entender o risco</p>
          <h2 id="example-title">Uma compra milionária.<br/><span>Uma disputa pela posse.</span></h2>
          <p className={styles.intro}>Uma negociação envolvendo uma mansão em uma ilha, avaliada em cerca de R$ 10 milhões, acabou em uma disputa judicial pela posse. O caso noticiado mostra por que o contrato e o investimento no imóvel não encerram a verificação de quem pode vender e quais direitos estão sendo adquiridos.</p>
          <p className={styles.intro}>Uma compra de milhões merece uma análise antes da assinatura. Uma diligência prévia pode identificar pendências, inconsistências e processos relevantes antes do pagamento. A IA Audita ajuda a organizar essas informações para apoiar sua decisão.</p>
        </div>
        <div className={styles.outputs}>
          <article><Icon name="file-earmark-text"/><div><h3>1. Entender o que está sendo vendido</h3><p>Conferir a matrícula, a titularidade e o instrumento apresentado. Uma cessão de direitos possessórios precisa ser compreendida no seu próprio contexto, sem ser confundida com a transferência de propriedade registrada.</p></div></article>
          <article><Icon name="file-earmark-text"/><div><h3>2. Investigar o histórico da negociação</h3><p>Examinar contratos anteriores, certidões e processos dos envolvidos para identificar disputas pela posse, divergências entre documentos e possíveis direitos de terceiros.</p></div></article>
          <article><Icon name="file-earmark-text"/><div><h3>3. Conferir as condições da área</h3><p>Em ilhas e áreas costeiras, a diligência pode exigir consultas à Secretaria do Patrimônio da União (SPU), análise do regime de ocupação e verificações ambientais, conforme a situação do imóvel.</p></div></article>
        </div>
      </div>
      <div className={styles.scenarios}>
        <article><h3>O alerta vem antes do sinal.</h3><p>Divergências de titularidade, disputas anteriores e documentos ausentes são motivos para esclarecer a negociação e buscar avaliação especializada antes de comprometer o dinheiro.</p></article>
        <article><h3>Mais contexto para decidir.</h3><p>A IA Audita ajuda a organizar certidões e pontos de atenção do vendedor. Uma investigação completa do imóvel, da cadeia de contratos e de condições especiais exige escopo complementar e revisão profissional.</p></article>
      </div>
      <p className={styles.note}>Exemplo adaptado de caso noticiado, sem citar os nomes dos envolvidos. As verificações descritas são uma simulação de diligência preventiva, não uma auditoria realizada pela IA Audita nesse caso. Dependem do escopo contratado e das fontes disponíveis e não garantem evitar perdas.</p>
      <a className={styles.textLink} href="#certidoes-e-due-diligence">Entenda a consulta de certidões e a análise avançada →</a>
    </div></section>
    <section className={styles.section} id="duvidas"><div className={`${styles.container} ${styles.detailsGrid}`}>
      <div><p className={styles.eyebrow}>Antes de começar</p><h2>Suas dúvidas,<br/><span>com clareza.</span></h2></div>
      <div className={styles.accordions}>{faqs.map(([q,a])=><details key={q}><summary>{q}</summary><p>{a}</p></details>)}</div>
    </div></section>
    <footer className={styles.footer}><div className={styles.container}><div className={styles.footerTop}><Link href="/" aria-label="IA Audita — início"><Logo/></Link><p>Mais informação para uma decisão imobiliária consciente.</p><Link href="/politica-de-privacidade">Política de Privacidade</Link><Link href="/termos-de-uso">Termos de Uso</Link></div><p>A IA Audita organiza informações para apoiar a tomada de decisão. A análise não substitui assessoria jurídica, vistoria ou verificações complementares.</p><small>© {new Date().getFullYear()} IA Audita. Todos os direitos reservados.</small></div></footer>
  </main>;
}
