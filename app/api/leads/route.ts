import { NextRequest, NextResponse } from "next/server";
const email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export async function POST(request: NextRequest) {
  try { const body = await request.json(); if (body.company) return NextResponse.json({ ok: true });
    if (!body.name || String(body.name).trim().length < 3 || !email.test(String(body.email)) || !body.phone || !body.consent) return NextResponse.json({ error: "Dados inválidos" }, { status: 400 });
    const endpoint = process.env.LEAD_API_URL; if (!endpoint) return NextResponse.json({ error: "Integração de leads não configurada" }, { status: 503 });
    const response = await fetch(endpoint, { method: "POST", headers: { "Content-Type": "application/json", ...(process.env.LEAD_API_TOKEN ? { Authorization: `Bearer ${process.env.LEAD_API_TOKEN}` } : {}) }, body: JSON.stringify(body), signal: AbortSignal.timeout(10000) });
    if (!response.ok) return NextResponse.json({ error: "Falha no provedor" }, { status: 502 }); return NextResponse.json({ ok: true }, { status: 201 });
  } catch { return NextResponse.json({ error: "Requisição inválida" }, { status: 400 }); }
}
