import type { Metadata } from "next";
import Link from "next/link";
import s from "../emissao-processos-judiciais/page.module.css";
import c from "./page.module.css";
import catalog from "../../../content/certificate-catalog.json";
const appUrl = "https://app.auditainteligente.com.br/#emissao-certidoes";

export const metadata: Metadata = {
  title: "Emissão de certidões e análise documental com IA",
  description: "Conheça o catálogo de certidões da IA Audita. Certidões judiciais estaduais e regularidade fiscal, organizadas por tema, com acesso direto ao app.",
  alternates: { canonical: "https://auditainteligente.com.br/servicos/emissao-de-certidoes" },
};

const faq = [
  ["Como solicitar uma certidão?", "Escolha uma opção do catálogo para acessar a emissão no app. Lá você informa o titular, seleciona os estados e confere a disponibilidade e as condições antes de confirmar."],
  ["Quais dados preciso informar?", "Os dados variam conforme a certidão e o órgão emissor. Tenha em mãos a identificação da pessoa ou empresa e confira os campos solicitados na plataforma. Para documentos imobiliários, podem ser necessários a matrícula e o cartório responsável."],
  ["A IA Audita é o órgão emissor?", "Não. A IA Audita reúne o acesso aos serviços e apoia a organização e a leitura dos documentos. A emissão oficial e as informações certificadas pertencem ao órgão ou cartório responsável."],
  ["Todas as certidões têm cobertura nacional?", "A abrangência depende de cada fonte. O catálogo nesta página identifica os estados atendidos em cada opção. Confira a localidade e o tipo de documento antes de solicitar."],
  ["O que a análise por IA acrescenta?", "A análise documental ajuda a destacar apontamentos, divergências e informações que merecem conferência. Ela não garante ausência de riscos nem substitui a verificação de autenticidade na fonte ou a avaliação profissional do caso."],
];

export default function CertidoesPage() {
  return <main className={s.page}>
    <section className={s.hero}><div className={`${s.wrap} ${s.heroGrid}`}>
      <div><p className={s.kicker}>IA Audita · Emissão de certidões</p>
        <h1>As certidões certas.<br/><em>Mais clareza antes de decidir.</em></h1>
        <p className={s.lead}>Emita certidões, organize os documentos e conte com o apoio da inteligência artificial para identificar pontos de atenção.</p>
        <p>Consulte as opções por tema e localidade. Da distribuição judicial à regularidade fiscal, encontre o documento adequado à sua necessidade.</p>
        <div className={s.actions}><a className={s.button} href={appUrl}>Acessar plataforma <span aria-hidden="true">↗</span></a><a href="#catalogo">Ver todas as opções ↓</a></div>
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
        <p className={s.note}>Selecione certidões e consultas no app. Após a coleta, assinantes IA podem solicitar uma análise personalizada dos documentos.</p>
      </div>
    </div></section>

    <section className={s.section} id="catalogo"><div className={s.wrap}>
      <p className={s.kicker}>Catálogo de certidões e consultas</p><h2>Escolha o documento.<br/><em>Continue no app.</em></h2>
      <p className={s.intro}>Explore as opções por tema. Abra uma categoria para conferir os documentos e acesse o app para solicitar.</p>
      <p className={s.note}>As opções variam entre CPF e CNPJ e conforme a localidade. Consultas de dados e comprovantes estão identificados e não equivalem a certidões oficiais. Confirme a disponibilidade atual no app.</p>
      <div className={c.catalog}>{catalog.map((group,index)=><details className={c.catalogGroup} key={group.name} id={`certidoes-${index}`}>
        <summary><span>{group.name}</span><small>{group.items.length}</small></summary>
        <ul>{group.items.map(item=><li key={item.name}><strong>{item.name}</strong><small>{item.detail}</small></li>)}</ul>
      </details>)}</div>
      <div className={c.catalogAction}><a className={s.button} href={appUrl}>Emitir certidões no app ↗</a></div>
    </div></section>

    <section className={`${s.section} ${s.tint}`}><div className={`${s.wrap} ${s.split}`}>
      <div><p className={s.kicker}>Inteligência artificial integrada</p><h2>Além de reunir.<br/><em>Entender o documento.</em></h2><p>A proposta da IA Audita é conectar a emissão à leitura das certidões, organizando informações relevantes antes de uma contratação ou negociação.</p></div>
      <div className={s.audiences}>{[
        ["Identificação de apontamentos", "Destaque para ocorrências e pendências registradas no documento, com atenção à fonte e à abrangência da consulta."],
        ["Conferência das informações", "Apoio à verificação dos dados identificadores, das datas e de possíveis divergências que precisem de revisão."],
        ["Contexto para o próximo passo", "Organização dos achados para orientar a conferência com o órgão emissor ou o profissional responsável."],
      ].map(([title, text]) => <article key={title}><h3>{title}</h3><p>{text}</p></article>)}</div>
    </div></section>

    <section className={`${s.section} ${s.tint}`}><div className={s.wrap}><p className={s.kicker}>Perguntas frequentes</p><h2>Antes da emissão,<br/><em>confira os detalhes.</em></h2><div className={s.faq}>{faq.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div></div></section>
    <section className={s.closing}><div className={s.wrap}><p className={s.kicker}>Emissão de certidões · IA Audita</p><h2>Seu próximo passo começa<br/><em>com a informação certa.</em></h2><p>Acesse a plataforma para conferir as opções de emissão e os dados necessários.</p><div className={c.closingActions}><a className={s.button} href={appUrl}>Acessar plataforma ↗</a><Link href="/central-de-servicos">Ver todos os serviços →</Link></div></div></section>
  </main>;
}
