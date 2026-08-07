"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, MouseEvent, useEffect, useMemo, useState } from "react";

const risks = [
  ["01", "⚖", "Processos e ocorrências", "Registros que merecem avaliação antes do avanço da negociação."],
  ["02", "▤", "Pendências documentais", "Documentos ausentes, inconsistentes ou que exigem atenção adicional."],
  ["03", "◇", "Riscos relacionados ao vendedor", "Pontos que podem impactar a segurança da compra."],
  ["04", "▱", "Informações dispersas", "Certidões e documentos reunidos em uma análise estruturada."],
];
const steps = ["Informe os dados", "Consultamos as fontes", "Organizamos os documentos", "A IA apoia a leitura", "Você recebe o parecer"];
const stepIcons = ["⌨", "⌕", "▱", "✦", "✓"];
const benefits = [["◎","Antecipe pontos de atenção"],["◷","Economize tempo"],["⇄","Reduza a assimetria de informação"],["▤","Centralize a documentação"],["◌","Facilite o alinhamento profissional"],["◇","Decida com mais confiança"]];
const plans = [
  { slug:"essencial", icon:"▤", name:"Audita Essencial", price:"99", description:"Uma primeira verificação para negociações em fase inicial.", features:["1 vendedor pessoa física","Validação de nome e CPF","Principais certidões disponíveis","Leitura inicial com IA","Resumo executivo","Relatório e documentos em PDF"], cta:"Fazer análise essencial", note:"Uma primeira visão antes de avançar." },
  { slug:"completa", icon:"◎", name:"Audita Completa", price:"199", description:"O melhor equilíbrio para quem está próximo de assinar ou pagar.", features:["Tudo do plano Essencial","Consulta ampliada de certidões","Leitura aprofundada e cruzamentos","Mapa visual dos riscos","Recomendações objetivas","Relatório completo e prioridade"], cta:"Escolher análise completa", note:"Mais profundidade antes de assinar ou pagar.", featured:true },
  { slug:"protecao-360", icon:"◇", name:"Audita Proteção 360", price:"299", description:"Camada adicional de profundidade para negociações complexas.", features:["Tudo do plano Completa","Até 2 vendedores na negociação","Cruzamento consolidado","Revisão técnica especializada","Atualização em até 30 dias","Atendimento com prioridade máxima"], cta:"Quero a Proteção 360", note:"Maior profundidade para decisões de maior valor." },
];
const comparison = [["Validação de nome e CPF","Sim","Sim","Sim"],["Consulta de certidões","Principais","Ampliada","Ampliada"],["Leitura com IA","Inicial","Aprofundada","Avançada"],["Cruzamento de informações","—","Sim","Avançado"],["Número de vendedores","1","1","Até 2"],["Revisão especializada","—","—","Sim"],["Atualização das consultas","—","—","Até 30 dias"],["Atendimento prioritário","—","Sim","Prioridade máxima"]];
const faqs = [
  ["O que é a Análise de Vendedor?", "É uma diligência que reúne certidões e documentos oficiais, organiza as informações e destaca ocorrências relevantes para apoiar a decisão de compra."],
  ["A Audita analisa o imóvel?", "Este serviço é focado no vendedor. A análise do imóvel é uma etapa complementar e deve considerar matrícula, condição física, urbanística e demais documentos aplicáveis."],
  ["A existência de um processo impede a venda?", "Não necessariamente. Uma ocorrência precisa ser compreendida dentro de seu contexto, natureza, fase e possível impacto na negociação."],
  ["A análise garante que a compra não terá riscos?", "Não. A Audita reduz a assimetria de informação e apoia a tomada de decisão, sem prometer risco zero ou substituir orientação jurídica especializada."],
  ["A inteligência artificial toma a decisão?", "Não. A tecnologia auxilia na leitura e organização. A decisão permanece com o comprador e seus profissionais de confiança."],
  ["Posso compartilhar o resultado com meu advogado?", "Sim. O material organizado facilita o alinhamento com advogados, corretores e demais profissionais envolvidos."],
  ["As informações ficam protegidas?", "Os dados são tratados para a finalidade da solicitação, com práticas de segurança e privacidade descritas em nossa Política de Privacidade."],
];

function track(event: string, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  const dataLayer = (window as Window & { dataLayer?: unknown[] }).dataLayer ||= [];
  dataLayer.push({ event, page: "seller_analysis", device: window.innerWidth < 768 ? "mobile" : "desktop", ...params });
}

function Logo() { return <Image src="/images/audita-oficial-branca.png" width={800} height={600} alt="Audita" className="brand-logo" priority />; }

export function SellerAnalysisPage() {
  const [menu, setMenu] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const utms = useMemo(() => typeof window === "undefined" ? {} : Object.fromEntries(new URLSearchParams(window.location.search).entries()), []);
  const appUrl = "https://app.auditainteligente.com.br/";
  const planUrl = (plan: string) => `${appUrl}?plano=${plan}`;
  const goToApp = (event: MouseEvent<HTMLAnchorElement>, plan?: string) => {
    event.preventDefault();
    const query = new URLSearchParams(window.location.search);
    if (plan) query.set("plano", plan);
    window.location.href = `${appUrl}${query.size ? `?${query}` : ""}`;
  };
  useEffect(() => { track("view_seller_analysis_lp", { ...utms }); }, [utms]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); if (status === "loading") return;
    const form = event.currentTarget; const data = Object.fromEntries(new FormData(form));
    setStatus("loading"); track("submit_lead_form", { profile: data.profile, step: "single" });
    try {
      const response = await fetch("/api/leads", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...data, utms, source: document.referrer || "direct", page: location.pathname, submittedAt: new Date().toISOString() }) });
      if (!response.ok) throw new Error(); setStatus("success"); form.reset(); track("lead_form_success", { profile: data.profile });
    } catch { setStatus("error"); track("lead_form_error"); }
  }

  const schema = { "@context":"https://schema.org", "@graph":[{ "@type":"Service", name:"Análise de Vendedor de Imóvel", provider:{"@type":"Organization",name:"Audita"}, areaServed:"BR", serviceType:"Diligência imobiliária com inteligência artificial", description:"Consulta e organização de certidões e documentos para apoiar a análise de riscos relacionados ao vendedor de um imóvel." },{ "@type":"FAQPage", mainEntity:faqs.map(([name,text])=>({"@type":"Question",name,acceptedAnswer:{"@type":"Answer",text}})) }] };

  return <main>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    <header className="header"><div className="container nav">
      <Link href="/analise-de-vendedor" aria-label="Audita — início"><Logo /></Link>
      <nav className={menu ? "nav-links open" : "nav-links"} aria-label="Navegação principal">
        <a href="#como-funciona">Como funciona</a><a href="#analise">O que analisamos</a><a href="#relatorio">O que você recebe</a><a href="#duvidas">Dúvidas</a>
      </nav>
      <a className="btn btn-small desktop-cta" href={appUrl} onClick={(event) => { track("click_header_cta", { position: "header" }); goToApp(event); }}>Analisar vendedor</a>
      <button className="menu-button" aria-label="Abrir menu" aria-expanded={menu} onClick={() => setMenu(!menu)}><span/><span/></button>
    </div></header>

    <section className="hero"><Image src="/images/hero.webp" fill priority sizes="100vw" alt="Profissional usando tablet em ambiente de análise digital" className="hero-image" />
      <div className="hero-overlay"/><div className="container hero-content">
        <p className="eyebrow"><span/> Diligência imobiliária com inteligência artificial</p>
        <h1>Antes de comprar um imóvel, analise <em>quem está vendendo.</em></h1>
        <p className="hero-copy">A Audita consulta certidões oficiais, organiza os documentos e utiliza inteligência artificial para identificar ocorrências, riscos e pontos de atenção relacionados ao vendedor.</p>
        <div className="hero-actions"><a className="btn" href={appUrl} onClick={(event) => { track("click_hero_cta", { position: "hero" }); goToApp(event); }}>Analisar o vendedor agora <b>→</b></a><a className="btn-link" href="#como-funciona" onClick={() => track("click_how_it_works")}>Entender como funciona ↓</a></div>
        <p className="microcopy">Mais clareza antes de assinar, pagar ou avançar na negociação.</p>
        <div className="trust-row">{["Certidões oficiais", "Documentos organizados", "Análise assistida por IA", "Parecer objetivo"].map(x => <span key={x}>✓ {x}</span>)}</div>
      </div>
    </section>

    <section className="section tension"><div className="container"><div className="section-heading narrow"><p className="kicker">O risco que costuma ficar fora do radar</p><h2>O imóvel pode parecer seguro.<br/><span>A negociação pode não ser.</span></h2><p>Uma compra imobiliária envolve muito mais do que localização, preço e estado de conservação. Situações relacionadas ao vendedor precisam ser identificadas antes da decisão.</p></div>
      <div className="risk-grid">{risks.map(([n,icon,t,d]) => <article className="risk-card" key={n}><span className="card-number">{n}</span><div className="line-icon" aria-hidden="true">{icon}</div><h3>{t}</h3><p>{d}</p></article>)}</div>
      <p className="legal-note">A existência de uma ocorrência não significa, isoladamente, impedimento para a negociação. Cada situação deve ser analisada dentro de seu contexto.</p>
    </div></section>

    <section className="section analysis" id="analise"><div className="container split"><div><p className="kicker">O que a Audita analisa</p><h2>Informações dispersas transformadas em uma <span>visão clara da negociação.</span></h2><p>A Audita percorre uma jornada de validação, consulta, organização e interpretação para apresentar os pontos mais relevantes relacionados ao vendedor.</p><div className="feature-list">{["Validação dos dados", "Consulta de certidões", "Organização dos documentos", "Leitura inteligente", "Classificação dos pontos de atenção", "Parecer objetivo"].map((x,i)=><div key={x}><b>0{i+1}</b><span>{x}</span></div>)}</div></div>
      <div className="analysis-visual"><Image src="/images/analysis.webp" fill sizes="(max-width: 800px) 100vw, 50vw" alt="Especialista analisando documentos e indicadores digitais" /><div className="floating-card fc-one"><b>DOCUMENTOS</b><span>Organizados e validados</span></div><div className="floating-card fc-two"><b>ANÁLISE</b><span>Pontos de atenção</span></div></div>
    </div></section>

    <section className="section workflow" id="como-funciona"><div className="container"><div className="section-heading"><p className="kicker">Da consulta à decisão</p><h2>Uma jornada simples para uma decisão mais informada.</h2></div><div className="steps">{steps.map((s,i)=><div className="step" key={s}><span><b aria-hidden="true">{stepIcons[i]}</b><small>{String(i+1).padStart(2,"0")}</small></span><h3>{s}</h3><p>{["Dados básicos do vendedor iniciam a diligência.","Acessamos certidões e fontes disponíveis.","PDFs oficiais ficam centralizados.","Ocorrências são estruturadas e contextualizadas.","Um resultado objetivo apoia seus próximos passos."][i]}</p></div>)}</div><a className="btn centered" href={appUrl} onClick={(event)=>goToApp(event)}>Iniciar minha análise →</a></div></section>

    <section className="section report" id="relatorio"><div className="container split report-split"><div className="report-copy"><p className="kicker">O que você recebe</p><h2>Um parecer que transforma documentos em <span>próximos passos.</span></h2><p>Veja os dados principais, documentos consultados, ocorrências encontradas e observações que merecem atenção — tudo em uma leitura objetiva.</p><ul><li>Resumo executivo da análise</li><li>Documentos oficiais centralizados</li><li>Pontos de atenção classificados</li><li>Observações e recomendações de verificação</li></ul></div><div className="report-ui" onMouseEnter={() => track("view_report_preview")}><div className="report-top"><Logo/><span>ANÁLISE DO VENDEDOR</span></div><div className="score"><div className="ring">A</div><div><small>VISÃO GERAL</small><strong>Análise concluída</strong><p>Documentos organizados para avaliação</p></div></div><div className="report-row"><span>✓ Dados validados</span><b className="tag ok">Verificado</b></div><div className="report-row"><span>⌕ Ocorrências</span><b className="tag attention">Atenção</b></div><div className="report-row"><span>▤ Certidões oficiais</span><b className="tag info">Organizado</b></div><p className="report-disclaimer">A classificação apoia a leitura e não representa garantia jurídica ou recomendação automática.</p></div></div></section>

    <section className="section benefits"><div className="container"><div className="section-heading"><p className="kicker">Clareza que muda a conversa</p><h2>Mais controle antes de assumir um compromisso de alto valor.</h2></div><div className="benefit-grid">{benefits.map(([icon,b],i)=><article key={b}><div className="feature-icon" aria-hidden="true">{icon}</div><span>0{i+1}</span><h3>{b}</h3><p>{["Perceba situações relevantes antes da assinatura.","Evite buscas manuais e documentos espalhados.","Entre na negociação sabendo o que precisa perguntar.","Consulte os materiais em um único fluxo.","Compartilhe uma base clara com quem orienta você.","Avance com informações organizadas e contexto."][i]}</p></article>)}</div></div></section>

    <section className="section comparison"><div className="container"><div className="section-heading"><p className="kicker">Uma diligência mais inteligente</p><h2>Da busca fragmentada à visão estruturada.</h2></div><div className="compare-grid"><article><span className="compare-label">PROCESSO CONVENCIONAL</span>{["Buscas manuais em diferentes fontes", "PDFs soltos e difíceis de acompanhar", "Termos técnicos sem contexto", "Dificuldade para priorizar pontos relevantes"].map(x=><p key={x}>× {x}</p>)}</article><article className="audita-way"><span className="compare-label">COM A AUDITA</span>{["Jornada centralizada de consulta", "Documentos oficiais organizados", "Leitura assistida por inteligência artificial", "Parecer objetivo para apoiar a decisão"].map(x=><p key={x}>✓ {x}</p>)}</article></div></div></section>

    <section className="section pricing" id="planos" onMouseEnter={() => track("view_pricing_section")}><div className="container"><div className="section-heading"><p className="kicker">Planos de análise</p><h2>Escolha o nível de profundidade ideal para sua negociação.</h2><p>Da verificação inicial à análise mais completa, a Audita transforma documentos técnicos em informações mais claras para a sua decisão.</p><div className="one-time">Pagamento único por análise · Sem mensalidade</div></div>
      <div className="pricing-grid">{plans.map((plan)=><article className={plan.featured ? "price-card featured" : "price-card"} key={plan.slug}>{plan.featured && <div className="popular">MAIS ESCOLHIDO</div>}<div className="plan-icon" aria-hidden="true">{plan.icon}</div><h3>{plan.name}</h3><p className="plan-description">{plan.description}</p><div className="price"><small>R$</small><strong>{plan.price}</strong><span>pagamento único</span></div><ul>{plan.features.map(feature=><li key={feature}>✓ {feature}</li>)}</ul><a className={plan.featured ? "btn plan-button" : "btn plan-button outline"} href={planUrl(plan.slug)} onClick={(event)=>{track(`select_${plan.slug.replace("-","_")}_plan`,{plan:plan.slug,value:Number(plan.price),position:"pricing"});goToApp(event,plan.slug);}}>{plan.cta} →</a><p className="plan-note">{plan.note}</p></article>)}</div>
      <div className="plan-comparison"><div className="comparison-head"><b>Recurso</b><b>Essencial</b><b>Completa</b><b>Proteção 360</b></div>{comparison.map(([feature,...values])=><div className="comparison-row" key={feature}><strong>{feature}</strong>{values.map((value,i)=><span key={`${feature}-${i}`} data-plan={["Essencial","Completa","Proteção 360"][i]}>{value}</span>)}</div>)}</div>
      <div className="pricing-help"><div><h3>Não sabe qual análise escolher?</h3><p>Para a maior parte das negociações, recomendamos a Audita Completa. Para múltiplos vendedores ou maior complexidade, escolha a Proteção 360.</p></div><a className="btn outline" href={appUrl} onClick={(event)=>{track("request_plan_help");goToApp(event);}}>Preciso de ajuda para escolher →</a></div>
      <p className="pricing-legal">As consultas dependem da disponibilidade das fontes, dos órgãos responsáveis e das informações fornecidas. A análise apoia a decisão, mas não garante ausência integral de riscos nem substitui avaliação jurídica quando necessária.</p>
    </div></section>

    <section className="section profiles"><div className="container split"><div className="profiles-image"><Image src="/images/professionals.webp" fill sizes="(max-width: 800px) 100vw, 50vw" alt="Profissionais avaliando dados de uma negociação imobiliária" /></div><div><p className="kicker">Para quem decide e para quem orienta</p><h2>Uma base comum para conversas mais seguras.</h2><div className="profile-grid">{[["Compradores","Entenda melhor quem está do outro lado da negociação."],["Corretores e imobiliárias","Eleve o padrão de cuidado no atendimento."],["Advogados","Receba documentos organizados para aprofundar a avaliação."],["Investidores","Ganhe agilidade sem abrir mão de uma leitura criteriosa."]].map(([t,d])=><article key={t}><h3>{t}</h3><p>{d}</p></article>)}</div></div></div></section>

    <section className="section trust"><div className="container trust-box"><div className="seal">A<span>✓</span></div><div><p className="kicker">Tecnologia com responsabilidade</p><h2>Inteligência artificial apoia a análise. <span>A decisão continua sendo humana.</span></h2><p>A Audita organiza informações oficiais e destaca pontos para avaliação. Não substitui advogado, não promete risco zero e não transforma uma ocorrência isolada em impedimento automático.</p></div></div></section>

    <section className="section form-section" id="solicitar"><div className="container form-layout"><div><p className="kicker">Comece por quem está vendendo</p><h2>Solicite sua Análise de Vendedor.</h2><p>Conte brevemente sobre a negociação. Nossa equipe orientará os próximos passos e as informações necessárias.</p><div className="form-assurances"><span>✓ Tratamento responsável dos dados</span><span>✓ Retorno para orientar a solicitação</span><span>✓ Sem compromisso automático</span></div></div>
      <form className="lead-form" onSubmit={submit} onFocus={() => track("start_lead_form")}><div className="form-grid"><label>Nome completo<input name="name" autoComplete="name" required minLength={3} placeholder="Como podemos chamar você?" /></label><label>WhatsApp<input name="phone" autoComplete="tel" required pattern="[0-9()+\-\s]{10,20}" placeholder="(00) 00000-0000" /></label><label>E-mail<input name="email" type="email" autoComplete="email" required placeholder="voce@email.com" /></label><label>Seu perfil<select name="profile" required defaultValue=""><option value="" disabled>Selecione</option><option>Comprador</option><option>Corretor ou imobiliária</option><option>Advogado</option><option>Investidor</option><option>Outro</option></select></label></div><label>Em que etapa está a negociação?<textarea name="context" rows={3} maxLength={600} placeholder="Ex.: visitei o imóvel e recebi as primeiras certidões." /></label><label className="honeypot" aria-hidden="true">Empresa<input name="company" tabIndex={-1} autoComplete="off" /></label><label className="consent"><input name="consent" type="checkbox" required /> <span>Concordo com o tratamento dos meus dados para retorno sobre esta solicitação, conforme a <Link href="/politica-de-privacidade">Política de Privacidade</Link>.</span></label><button className="btn submit" disabled={status === "loading" || status === "success"}>{status === "loading" ? "Enviando…" : status === "success" ? "Solicitação recebida ✓" : "Solicitar análise →"}</button>{status === "error" && <p className="form-message error" role="alert">Não foi possível enviar agora. Tente novamente ou entre em contato pelo WhatsApp.</p>}{status === "success" && <p className="form-message success" role="status"><b>Solicitação recebida.</b> Nossa equipe entrará em contato para orientar os próximos passos da análise.</p>}</form>
    </div></section>

    <section className="section faq" id="duvidas"><div className="container faq-layout"><div><p className="kicker">Dúvidas frequentes</p><h2>Informação clara antes do primeiro passo.</h2></div><div>{faqs.map(([q,a],i)=><article className="faq-item" key={q}><button onClick={() => { setOpenFaq(openFaq===i?null:i); track("open_faq_item", { question: q }); }} aria-expanded={openFaq===i}><span>{q}</span><b>{openFaq===i?"−":"+"}</b></button>{openFaq===i && <p>{a}</p>}</article>)}</div></div></section>

    <section className="final-cta"><Image src="/images/buyer.webp" fill sizes="100vw" alt="Especialista em diligência imobiliária" /><div className="final-overlay"/><div className="container"><p className="kicker">Sua próxima decisão merece contexto</p><h2>Antes de avançar na compra, entenda quem está vendendo.</h2><p>Reúna documentos, antecipe perguntas e negocie com mais clareza.</p><a className="btn" href={appUrl} onClick={(event) => { track("click_final_cta", { position: "final" }); goToApp(event); }}>Analisar o vendedor agora →</a></div></section>

    <footer><div className="container footer-grid"><div><Logo/><p>Inteligência aplicada à diligência imobiliária para decisões mais informadas.</p></div><div><b>Navegação</b><a href="#como-funciona">Como funciona</a><a href="#analise">O que analisamos</a><a href="#relatorio">O que você recebe</a></div><div><b>Institucional</b><Link href="/politica-de-privacidade">Política de Privacidade</Link><Link href="/termos-de-uso">Termos de Uso</Link><a href="mailto:contato@audita.com.br">Contato</a></div></div><div className="container copyright"><span>© {new Date().getFullYear()} Audita. Todos os direitos reservados.</span><span>Análise informativa. Não substitui assessoria jurídica.</span></div></footer>
  </main>;
}
