import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

test('institutional home lists published services and shares a single header', () => {
  const home = readFileSync('app/page.tsx', 'utf8');
  for (const route of ['/analise-de-vendedor', '/analise-cobrancas-indevidas', 'dividas-bancarias', 'pis-pasep', 'contas-de-luz', 'consulta-imoveis']) assert.ok(home.includes(route), route);
  assert.ok(!home.includes('redirect('));
  assert.ok(readFileSync('app/layout.tsx', 'utf8').includes('<SiteHeader />'));
  for (const page of ['SellerAnalysisPage', 'SellerAnalysisPage2', 'ChargeAnalysisPage']) assert.ok(!readFileSync(`components/audita/${page}.tsx`, 'utf8').includes('<header'));
  const header = readFileSync('components/audita/SiteHeader.tsx', 'utf8');
  assert.ok(header.includes('aria-expanded={open}'));
  assert.ok(header.includes('aria-controls="site-navigation"'));
});

test('home explains all nine services without offering unavailable modules', () => {
  const home = readFileSync('app/page.tsx', 'utf8');
  for (const text of ['Distrito Federal', 'quatro certidões', 'Disponível em piloto', 'Em homologação', 'Isenção e restituição de IR', 'Laudo para análise de exames', 'Laudo para atualização de processos judiciais', 'O que você recebe']) assert.ok(home.includes(text), text);
  const upcoming = home.slice(home.indexOf('upcomingServices.map'), home.indexOf('</section>', home.indexOf('upcomingServices.map')));
  assert.ok(!upcoming.includes('href='), 'Unavailable services must not have contracting links');
});
