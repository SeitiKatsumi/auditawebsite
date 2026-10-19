"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import sellerApproaches from "../../content/seller-approaches.json";
import styles from "./SiteHeader.module.css";
import { serviceGroups } from "../../content/service-catalog";



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
  const photoService = ["auditoria-de-glosas", "auxilio-acidente", "audita-kids", "dividas-bancarias", "pis-pasep", "isencao-imposto-de-renda", "auditoria-de-importacao", "revisao-contas-de-luz", "laudos-de-processos-judiciais", "laudos-de-exames", ...sellerApproaches.map(({ slug }) => slug)].some(slug => pathname === `/servicos/${slug}`);
  const isHome = pathname === "/" || pathname === "/home-clara";
  const light = pathname.startsWith("/servicos/") && !photoService;
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
        {!light && !isHome && <Link href="/">Início</Link>}
        <Link href="/central-de-servicos" aria-current={pathname === "/central-de-servicos" ? "page" : undefined}>Central de serviços</Link>
        <details ref={solutionsRef} className={styles.solutions}>
          <summary>Soluções <span aria-hidden="true">⌄</span></summary>
          <div className={styles.solutionsPanel}>
            <div className={styles.solutionGroups}>{serviceGroups.map(group => <section className={styles.solutionGroup} key={group.id} aria-labelledby={`menu-${group.id}`}><h3 id={`menu-${group.id}`}>{group.name}</h3><ul>{group.services.map(({ name, href, status }) => <li key={href}><Link href={href} aria-current={pathname === href ? "page" : undefined}><span>{name}</span>{status && <small>{status}</small>}</Link></li>)}</ul></section>)}</div>
            <Link className={styles.allSolutions} href="/central-de-servicos">Ver todas as soluções →</Link>
          </div>
        </details>
        <Link href="/#sobre">Sobre a IA Audita</Link>
        <a className={styles.access} href="https://app.auditainteligente.com.br/">Acessar plataforma ↗</a>
      </nav>
    </div>
  </header>;
}
