import approaches from "../../content/seller-approaches.json";
import styles from "./SellerAnalysisPage.module.css";

export function DocumentaryAnalysisContent({ approach }: { approach: (typeof approaches)[number] }) {
  return <>
    <section className={styles.section} id="analise"><div className={styles.container}>
      <p className={styles.eyebrow}>{approach.title}</p>
      <h2>{approach.introTitle}</h2><p className={styles.intro}>{approach.intro}</p>
      <div className={styles.documentGrid}>{approach.documents.map(doc => <article key={doc.title}>
        <div className={styles.documentTitle}><h3>{doc.title}</h3></div>
        <p>{doc.description}</p><h4>Documentos e informações para reunir</h4>
        <ul className={styles.checklist}>{doc.items.map(item => <li key={item}>{item}</li>)}</ul>
      </article>)}</div>
      <p className={styles.note}>Este roteiro inclui documentos que podem exigir fornecimento pelos envolvidos ou análise complementar. As consultas disponíveis, fontes, abrangência, valores e prazos são confirmados no aplicativo.</p>
    </div></section>
    <section className={styles.section} id="como-funciona"><div className={styles.container}>
      <p className={styles.eyebrow}>Da consulta à decisão</p><h2>{approach.journeyTitle}</h2>
      <ol className={styles.journey}>{approach.journey.map(([title, description], i) => <li key={title}><span className={styles.number}>{i + 1}</span><div><h3>{title}</h3><p>{description}</p></div></li>)}</ol>
    </div></section>
    <section className={styles.section} id="exemplo"><div className={`${styles.container} ${styles.detailsGrid}`}>
      <div><p className={styles.eyebrow}>Exemplo fictício · aplicação prática</p><h2>{approach.example.title}</h2><p className={styles.intro}>{approach.example.situation}</p></div>
      <div className={styles.outputs}><article><div><h3>O ponto de atenção</h3><p>{approach.example.attention}</p></div></article><article><div><h3>Antes de avançar</h3><p>{approach.example.nextStep}</p></div></article></div>
    </div></section>
    <section className={styles.section} id="resultado"><div className={styles.container}>
      <p className={styles.eyebrow}>Informação que orienta a conversa</p><h2>{approach.resultTitle}</h2>
      <div className={styles.scenarios}>{approach.results.map(([title, description]) => <article key={title}><h3>{title}</h3><p>{description}</p></article>)}</div>
    </div></section>
    <section className={styles.section} id="duvidas"><div className={`${styles.container} ${styles.detailsGrid}`}>
      <div><p className={styles.eyebrow}>Antes de começar</p><h2>Dúvidas sobre<br/><span>{approach.faqTitle}</span></h2><p className={styles.intro}>{approach.note}</p></div>
      <div className={styles.accordions}>{approach.questions.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div>
    </div></section>
  </>;
}
