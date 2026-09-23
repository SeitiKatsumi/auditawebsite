import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
const pages = JSON.parse(readFileSync('content/service-pages.json', 'utf8'));
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
      assert.equal(page.status, 'Em desenvolvimento');
      assert.equal(page.appHash, 'central-servicos');
      assert.ok(!/enviar|contratar/i.test(page.cta));
    }
  }
});
