document.addEventListener("DOMContentLoaded", () => {
  const page = document.querySelector(".audita-landing"); if (!page) return;
  window.dataLayer?.push({ event: "view_charge_analysis_lp", landing_version: "charge_analysis_post" });
  const nav = page.querySelector(".nav"); const menu = page.querySelector(".menuButton");
  menu?.addEventListener("click", () => { const open = nav.classList.toggle("navOpen"); menu.setAttribute("aria-expanded", String(open)); });
  nav?.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => nav.classList.remove("navOpen")));
  page.querySelectorAll("[data-faq]").forEach((button) => button.addEventListener("click", () => {
    const answer = document.getElementById(button.getAttribute("aria-controls")); const open = button.getAttribute("aria-expanded") === "true";
    button.setAttribute("aria-expanded", String(!open)); button.querySelector("b").textContent = open ? "+" : "−"; answer.hidden = open;
  }));
  page.querySelectorAll("[data-audita-cta]").forEach((link) => link.addEventListener("click", (event) => {
    event.preventDefault(); const query = new URLSearchParams(window.location.search); query.set("origem", "landing-cobrancas-post");
    window.dataLayer?.push({ event: "click_charge_analysis_cta", landing_version: "charge_analysis_post", placement: link.dataset.auditaCta });
    window.location.href = `https://app.auditainteligente.com.br/?${query}#analise-cobrancas`;
  }));
});
