import Image from "next/image";
import styles from "./ChargeReportExample.module.css";

const reportUrl = "/documents/exemplo-relatorio-auditoria-financeira.pdf";

export function ChargeReportExample() {
  return (
    <section className={styles.section} id="relatorio-da-ia" aria-labelledby="report-example-title">
      <div className={styles.container}>
        <div className={styles.intro}>
          <p className={styles.kicker}>Dos documentos ao relatório</p>
          <h2 id="report-example-title">Relatório gerado pela IA.<br /><em>Seus dados, em detalhe.</em></h2>
          <p>A IA Audita organiza os dados das faturas e extratos em um relatório técnico para você conferir os lançamentos e apoiar a avaliação dos próximos passos.</p>
          <ul className={styles.features}>
            <li><strong>Resumo dos valores</strong><span>Uma visão das parcelas e dos totais apresentados no relatório.</span></li>
            <li><strong>Memória de cálculo</strong><span>Datas, valores originais e critérios de atualização discriminados por lançamento.</span></li>
            <li><strong>Material para revisão</strong><span>Dados organizados para conferência e avaliação profissional antes de formular um pedido.</span></li>
          </ul>
          <a className={styles.link} href={reportUrl} target="_blank" rel="noopener noreferrer">Ver relatório de exemplo em PDF <span aria-hidden="true">↗</span><span className={styles.srOnly}> (abre em nova aba)</span></a>
        </div>
        <div className={styles.preview}>
          <div className={styles.previewHeading}><span>IA AUDITA · RELATÓRIO TÉCNICO</span><strong>Exemplo ilustrativo</strong></div>
          <a href={reportUrl} target="_blank" rel="noopener noreferrer" aria-label="Abrir relatório de exemplo completo em PDF, em nova aba" className={styles.document}>
            <Image src="/images/exemplo-relatorio-auditoria.png" width={595} height={842} alt="Primeira página do relatório de exemplo, com resumo dos pedidos, parecer técnico e tabela de cálculos por lançamento." />
          </a>
          <p className={styles.caption}>Prévia da página 1 de 2. Abra o PDF para consultar todas as parcelas.</p>
        </div>
        <div className={styles.summary} aria-label="Valores apresentados no PDF de exemplo">
          <div><span>Principal atualizado</span><strong>R$ 4.490,53</strong></div>
          <div><span>Repetição indicada no modelo</span><strong>R$ 7.906,93</strong></div>
          <div><span>Perdas e danos no modelo</span><strong>R$ 4.400,00</strong></div>
          <div><span>Total apresentado no exemplo</span><strong>R$ 16.797,46</strong></div>
        </div>
        <p className={styles.note}>Valores transcritos do PDF de exemplo, sem validação do cálculo nesta página. Não representam uma análise dos seus documentos nem uma quantia garantida a receber. Atualização, devolução em dobro e indenização dependem da análise do caso; os critérios e a possibilidade de somar pedidos devem ser revisados por um profissional.</p>
      </div>
    </section>
  );
}
