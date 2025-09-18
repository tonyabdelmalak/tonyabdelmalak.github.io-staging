// --- in chat-widget/worker.js (inside fetch handler) ---
const url = new URL(req.url);
const wantStream = url.searchParams.get("stream") === "1";

// ...build llmMessages + temperature as you already do...

const groqBody = {
  model: env.GROQ_MODEL || "llama-3.1-70b-versatile",
  temperature,
  messages: llmMessages,
  stream: wantStream // <— toggle
};

const groqResp = await fetch(env.GROQ_URL || "https://api.groq.com/openai/v1/chat/completions", {
  method: "POST",
  headers: {
    "Authorization": `Bearer ${env.GROQ_API_KEY}`,
    "Content-Type": "application/json"
  },
  body: JSON.stringify(groqBody)
});

if (wantStream) {
  // pass Groq SSE straight through to the browser
  const headers = new Headers({
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    "Connection": "keep-alive",
    "Access-Control-Allow-Origin": (globalThis.__ALLOWED_ORIGINS || "*").split(",")[0] || "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "content-type, authorization"
  });
  return new Response(groqResp.body, { status: 200, headers });
}

// non-stream: return the completed answer as JSON
if (!groqResp.ok) {
  const errText = await groqResp.text();
  return cors(req, JSON.stringify({ error: `Groq API error ${groqResp.status}: ${errText}` }), 500);
}
const data = await groqResp.json();
const answer = data?.choices?.[0]?.message?.content ?? "I couldn’t generate a response.";
return cors(req, JSON.stringify({ role: "assistant", content: answer }));
