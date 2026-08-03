import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
test("landing page includes the core conversion and compliance content", async()=>{const source=await readFile(new URL("../components/audita/SellerAnalysisPage.tsx",import.meta.url),"utf8");assert.match(source,/Antes de comprar um imóvel/);assert.match(source,/Política de Privacidade/);assert.match(source,/FAQPage/);assert.doesNotMatch(source,/risco zero garantido/i)});
test("lead endpoint fails honestly without integration",async()=>{const source=await readFile(new URL("../app/api/leads/route.ts",import.meta.url),"utf8");assert.match(source,/LEAD_API_URL/);assert.match(source,/status: 503/)});
