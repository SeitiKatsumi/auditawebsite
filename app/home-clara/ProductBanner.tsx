"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";

export default function ProductBanner() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [reduced, setReduced] = useState(true);
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  useEffect(() => {
    if (paused || hovered || reduced) return;
    const timer = window.setInterval(() => {
      if (!document.hidden) setActive(value => (value + 1) % 2);
    }, 8000);
    return () => window.clearInterval(timer);
  }, [paused, hovered, reduced]);
  function select(index: number) {
    setActive(index);
    setPaused(true);
  }
  return <section className={styles.importation} id="importacao" aria-label="Soluções em destaque" aria-roledescription="carrossel" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} onFocusCapture={() => setPaused(true)}>
    <div className={styles.wrap}>
      <div className={styles.bannerStage}>
        <div className={styles.bannerSlide} inert={active !== 0} aria-hidden={active !== 0} data-active={active === 0}>
          <div className={styles.split}>
            <div><p className={styles.eyebrow}>Para quem importa</p><h2>Mais clareza para importar.<br/><em>Mais controle para decidir.</em></h2><p className={styles.lead}>Conferência de documentos, sugestões de NCM e pesquisa de possíveis benefícios, com simulação de II e IPI para revisão humana.</p><span className={styles.status}>Recebimento de documentos ainda não habilitado</span><Link className={styles.bannerCta} href="/servicos/auditoria-de-importacao">Conheça a auditoria de importação <span aria-hidden="true">→</span></Link></div>
            <Image src="/images/home-clara-importacao.png" width={800} height={650} alt="Ilustração de documento de importação, contêiner e globo" className={styles.importArt}/>
          </div>
        </div>
        <div className={styles.bannerSlide} inert={active !== 1} aria-hidden={active !== 1} data-active={active === 1}>
          <div className={styles.split}>
            <div><p className={styles.eyebrow}>Cobranças indevidas no cartão</p><h2>Uma cobrança passou despercebida?<br/><em>Olhe de novo. Com a IA Audita.</em></h2><p className={styles.lead}>Confira seguros e serviços nas faturas do Itaú, Itaucard e parceiros. A IA Audita localiza possíveis cobranças não reconhecidas e organiza os documentos para você entender os próximos passos.</p><Link className={styles.bannerCta} href="/analise-cobrancas-indevidas">Conheça a análise de cobranças <span aria-hidden="true">→</span></Link></div>
            <Image src="/images/home-clara-cobrancas.png" width={1448} height={1086} alt="Ilustração de cartão, fatura e lupa destacando um lançamento" className={styles.importArt}/>
          </div>
        </div>
      </div>
      <div className={styles.bannerControls}>
        <button type="button" onClick={() => select(0)} aria-pressed={active === 0}>Importação</button>
        <button type="button" onClick={() => select(1)} aria-pressed={active === 1}>Cobranças indevidas</button>
        {!reduced && <button type="button" className={styles.bannerPause} onClick={() => setPaused(value => !value)} aria-label={paused ? "Retomar rotação" : "Pausar rotação"}>{paused ? "Retomar" : "Pausar"}</button>}
      </div>
    </div>
  </section>;
}
