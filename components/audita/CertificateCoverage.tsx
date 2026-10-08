import styles from "./CertificateCoverage.module.css";

export function CertificateCoverage() {
  return <section className={styles.coverage} aria-labelledby="abrangencia-certidoes">
    <div>
      <p className={styles.eyebrow}>Certidões e análise documental · CPF e CNPJ</p>
      <h2 id="abrangencia-certidoes">Do seu estado ao Brasil inteiro.</h2>
      <p>Escolha um estado, vários estados ou o pacote Brasil inteiro para consultar documentos de pessoas e empresas.</p>
    </div>
    <div>
      <ul className={styles.options}><li>Um estado</li><li>Vários estados</li><li>Pacote Brasil inteiro</li></ul>
      <p>Emita as certidões disponíveis ou avance para a análise documental com a IA Audita. A abrangência, as fontes, os documentos e os valores são apresentados no aplicativo antes da contratação.</p>
    </div>
  </section>;
}
