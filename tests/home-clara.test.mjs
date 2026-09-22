import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';

test('light proposal preserves service navigation, accessible chart and isolated theme', () => {
  const page = readFileSync('app/home-clara/page.tsx', 'utf8');
  for (const text of ['/analise-de-vendedor', '/analise-cobrancas-indevidas', 'pis-pasep', 'dividas-bancarias', 'contas-de-luz', 'consulta-imoveis', 'TIPI', '<details', 'role="meter"', 'aria-valuenow={value}', 'aria-label={label}', 'width: `${value}%`', 'entre famílias endividadas', 'index: false']) assert.ok(page.includes(text), text);
  assert.ok(!page.includes('<meter'), 'No browser-dependent native meter fallback');
  for (const name of ['home-clara-marca.png', 'home-clara-importacao.png']) assert.ok(existsSync(`public/images/${name}`));
  assert.ok(readFileSync('components/audita/SiteHeader.tsx','utf8').includes('pathname === "/home-clara"'));
  assert.ok(readFileSync('app/page.tsx','utf8').includes('export { default } from "./home-clara/page"'));
  assert.ok(readFileSync('app/page.tsx','utf8').includes('index: true'));
  const financial = page.slice(page.indexOf('id="contexto-financeiro"'), page.indexOf('id="sobre"'));
  for (const text of ['Analisar minha dívida bancária', 'Conhecer a análise de cobranças no cartão', '#dividas-bancarias', 'laudo em PDF', 'cheque especial PF/MEI', 'não garantem redução ou restituição']) assert.ok(financial.includes(text), text);
});
