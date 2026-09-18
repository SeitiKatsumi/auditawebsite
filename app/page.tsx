import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";

const otherServices = [
  ["Dívidas bancárias", "Entenda os juros e a evolução da dívida a partir dos seus extratos, com relatório para apoiar a negociação.", "dividas-bancarias"],
  ["Cotas antigas PIS/PASEP", "Orientação para consultar cotas antigas e organizar os documentos do requerimento. Não se trata do abono salarial.", "pis-pasep"],
  ["Contas de luz", "Confira suas faturas de energia e organize as informações para preparar um pedido de revisão.", "contas-de-luz"],
  ["Consulta de imóveis", "Conheça os canais disponíveis na plataforma para buscar informações sobre imóveis.", "consulta-imoveis"],
];

export default function Home() {
  return <main className={styles.home}>
    <section className={styles.intro}>
      <div className={styles.brandSymbol} aria-hidden="true"><Image src="/images/audita-oficial-branca.png" alt="" width={800} height={600} priority /></div>
      <div className={styles.introCopy}>
        <p className={styles.label}>IA Audita · Inteligência a serviço das pessoas</p>
        <h1>Informação complexa.<br/><em>Entendimento simples.</em></h1>
        <p className={styles.lead}>Uma plataforma, diferentes formas de ajudar. Conectamos inteligência artificial e análise documental para transformar informações dispersas em conhecimento que você pode usar.</p>
        <div className={styles.introActions}><a href="#sobre" className={styles.button}>Conheça a IA Audita ↓</a><a href="#servicos" className={styles.textLink}>Explore nossas soluções ↗</a></div>
      </div>
      <div className={styles.brandStatement}><span>Documentos. Contexto. Clareza.</span><p>Diferentes necessidades.<br/>O mesmo propósito: ajudar você a entender.</p></div>
    </section>
    <section id="servicos" className={styles.services}>
      <div className={styles.sectionHead}><p className={styles.label}>Nossos serviços</p><h2>O que você precisa<br/>entender melhor hoje?</h2><p>Escolha a análise para o seu momento. Conheça o serviço e comece pela plataforma.</p></div>
      <article className={styles.service}><div className={styles.serviceImage}><Image src="/images/risco-compra-popular.webp" fill sizes="(max-width: 800px) 100vw, 45vw" alt="Documentos e chaves de uma negociação imobiliária" /></div><div className={styles.serviceCopy}><p className={styles.label}>Antes de comprar um imóvel</p><h3>Conheça quem está<br/>do outro lado da venda.</h3><p>A análise do vendedor reúne certidões e documentos disponíveis para identificar ocorrências e pontos de atenção antes de você assinar ou pagar.</p><ul><li>Consulta e organização de certidões</li><li>Leitura assistida por inteligência artificial</li><li>Relatório para apoiar sua decisão</li></ul><Link href="/analise-de-vendedor" className={styles.textLink}>Conhecer a análise de vendedor ↗</Link></div></article>
      <article className={`${styles.service} ${styles.reverse}`}><div className={styles.serviceImage}><Image src="/images/hero-cobrancas-indevidas.png" fill sizes="(max-width: 800px) 100vw, 45vw" alt="Mulher revisando suas faturas e extratos bancários" /></div><div className={styles.serviceCopy}><p className={styles.label}>De olho nas suas faturas</p><h3>Uma cobrança pequena<br/>merece uma boa análise.</h3><p>Encontrou um seguro que não reconhece? Nossa análise de cobranças indevidas, com foco no caso Itaú, ajuda a localizar lançamentos e organizar os documentos.</p><ul><li>Leitura de faturas e extratos enviados</li><li>Conferência das cobranças por você</li><li>Valores documentados e relatório em PDF</li></ul><Link href="/analise-cobrancas-indevidas" className={styles.textLink}>Conhecer a análise de cobranças ↗</Link></div></article>
      <div className={styles.otherServices}><div className={styles.otherHeading}><p className={styles.label}>Também na plataforma</p><h3>Outras formas de olhar<br/>melhor para seus documentos.</h3><p>O acesso aos serviços exige login. Consulte a disponibilidade e as condições de cada análise.</p></div><div>{otherServices.map(([title, description, route]) => <a key={route} href={`https://app.auditainteligente.com.br/#${route}`} className={styles.serviceRow}><h4>{title}<span aria-hidden="true">↗</span></h4><p>{description}</p></a>)}</div></div>
    </section>
    <section id="sobre" className={styles.about}><div><p className={styles.label}>Sobre a IA Audita</p><h2>Tecnologia para ler.<br/>Clareza para decidir.</h2></div><div><p>Acreditamos que entender documentos não deveria ser um obstáculo para tomar boas decisões. A IA Audita usa inteligência artificial para organizar informações, facilitar a leitura e destacar o que merece sua atenção.</p><p>Da negociação de um imóvel às cobranças do dia a dia, nosso trabalho é tornar a informação mais acessível — com documentos reunidos e uma visão objetiva dos próximos passos.</p><p className={styles.disclaimer}>A análise depende dos documentos e das fontes disponíveis. Não garante ausência de riscos, redução de dívidas ou ressarcimento e não substitui orientação jurídica quando necessária.</p></div></section>
    <section className={styles.closing}><p className={styles.label}>Seu próximo passo começa com informação</p><h2>Olhe com mais atenção.<br/>Decida com mais clareza.</h2><a className={styles.button} href="https://app.auditainteligente.com.br/#central-servicos">Conhecer a plataforma ↗</a></section>
    <footer className={styles.footer}><div><strong>IA Audita</strong><p>Inteligência para as decisões da vida.</p></div><nav aria-label="Links institucionais"><Link href="/#servicos">Serviços</Link><Link href="/politica-de-privacidade">Privacidade</Link><Link href="/termos-de-uso">Termos de uso</Link></nav><small>© {new Date().getFullYear()} IA Audita</small></footer>
  </main>;
}
