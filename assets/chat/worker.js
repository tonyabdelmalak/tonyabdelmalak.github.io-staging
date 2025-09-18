// Minimal Worker to build a system message from persona + knowledge,
// with an optional keyword-filter that selects only relevant knowledge snippets.
// Replace MODEL CALL section with your provider's API code.

export default {
  async fetch(req, env, ctx) {
    if (req.method === "OPTIONS") return cors(req, "");
    if (req.method !== "POST") return cors(req, JSON.stringify({ ok: true }));

    const { messages = [], user = "anonymous" } = await req.json().catch(() => ({ messages: [] }));
    const userMsg = lastUserMessage(messages) || "";

    try {
      const persona = await getPersona(env);
      const knowledgeDocs = await getKnowledgeDocs(env); // array of {title, text}
      const selected = await selectKnowledge(userMsg, knowledgeDocs, env);

      const systemMsg = buildSystemMessage(persona, selected);

      const llmMessages = [
        { role: "system", content: systemMsg },
        ...stripSystem(messages), // keep prior chat but avoid duplicate system msgs
        { role: "user", content: userMsg }
      ];

      // ---- MODEL CALL (replace with your LLM provider) ----
      // Example shape:
      // const resp = await fetch(env.LLM_URL, {
      //   method: "POST",
      //   headers: { "Authorization": `Bearer ${env.LLM_API_KEY}`, "Content-Type": "application/json" },
      //   body: JSON.stringify({ model: env.LLM_MODEL, messages: llmMessages, temperature: persona.voice?.style?.temperature ?? 0.3 })
      // });
      // const data = await resp.json();
      // const answer = data.choices?.[0]?.message?.content || "Sorry, I couldn't generate a response.";
      const answer = fallbackLocalAnswer(userMsg, selected); // temporary dev fallback
      // -----------------------------------------------------

      return cors(req, JSON.stringify({ role: "assistant", content: answer }));
    } catch (e) {
      return cors(req, JSON.stringify({ error: e.message }), 500);
    }
  }
};

// ---------- Helpers ----------

function cors(req, body, status = 200) {
  const origin = req.headers.get("Origin") || "";
  const allowed = (ALLOWED_ORIGINS(req) || "").split(",").map(s => s.trim()).filter(Boolean);
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "content-type, authorization",
    "Access-Control-Allow-Origin": allowed.includes(origin) ? origin : (allowed[0] || "*")
  };
  return new Response(body, { status, headers });
}

function ALLOWED_ORIGINS(req) {
  // env is not directly accessible here; supply via global var at top of fetch.
  // Use a closure trick: read from request.cf or a header if needed.
  // Simpler: allow both staging/prod via wrangler vars injected at build time.
  return (globalThis.__ALLOWED_ORIGINS || "");
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
  // stash allowed origins globally for CORS convenience
  globalThis.__ALLOWED_ORIGINS = env.ALLOWED_ORIGINS || "";
  return data;
}

async function getKnowledgeDocs(env) {
  // Supports either a single URL or comma-separated list of URLs.
  // If using one consolidated file, set KNOWLEDGE_URL to that file only.
  const urls = String(env.KNOWLEDGE_URL || "").split(",").map(s => s.trim()).filter(Boolean);
  if (!urls.length) throw new Error("Missing KNOWLEDGE_URL");
  const docs = [];
  for (const u of urls) {
    const text = await fetchText(u);
    docs.push({ title: titleFromURL(u), text });
  }
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

// Keyword filter (very lightweight):
// - If USE_KEYWORD_FILTER=false: return the entire consolidated knowledge file.
// - If true: pick sections whose headings or first lines match user keywords (company/topics).
async function selectKnowledge(userMsg, docs, env) {
  const useFilter = String(env.USE_KEYWORD_FILTER || "false").toLowerCase() === "true";
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
  // Fallback: if nothing matched, include the whole doc to avoid empty context.
  if (!chosen.length) return docs;
  return chosen;
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
         ["quibi","flowserve","sony","roadr","hbo","nbcuniversal","recruit","attrition","workday","tableau","dashboard","forecast"].some(k => hay.includes(k));
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
    "\nFollow-up guidance: End with an engaging, relevant question when appropriate."
  ].join("\n");
}

// Dev-only fallback if you haven’t wired a model yet.
function fallbackLocalAnswer(userMsg, selected) {
  const hint = selected?.[0]?.title || "about-tony.md";
  return `I can help with that. Which part interests you most—projects, dashboards, or my pivot? (Pulled context from ${hint}).`;
}
