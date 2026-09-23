import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

test('institutional home lists published services and shares a single header', () => {
  const home = readFileSync('app/home-clara/page.tsx', 'utf8');
  for (const route of ['/analise-de-vendedor', '/analise-cobrancas-indevidas', 'dividas-bancarias', 'pis-pasep', 'contas-de-luz', 'consulta-de-imoveis']) assert.ok(home.includes(route), route);
  assert.ok(!home.includes('redirect('));
  assert.ok(readFileSync('app/layout.tsx', 'utf8').includes('<SiteHeader />'));
  for (const page of ['SellerAnalysisPage', 'SellerAnalysisPage2', 'ChargeAnalysisPage']) assert.ok(!readFileSync(`components/audita/${page}.tsx`, 'utf8').includes('<header'));
  const header = readFileSync('components/audita/SiteHeader.tsx', 'utf8');
  assert.ok(header.includes('aria-expanded={open}'));
  assert.ok(header.includes('aria-controls="site-navigation"'));
});

test('home covers Eduardo service proposals without offering unavailable modules', () => {
  const home = readFileSync('app/home-anterior/page.tsx', 'utf8');
  for (const text of ['Distrito Federal', 'quatro certidões', 'Disponível em piloto', 'Em homologação', 'Isenção e restituição de IR', 'Laudo para análise de exames', 'Laudo para atualização de processos judiciais', 'O que você recebe']) assert.ok(home.includes(text), text);
  for (const text of ['id="importacao"', 'Invoice', 'Packing List', 'Ex-Tarifários', 'id="assistente-ia"', 'Certidões do imóvel urbano ou rural', 'Inventarium', 'Relatório Técnico de Auditoria Financeira', 'Central de atendimento e plataforma']) assert.ok(home.includes(text), text);
  assert.ok(home.indexOf('id="importacao"') < home.indexOf('id="assistente-ia"'), 'Importation is the first service');
  const upcoming = home.slice(home.indexOf('upcomingServices.map'), home.indexOf('className={styles.central}'));
  assert.ok(!upcoming.includes('href='), 'Unavailable services must not have contracting links');
  const importation = home.slice(home.indexOf('id="importacao"'), home.indexOf('id="assistente-ia"'));
  assert.ok(!importation.includes('href='), 'Unverified importation flow must not have a contracting link');
  for (const claim of ['100% de Precisão', 'Risco Zero Comercial', '1.2 Bilhão', 'agosto de 2035']) assert.ok(!home.includes(claim), claim);
});
