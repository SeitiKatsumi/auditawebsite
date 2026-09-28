import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
const pages = JSON.parse(readFileSync('content/service-pages.json', 'utf8'));

test('six dedicated landings retain availability and use their own page compositions', () => {
  const route = readFileSync('app/servicos/[slug]/page.tsx', 'utf8');
  const expected = {
    'pis-pasep': [undefined, 'pis-pasep', 'PisPasepPage'],
    'isencao-imposto-de-renda': [undefined, 'isencao-ir', 'IncomeTaxPage'],
    'certidoes-estaduais': [undefined, 'consulta-tjdft-pf', 'CertificatesPage'],
    'auditoria-de-importacao': ['Recebimento de documentos ainda não habilitado', 'auditoria-importacao', 'ImportAuditPage'],
    'revisao-contas-de-luz': [undefined, 'contas-de-luz', 'EnergyPage'],
    'laudos-de-processos-judiciais': [undefined, 'central-servicos', 'FinancialReportPage'],
  };
  for (const [slug, [status, appHash, component]] of Object.entries(expected)) {
    const page = pages.find(page => page.slug === slug);
    const content = readFileSync(`components/services/${component}.tsx`, 'utf8');
    assert.ok(route.includes(`"${slug}": ${component}`), slug);
    assert.ok(content.includes(`data-service="${slug}"`), slug);
    assert.equal(page.status, status, slug);
    assert.equal(page.appHash, appHash, slug);
    assert.ok(page.questions.length >= 6 && page.questions.length <= 8, slug);
    assert.ok(content.includes('id="como-funciona"'), slug);
    assert.ok(content.includes('id="exemplos"'), slug);
    assert.ok((content.match(/Exemplo (?:fictício )?0[12]/g) || []).length >= 2, slug);
    assert.ok(page.sources?.length, slug);
  }
});

test('shared solutions menu links all twelve services and keeps the mobile menu accessible', () => {
  const header = readFileSync('components/audita/SiteHeader.tsx', 'utf8');
  for (const href of [...pages.map(page => '/servicos/' + page.slug), '/analise-de-vendedor', '/analise-cobrancas-indevidas']) assert.ok(header.includes(`"${href}"`), href);
  assert.ok(header.includes('<summary>Soluções'));
  assert.ok(header.includes('aria-expanded={open}'));
  assert.ok(header.includes('closest("a")'), 'Opening the solutions disclosure must not close mobile navigation');
});
test('every new service landing is reachable from the home', () => {
  const home = readFileSync('app/home-clara/page.tsx', 'utf8');
  for (const page of pages) assert.ok(home.includes('/servicos/' + page.slug), page.slug);
});
test('service landing pages have distinct content, valid assets and honest destinations', () => {
  assert.equal(new Set(pages.map(p => p.slug)).size, pages.length);
  for (const page of pages) {
    for (const key of ['slug','title','headline','accent','description','cta','appHash','delivery','limit']) assert.ok(page[key]?.length, page.slug + ': ' + key);
    assert.match(page.slug, /^[a-z0-9-]+$/);
    assert.match(page.appHash, /^[a-z0-9-]+$/);
    assert.ok(existsSync('public' + page.image));
    assert.equal(page.benefits.length, 3);
    assert.ok(page.documents.length >= 3);
    assert.ok(page.questions.length >= 3);
    if (page.slug.startsWith('laudos-')) {
      assert.equal(page.status, page.slug === 'laudos-de-processos-judiciais' ? undefined : 'Em desenvolvimento');
      assert.equal(page.appHash, 'central-servicos');
      assert.ok(!/enviar|contratar/i.test(page.cta));
    }
  }
});
