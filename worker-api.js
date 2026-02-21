/**
 * Cloudflare Worker for Interview Intelligence API
 * Handles all /api/* routes
 */

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname;

    // CORS headers
    const corsHeaders = {
      'Access-Control-Allow-Origin': env.ALLOWED_ORIGINS || '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    };

    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    try {
      // Route handlers
      if (path === '/api/health') {
        return jsonResponse({ status: 'ok', timestamp: new Date().toISOString() }, corsHeaders);
      }

      // Chat endpoint
      if (path === '/api/chat' && request.method === 'POST') {
        return handleChat(request, env, corsHeaders);
      }

      // Questions endpoints
      if (path === '/api/questions' && request.method === 'GET') {
        return handleGetQuestions(request, env, corsHeaders);
      }

      if (path === '/api/questions/categories' && request.method === 'GET') {
        return handleGetCategories(env, corsHeaders);
      }

      if (path === '/api/questions/seed' && request.method === 'POST') {
        return handleSeedQuestions(env, corsHeaders);
      }

      // Sessions endpoint
      if (path === '/api/sessions' && request.method === 'POST') {
        return handleCreateSession(request, env, corsHeaders);
      }

      // Resumes endpoints
      if (path === '/api/resumes' && request.method === 'GET') {
        return handleGetResumes(env, corsHeaders);
      }

      if (path === '/api/resumes' && request.method === 'POST') {
        return handleCreateResume(request, env, corsHeaders);
      }

      if (path.startsWith('/api/resumes/') && request.method === 'PUT') {
        const id = path.split('/')[3];
        return handleUpdateResume(id, request, env, corsHeaders);
      }

      if (path.startsWith('/api/resumes/') && request.method === 'DELETE') {
        const id = path.split('/')[3];
        return handleDeleteResume(id, env, corsHeaders);
      }

      if (path === '/api/resumes/optimize' && request.method === 'POST') {
        return handleOptimizeResume(request, env, corsHeaders);
      }

      if (path === '/api/resumes/analyze-alignment' && request.method === 'POST') {
        return handleAnalyzeAlignment(request, env, corsHeaders);
      }

      return jsonResponse({ error: 'Not found' }, corsHeaders, 404);
    } catch (error) {
      console.error('Worker error:', error);
      return jsonResponse({ error: 'Internal server error', message: error.message }, corsHeaders, 500);
    }
  },
};

// Helper function for JSON responses
function jsonResponse(data, headers = {}, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  });
}

// Chat handler
async function handleChat(request, env, corsHeaders) {
  const body = await request.json();
  const { messages } = body;

  if (!env.GROQ_API_KEY) {
    return jsonResponse({ error: 'GROQ_API_KEY not configured' }, corsHeaders, 500);
  }

  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${env.GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'llama-3.1-70b-versatile',
      messages: messages,
      temperature: 0.7,
      max_tokens: 1000,
    }),
  });

  const data = await response.json();
  return jsonResponse({ response: data.choices[0].message.content }, corsHeaders);
}

// Questions handler
async function handleGetQuestions(request, env, corsHeaders) {
  // For MVP, return hardcoded questions
  // In production, query from D1 database
  const questions = [
    {
      id: 1,
      categoryId: 1,
      type: 'behavioral',
      difficulty: 'mid',
      industry: 'Technology',
      role: 'Software Engineer',
      question: 'Tell me about a time when you had to deal with a difficult team member.',
      sampleAnswer: 'Use STAR method: Situation, Task, Action, Result',
      evaluationCriteria: 'Communication, conflict resolution, teamwork',
    },
    {
      id: 2,
      categoryId: 1,
      type: 'behavioral',
      difficulty: 'mid',
      industry: 'Technology',
      role: 'Software Engineer',
      question: 'Describe a situation where you had to meet a tight deadline.',
      sampleAnswer: 'Focus on time management and prioritization',
      evaluationCriteria: 'Time management, prioritization, stress handling',
    },
    {
      id: 3,
      categoryId: 2,
      type: 'technical',
      difficulty: 'mid',
      industry: 'Technology',
      role: 'Software Engineer',
      question: 'Explain the difference between SQL and NoSQL databases.',
      sampleAnswer: 'SQL: relational, structured. NoSQL: flexible, scalable',
      evaluationCriteria: 'Technical knowledge, clarity of explanation',
    },
    {
      id: 4,
      categoryId: 3,
      type: 'situational',
      difficulty: 'mid',
      industry: 'Technology',
      role: 'Software Engineer',
      question: 'What would you do if you discovered a critical bug in production?',
      sampleAnswer: 'Assess impact, communicate, fix, prevent recurrence',
      evaluationCriteria: 'Problem-solving, communication, crisis management',
    },
    {
      id: 5,
      categoryId: 4,
      type: 'leadership',
      difficulty: 'senior',
      industry: 'Technology',
      role: 'Engineering Manager',
      question: 'How do you motivate underperforming team members?',
      sampleAnswer: 'Understand root cause, provide support, set clear goals',
      evaluationCriteria: 'Leadership, empathy, coaching skills',
    },
  ];

  return jsonResponse({ questions }, corsHeaders);
}

async function handleGetCategories(env, corsHeaders) {
  const categories = [
    { id: 1, name: 'Behavioral', description: 'Past behavior and experiences' },
    { id: 2, name: 'Technical', description: 'Technical knowledge and skills' },
    { id: 3, name: 'Situational', description: 'Hypothetical scenarios' },
    { id: 4, name: 'Leadership', description: 'Leadership and management' },
    { id: 5, name: 'Problem Solving', description: 'Analytical thinking' },
    { id: 6, name: 'Communication', description: 'Communication skills' },
  ];

  return jsonResponse({ categories }, corsHeaders);
}

async function handleSeedQuestions(env, corsHeaders) {
  return jsonResponse({ message: 'Seed data loaded (hardcoded for MVP)' }, corsHeaders);
}

// Sessions handler
async function handleCreateSession(request, env, corsHeaders) {
  const body = await request.json();
  // For MVP, just return success
  // In production, save to D1 database
  return jsonResponse({ sessionId: Date.now(), message: 'Session saved' }, corsHeaders, 201);
}

// Resumes handlers
async function handleGetResumes(env, corsHeaders) {
  // For MVP, return empty array
  // In production, query from D1 database
  return jsonResponse({ resumes: [] }, corsHeaders);
}

async function handleCreateResume(request, env, corsHeaders) {
  const body = await request.json();
  // For MVP, return mock ID
  return jsonResponse({ id: Date.now(), ...body }, corsHeaders, 201);
}

async function handleUpdateResume(id, request, env, corsHeaders) {
  const body = await request.json();
  return jsonResponse({ id, ...body }, corsHeaders);
}

async function handleDeleteResume(id, env, corsHeaders) {
  return jsonResponse({ message: 'Resume deleted' }, corsHeaders);
}

async function handleOptimizeResume(request, env, corsHeaders) {
  const body = await request.json();
  const { resume } = body;

  if (!env.GROQ_API_KEY) {
    return jsonResponse({ error: 'GROQ_API_KEY not configured' }, corsHeaders, 500);
  }

  const resumeContent = resume.sections
    .map((s) => `${s.sectionType}: ${s.title}\n${s.content}`)
    .join('\n\n');

  const prompt = `Optimize this resume for ${resume.targetRole} in ${resume.targetIndustry}:\n\n${resumeContent}\n\nProvide specific improvements in JSON format with optimizedSections array and score.`;

  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${env.GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'llama-3.1-70b-versatile',
      messages: [
        { role: 'system', content: 'You are an expert resume optimizer.' },
        { role: 'user', content: prompt },
      ],
      temperature: 0.7,
      max_tokens: 2000,
    }),
  });

  const data = await response.json();
  const aiResponse = data.choices[0].message.content;

  // Parse JSON from AI response
  try {
    const jsonMatch = aiResponse.match(/```json\s*([\s\S]*?)```/) || aiResponse.match(/```\s*([\s\S]*?)```/);
    const jsonStr = jsonMatch ? jsonMatch[1] : aiResponse;
    const result = JSON.parse(jsonStr.trim());
    return jsonResponse(result, corsHeaders);
  } catch (e) {
    return jsonResponse({ error: 'Failed to parse AI response' }, corsHeaders, 500);
  }
}

async function handleAnalyzeAlignment(request, env, corsHeaders) {
  const body = await request.json();
  const { resume, jobDescription } = body;

  if (!env.GROQ_API_KEY) {
    return jsonResponse({ error: 'GROQ_API_KEY not configured' }, corsHeaders, 500);
  }

  const resumeContent = resume.sections
    .map((s) => `${s.sectionType}: ${s.title}\n${s.content}`)
    .join('\n\n');

  const prompt = `Job Description:\n${jobDescription}\n\nResume:\n${resumeContent}\n\nAnalyze alignment and return JSON with: score, keywordMatch, skillsAlignment, experienceRelevance, strengths[], gaps[], recommendations[], summary.`;

  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${env.GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'llama-3.1-70b-versatile',
      messages: [
        { role: 'system', content: 'You are an expert resume-job alignment analyzer.' },
        { role: 'user', content: prompt },
      ],
      temperature: 0.7,
      max_tokens: 1500,
    }),
  });

  const data = await response.json();
  const aiResponse = data.choices[0].message.content;

  try {
    const jsonMatch = aiResponse.match(/```json\s*([\s\S]*?)```/) || aiResponse.match(/```\s*([\s\S]*?)```/);
    const jsonStr = jsonMatch ? jsonMatch[1] : aiResponse;
    const result = JSON.parse(jsonStr.trim());
    return jsonResponse(result, corsHeaders);
  } catch (e) {
    return jsonResponse({ error: 'Failed to parse AI response' }, corsHeaders, 500);
  }
}
