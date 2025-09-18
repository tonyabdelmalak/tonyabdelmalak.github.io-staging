// chat-widget/worker.js
// Cloudflare Worker that builds a System prompt from persona + knowledge,
// optionally filters knowledge by user keywords, and calls Groq's
// OpenAI-compatible Chat Completions API. Supports SSE streaming via ?stream=1.

export default {
  async fetch(req, env, ctx) {
    const url = new URL(req.url);

    // --- Health check (GET /healthz) ---
    if (url.pathname === "/healthz") {
      return new Response("ok", { status: 200, headers: baseCORSHeaders(req, env) });
    }

    // --- CORS preflight ---
    if (req.method === "OPTIONS") {
      return new Response("", { status: 204, headers: baseCORSHeaders(req, env) });
    }

    // Enforce POST /chat for API calls
    if (url.pathname !== "/chat" || req.method !== "POST") {
      return json({ error: "Use POST /chat" }, 404, req, env);
    }

    // Parse payload
    const { messages = [] } = await safeJson(req);

    // Build context
    try {
      const persona = await getPersona(env);
      const userMsg = lastUserMessage(messages) || "";
      const knowledgeDocs = await getKnowledgeDocs(env); // [{title,text}]
      const selected = await selectKnowledge(userMsg, knowledgeDocs, env);
      const systemMsg = buildSystemMessage(persona, selected);

      const llmMessages = [
        { role: "system", content: systemMsg },
        ...stripSystem(messages),
        { role: "user", content: userMsg }
      ];

      const model = env.GROQ_MODEL || "llama-3.1-70b-versatile";
      const temperature = persona?.voice?.style?.temperature ?? 0.3;
      const wantStream = (url.searchParams.get("stream") === "1");

      // --- Call Groq (OpenAI-compatible) ---
      const groqBody = {
        model,
        temperature,
        messages: llmMessages,
        stream: wantStream
      };

      const groqResp = await fetch(env.GROQ_URL || "https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${env.GROQ_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(groqBody)
      });

      if (!groqResp.ok) {
        const errText = await groqResp.text();
        return json({ error: `Groq API error ${groqResp.status}: ${errText}` }, 500, req, env);
      }

      // --- Streaming path: pipe SSE straight through ---
      if (wantStream) {
        const headers = new Headers({
          ...baseCORSHeaders(req, env),
          "Content-Type": "text/event-stream",
          "Cache-Control": "no-cache",
          "Connection": "keep-alive"
        });
        return new Response(groqResp.body, { status: 200, headers });
      }

      // --- Non-stream path: return full JSON content ---
      const data = await groqResp.json();
      const answer = data?.choices?.[0]?.message?.content ?? "I couldn’t generate a response.";
      return json({ role: "assistant", content: answer }, 200, req, env);

    } catch (e) {
      return json({ error: e.message || String(e) }, 500, req, env);
    }
  }
};

// ----------------- Utilities -----------------

function baseCORSHeaders(req, env) {
  const origin = req.headers.get("Origin") || "";
  const allowedList = String(env.ALLOWED_ORIGINS || "").split(",").map(s => s.trim()).filter(Boolean);
  const allowOrigin = allowedList.includes(origin) ? origin : (allowedList[0] || "*");
  return {
    "Access-Control-Allow-Origin": allowOrigin,
    "Access-Control-Allow-Methods": "POST, OPTIONS, GET",
    "Access-Control-Allow-Headers": "content-type, authorization",
    "Vary": "Origin"
  };
}

function json(obj, status, req, env) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: {
      "Content-Type": "application/json",
      ...baseCORSHeaders(req, env)
    }
  });
}

async function safeJson(req) {
  try { return await req.json(); }
  catch { return {}; }
}

function lastUserMessage(messages) {
  const reversed = [...messages].reverse();
  const found = reversed.find(m => m.role === "user");
  return found?.content || "";
}

function stripSystem(messages) {
  return messages.filter(m => m.role !== "system");
}

async function fetchJSON(url) {
  const res = await fetch(url, { cf: { cacheTtl: 86400, cacheEverything: true } });
  if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status}`);
  return await res.json();
}

async function fetchText(url) {
  const res = await fetch(url, { cf: { cacheTtl: 86400, cacheEverything: true } });
  if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status}`);
  return await res.text();
}

async function getPersona(env) {
  const url = env.PERSONA_URL;
  if (!url) throw new Error("Missing PERSONA_URL");
  const data = await fetchJSON(url);
  return data;
}

async function getKnowledgeDocs(env) {
  // Supports a single URL or comma-separated list of URLs
  const urls = String(env.KNOWLEDGE_URL || "").split(",").map(s => s.trim()).filter(Boolean);
  if (!urls.length) throw new Error("Missing KNOWLEDGE_URL");
  const docs = [];
  for (const u of urls) docs.push({ title: titleFromURL(u), text: await fetchText(u) });
  return docs;
}

function titleFromURL(u) {
  try {
    const p = new URL(u);
    return decodeURIComponent(p.pathname.split("/").pop() || "knowledge.md");
  } catch {
    return "knowledge.md";
  }
}

// --- Lightweight keyword filter ---
async function selectKnowledge(userMsg, docs, env) {
  const useFilter = String(env.USE_KEYWORD_FILTER || "true").toLowerCase() === "true";
  if (!useFilter) return docs;

  const keywords = extractKeywords(userMsg);
  const chosen = [];
  for (const d of docs) {
    const sections = splitMarkdownSections(d.text);
    const hits = sections.filter(s => matchesKeywords(s.heading, s.body, keywords));
    if (hits.length) {
      const merged = hits.map(h => `## ${h.heading}\n${h.body}`).join("\n\n");
      chosen.push({ title: d.title, text: merged });
    }
  }
  // Fallback to full docs if no section matched
  return chosen.length ? chosen : docs;
}

function extractKeywords(q) {
  return (q || "")
    .toLowerCase()
    .replace(/[^a-z0-9\s\-]/g, " ")
    .split(/\s+/)
    .filter(w => w.length > 2)
    .slice(0, 12);
}

function splitMarkdownSections(md) {
  const lines = md.split("\n");
  const sections = [];
  let current = { heading: "General", body: "" };
  for (const line of lines) {
    const m = line.match(/^#{1,6}\s+(.*)$/);
    if (m) {
      if (current.body.trim()) sections.push(current);
      current = { heading: m[1].trim(), body: "" };
    } else {
      current.body += line + "\n";
    }
  }
  if (current.body.trim()) sections.push(current);
  return sections;
}

function matchesKeywords(h, b, keywords) {
  const hay = `${h}\n${b}`.toLowerCase();
  return keywords.some(k => hay.includes(k)) ||
    ["quibi","flowserve","sony","roadr","hbo","nbcuniversal","recruit","attrition","workday","tableau","dashboard","forecast"]
      .some(k => hay.includes(k));
}

function buildSystemMessage(persona, knowledgeDocs) {
  const header = [
    `You are "${persona.identity.avatar_name}", the AI avatar of ${persona.identity.name}.`,
    `Speak in the first person as Tony. Tone: ${persona.voice.tone}.`,
    `Constraints:`,
    ...(persona.voice.constraints || []).map(c => `- ${c}`)
  ].join("\n");

  const bio = [
    persona.bio?.summary ? `\nBio summary:\n${persona.bio.summary}` : "",
    persona.bio?.goals_current?.length ? `\nCurrent goals:\n- ${persona.bio.goals_current.join("\n- ")}` : "",
    persona.bio?.certifications_pursuing?.length ? `\nCertifications pursuing:\n- ${persona.bio.certifications_pursuing.join("\n- ")}` : ""
  ].join("\n");

  const knowledge = knowledgeDocs.map(d => `\n[${d.title}]\n${d.text}`).join("\n");

  return [
    header,
    bio,
    "\nPublic knowledge from my site:",
    knowledge,
    "\nFollow-up guidance: End with one engaging, relevant question when appropriate."
  ].join("\n");
}
