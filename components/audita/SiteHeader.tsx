"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import styles from "./SiteHeader.module.css";

const solutions = [
  ["Cobranças indevidas", "/analise-cobrancas-indevidas"],
  ["Dívidas bancárias", "/servicos/dividas-bancarias"],
  ["PIS/PASEP", "/servicos/pis-pasep"],
  ["Isenção de Imposto de Renda", "/servicos/isencao-imposto-de-renda"],
  ["Certidões estaduais", "/servicos/certidoes-estaduais"],
  ["Indisponibilidade de bens", "/servicos/indisponibilidade-de-bens"],
  ["Análise de vendedor", "/analise-de-vendedor"],
  ["Consulta de imóveis", "/servicos/consulta-de-imoveis"],
  ["Auditoria de importação", "/servicos/auditoria-de-importacao"],
  ["Revisão de contas de luz", "/servicos/revisao-contas-de-luz"],
  ["Laudos de exames", "/servicos/laudos-de-exames"],
  ["Laudos de processos judiciais", "/servicos/laudos-de-processos-judiciais"],
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const solutionsRef = useRef<HTMLDetailsElement>(null);
  const closeNavigation = () => {
    setOpen(false);
    if (solutionsRef.current) solutionsRef.current.open = false;
  };
  useEffect(() => {
    const closeOutside = (event: PointerEvent) => {
      if (solutionsRef.current && !solutionsRef.current.contains(event.target as Node)) solutionsRef.current.open = false;
    };
    document.addEventListener("pointerdown", closeOutside);
    return () => document.removeEventListener("pointerdown", closeOutside);
  }, []);
  const light = pathname === "/" || pathname === "/home-clara" || pathname.startsWith("/servicos/");
  return <header className={`${styles.header} ${light ? styles.light : ""}`} onKeyDown={(event) => {
    if (event.key !== "Escape") return;
    if (solutionsRef.current?.open) {
      solutionsRef.current.open = false;
      solutionsRef.current.querySelector("summary")?.focus();
    } else if (open) {
      closeNavigation();
      event.currentTarget.querySelector<HTMLButtonElement>('button[aria-controls="site-navigation"]')?.focus();
    }
  }}>
    <div className={styles.inner}>
      <Link href="/" className={styles.brand} onClick={closeNavigation} aria-label="IA Audita — início"><Image src="/images/audita-oficial-branca.png" alt="" width={64} height={48} priority /><span>IA Audita</span></Link>
      <button className={styles.toggle} aria-expanded={open} aria-controls="site-navigation" onClick={() => open ? closeNavigation() : setOpen(true)}>{open ? "Fechar ×" : "Menu ☰"}</button>
      <nav id="site-navigation" className={`${styles.nav} ${open ? styles.open : ""}`} aria-label="Navegação principal" onClick={(event) => { if ((event.target as Element).closest("a")) closeNavigation(); }}>
        {!light && <Link href="/">Início</Link>}
        <details ref={solutionsRef} className={styles.solutions}>
          <summary>Soluções <span aria-hidden="true">⌄</span></summary>
          <div className={styles.solutionsPanel}>
            <ul>{solutions.map(([label, href]) => <li key={href}><Link href={href} aria-current={pathname === href ? "page" : undefined}>{label}</Link></li>)}</ul>
            <Link className={styles.allSolutions} href="/#servicos">Ver todas as soluções →</Link>
          </div>
        </details>
        <Link href="/#sobre">Sobre a IA Audita</Link>
        <a className={styles.access} href="https://app.auditainteligente.com.br/">Acessar plataforma ↗</a>
      </nav>
    </div>
  </header>;
}
