import type { Metadata } from "next";
import Link from "next/link";
import s from "../emissao-processos-judiciais/page.module.css";
import c from "./page.module.css";

export const metadata: Metadata = {
  title: "Emissão de certidões e análise documental com IA",
  description: "Conheça o catálogo de certidões da IA Audita. Certidões judiciais estaduais e regularidade fiscal, organizadas por tema, com preços e apoio à análise documental.",
  alternates: { canonical: "https://auditainteligente.com.br/servicos/emissao-de-certidoes" },
};

const states = [
  { name: "Distrito Federal", code: "DF", items: ["Criminal", "Cível", "Falência e Recuperação Judicial", "Especial (Cível e Criminal)"] },
  { name: "Espírito Santo", code: "ES", items: ["Cível", "Criminal", "Falência e Recuperação Judicial"] },
  { name: "Tocantins", code: "TO", items: ["Cível", "Criminal"] },
];
const extended = [
  ["Matrícula atualizada com ônus e ações", "Informações sobre a propriedade e os registros de ônus e ações constantes da matrícula."],
  ["Certidão de propriedade / Inteiro teor", "Conteúdo do registro para conferir o histórico e as informações documentadas do imóvel."],
  ["Certidão vintenária / trintenária", "Histórico registral relativo ao período abrangido pela certidão."],
  ["Distribuição cível na Justiça Federal", "Registros de distribuição de ações cíveis no âmbito da Justiça Federal consultada."],
  ["Certidão negativa de execução fiscal estadual", "Pesquisa de registros de execução fiscal conforme o órgão e a abrangência da emissão."],
];
const faq = [
  ["Quanto custa emitir uma certidão?", "As nove opções de tribunais estaduais e a opção de regularidade fiscal de Pernambuco apresentadas nesta página estão listadas a R$ 10,00 por certidão. Outros documentos dependem de confirmação de disponibilidade e valor na plataforma."],
  ["Quais dados preciso informar?", "Os dados variam conforme a certidão e o órgão emissor. Tenha em mãos a identificação da pessoa ou empresa e confira os campos solicitados na plataforma. Para documentos imobiliários, podem ser necessários a matrícula e o cartório responsável."],
  ["A IA Audita é o órgão emissor?", "Não. A IA Audita reúne o acesso aos serviços e apoia a organização e a leitura dos documentos. A emissão oficial e as informações certificadas pertencem ao órgão ou cartório responsável."],
  ["Todas as certidões têm cobertura nacional?", "A abrangência depende de cada fonte. O catálogo com preços nesta página identifica os estados atendidos em cada opção. Confira a localidade e o tipo de documento antes de solicitar."],
  ["O que a análise por IA acrescenta?", "A análise documental ajuda a destacar apontamentos, divergências e informações que merecem conferência. Ela não garante ausência de riscos nem substitui a verificação de autenticidade na fonte ou a avaliação profissional do caso."],
];

export default function CertidoesPage() {
  return <main className={s.page}>
    <section className={s.hero}><div className={`${s.wrap} ${s.heroGrid}`}>
      <div><p className={s.kicker}>IA Audita · Emissão de certidões</p>
        <h1>As certidões certas.<br/><em>Mais clareza antes de decidir.</em></h1>
        <p className={s.lead}>Emita certidões, organize os documentos e conte com o apoio da inteligência artificial para identificar pontos de atenção.</p>
        <p>Consulte as opções por tema e localidade. Da distribuição judicial à regularidade fiscal, encontre o documento adequado à sua necessidade.</p>
        <div className={s.actions}><a className={s.button} href="https://app.auditainteligente.com.br/">Acessar plataforma <span aria-hidden="true">↗</span></a><a href="#catalogo">Ver certidões e preços ↓</a></div>
        <p className={s.note}>Disponibilidade, dados exigidos e prazo de emissão dependem da fonte consultada. Confira as condições na plataforma.</p>
      </div>
      <div className={s.preview} aria-label="Resumo do catálogo de certidões">
        <div className={s.previewTop}><strong>IA AUDITA / CERTIDÕES</strong><span>Documentos para sua decisão</span></div>
        <p className={s.kicker}>Emissão + leitura documental</p><h2>Da certidão<br/><em>ao ponto de atenção.</em></h2>
        <div className={s.files}>{[
          ["01", "Escolha a certidão", "Tipo de documento e localidade"],
          ["02", "Confira os dados", "Identificação de quem será consultado"],
          ["03", "Acesse o documento", "Emissão conforme a disponibilidade da fonte"],
          ["04", "Entenda os apontamentos", "Apoio da IA à análise documental"],
        ].map(([number, title, text]) => <div key={number}><span className={s.fileIcon}>{number}</span><div><strong>{title}</strong><small>{text}</small></div></div>)}</div>
        <div className={c.priceNote}><strong>R$ 10,00</strong><span>por certidão nas opções listadas abaixo</span></div>
      </div>
    </div></section>

    <section className={s.section} id="catalogo"><div className={s.wrap}>
      <p className={s.kicker}>Catálogo e preços</p><h2>Encontre por tema.<br/><em>Confira por localidade.</em></h2>
      <p className={s.intro}>Estas são as opções apresentadas no catálogo de emissão. Cada certidão tem seu próprio escopo; selecione o documento e a abrangência necessários para a sua consulta.</p>
      <div className={c.categoryTitle}><h3>Tribunais estaduais</h3><span>9 certidões · R$ 10,00 cada</span></div>
      <div className={c.stateGrid}>{states.map(state => <article className={c.stateCard} key={state.code}>
        <div className={c.stateHeading}><span>{state.code}</span><h3>{state.name}</h3></div>
        <ul>{state.items.map(name => <li key={name}><span>{state.code} · {name}</span><strong>R$ 10,00</strong></li>)}</ul>
      </article>)}</div>
      <div className={c.categoryTitle}><h3>Fiscal estadual</h3><span>1 certidão · R$ 10,00</span></div>
      <article className={c.fiscal}><div><span className={s.badge}>Pernambuco · PE</span><h3>Regularidade fiscal — portal SEFAZ</h3><p>Certidão do portal SEFAZ-PE. Não compreende débitos cuja exigibilidade esteja suspensa e ressalva a cobrança de valores apurados posteriormente.</p></div><strong>R$ 10,00</strong></article>
      <div className={s.actions}><a className={s.button} href="https://app.auditainteligente.com.br/">Consultar na plataforma <span aria-hidden="true">↗</span></a></div>
    </div></section>

    <section className={`${s.section} ${s.tint}`}><div className={`${s.wrap} ${s.split}`}>
      <div><p className={s.kicker}>Inteligência artificial integrada</p><h2>Além de reunir.<br/><em>Entender o documento.</em></h2><p>A proposta da IA Audita é conectar a emissão à leitura das certidões, organizando informações relevantes antes de uma contratação ou negociação.</p></div>
      <div className={s.audiences}>{[
        ["Identificação de apontamentos", "Destaque para ocorrências e pendências registradas no documento, com atenção à fonte e à abrangência da consulta."],
        ["Conferência das informações", "Apoio à verificação dos dados identificadores, das datas e de possíveis divergências que precisem de revisão."],
        ["Contexto para o próximo passo", "Organização dos achados para orientar a conferência com o órgão emissor ou o profissional responsável."],
      ].map(([title, text]) => <article key={title}><h3>{title}</h3><p>{text}</p></article>)}</div>
    </div></section>

    <section className={s.section}><div className={s.wrap}>
      <p className={s.kicker}>Outras modalidades do catálogo</p><h2>Documentos imobiliários<br/><em>e outras certidões judiciais.</em></h2>
      <p className={s.intro}>O catálogo de referência também contempla as modalidades abaixo. Consulte a disponibilidade, a abrangência e o preço de cada uma na plataforma.</p>
      <div className={c.extended}>{extended.map(([title, text]) => <article key={title}><h3>{title}</h3><p>{text}</p><span>Disponibilidade e valor a confirmar</span></article>)}</div>
    </div></section>

    <section className={`${s.section} ${s.tint}`}><div className={s.wrap}><p className={s.kicker}>Perguntas frequentes</p><h2>Antes da emissão,<br/><em>confira os detalhes.</em></h2><div className={s.faq}>{faq.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div></div></section>
    <section className={s.closing}><div className={s.wrap}><p className={s.kicker}>Emissão de certidões · IA Audita</p><h2>Seu próximo passo começa<br/><em>com a informação certa.</em></h2><p>Acesse a plataforma para conferir as opções de emissão e os dados necessários.</p><div className={c.closingActions}><a className={s.button} href="https://app.auditainteligente.com.br/">Acessar plataforma ↗</a><Link href="/central-de-servicos">Ver todos os serviços →</Link></div></div></section>
  </main>;
}
