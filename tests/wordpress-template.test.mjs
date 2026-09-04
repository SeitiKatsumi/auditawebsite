import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
test("WordPress category template is mapped and renders dynamic post content", async () => {
  const plugin = await readFile(new URL("../wordpress/mu-plugins/audita-category-templates.php", import.meta.url), "utf8");
  const template = await readFile(new URL("../wordpress/mu-plugins/audita-category-templates/templates/itau-debitos.php", import.meta.url), "utf8");
  assert.match(plugin, /debitos-indevidos-itau.*itau-debitos/); assert.match(plugin, /single_template/);
  assert.match(plugin, /mod_rewrite_rules/);
  assert.match(template, /the_title\(\)/); assert.match(template, /the_content\(\)/);
  assert.ok(template.indexOf("the_content()") < template.indexOf('<footer class="footer">'));
});
