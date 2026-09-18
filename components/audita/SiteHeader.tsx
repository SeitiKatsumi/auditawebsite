"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import styles from "./SiteHeader.module.css";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  return <header className={styles.header} onKeyDown={(event) => { if (event.key === "Escape") setOpen(false); }}>
    <div className={styles.inner}>
      <Link href="/" className={styles.brand} onClick={() => setOpen(false)} aria-label="IA Audita — início"><Image src="/images/audita-oficial-branca.png" alt="" width={64} height={48} priority /><span>IA Audita</span></Link>
      <button className={styles.toggle} aria-expanded={open} aria-controls="site-navigation" onClick={() => setOpen(!open)}>{open ? "Fechar ×" : "Menu ☰"}</button>
      <nav id="site-navigation" className={`${styles.nav} ${open ? styles.open : ""}`} aria-label="Navegação principal" onClick={() => setOpen(false)}>
        <Link href="/" aria-current={pathname === "/" ? "page" : undefined}>Início</Link>
        <Link href="/#servicos">Serviços</Link>
        <Link href="/analise-de-vendedor" aria-current={pathname.startsWith("/analise-de-vendedor") ? "page" : undefined}>Análise de vendedor</Link>
        <Link href="/analise-cobrancas-indevidas" aria-current={pathname === "/analise-cobrancas-indevidas" ? "page" : undefined}>Cobranças indevidas</Link>
        <Link href="/#sobre">Sobre nós</Link>
        <a className={styles.access} href="https://app.auditainteligente.com.br/">Acessar plataforma ↗</a>
      </nav>
    </div>
  </header>;
}
