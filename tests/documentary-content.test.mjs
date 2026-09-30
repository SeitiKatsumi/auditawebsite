import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

test('all eight documentary services have complete, distinct content beyond the hero', () => {
  const pages = JSON.parse(readFileSync('content/seller-approaches.json', 'utf8'));
  assert.equal(pages.length, 8);
  for (const field of ['introTitle', 'intro', 'journeyTitle', 'documents', 'journey', 'example', 'results', 'questions']) {
    assert.equal(new Set(pages.map(page => JSON.stringify(page[field]))).size, 8, field);
  }
  for (const page of pages) {
    assert.equal(page.documents.length, 2, page.slug);
    assert.equal(page.journey.length, 3, page.slug);
    assert.ok(page.questions.length >= 3, page.slug);
    assert.ok(Object.values(page.example).every(value => value.length > 30), page.slug);
    assert.ok(page.documents.every(doc => doc.items.length >= 3), page.slug);
    assert.doesNotMatch(JSON.stringify(page), /Angra dos Reis|ASSINAR ESCRITURA|Analisar o vendedor/);
  }
});
