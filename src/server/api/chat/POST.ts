import type { Request, Response } from 'express';
import { getSecret } from '../../../lib/secrets.js';

interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

interface ChatRequest {
  messages: ChatMessage[];
  stream?: boolean;
}

export default async function handler(req: Request, res: Response) {
  try {
    const { messages, stream = false }: ChatRequest = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Messages array is required' });
    }

    const apiKey = getSecret('GROQ_API_KEY');
    if (!apiKey) {
      return res.status(500).json({ error: 'GROQ_API_KEY not configured' });
    }

    // System prompt for Interview Intelligence AI Coach
    const systemPrompt = {
      role: 'system',
      content: `You are an expert AI Interview Coach for Interview Intelligence™, a platform that helps candidates prepare for job interviews.

Your role:
- Provide personalized interview coaching and feedback
- Help users practice behavioral and technical interview questions
- Analyze communication patterns and suggest improvements
- Offer tips on body language, confidence, and stress management
- Guide users through STAR method (Situation, Task, Action, Result) responses
- Provide industry-specific interview preparation advice

Tone: Professional, encouraging, and supportive. Focus on actionable advice.

Capabilities you can reference:
- Live Interview Simulator for real-time practice
- AI-powered performance analysis and metrics
- Personalized coaching based on user's progress
- Practice exercises for communication, body language, and problem-solving
- Progress tracking and improvement insights

Always be helpful, specific, and motivating. If asked about features, explain how they work on the platform.`,
    };

    const fullMessages = [systemPrompt, ...messages];

    // Call Groq API
    const groqResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'llama-3.1-70b-versatile',
        messages: fullMessages,
        temperature: 0.7,
        max_tokens: 1024,
        stream,
      }),
    });

    if (!groqResponse.ok) {
      const error = await groqResponse.text();
      console.error('Groq API error:', error);
      return res.status(groqResponse.status).json({ error: 'AI service error' });
    }

    if (stream) {
      // Set up SSE headers for streaming
      res.setHeader('Content-Type', 'text/event-stream');
      res.setHeader('Cache-Control', 'no-cache');
      res.setHeader('Connection', 'keep-alive');

      // Pipe the stream from Groq to the client
      if (groqResponse.body) {
        const reader = groqResponse.body.getReader();
        const decoder = new TextDecoder();

        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            const chunk = decoder.decode(value, { stream: true });
            res.write(chunk);
          }
        } catch (error) {
          console.error('Streaming error:', error);
        } finally {
          res.end();
        }
      }
    } else {
      // Non-streaming response
      const data = await groqResponse.json();
      res.json(data);
    }
  } catch (error) {
    console.error('Chat API error:', error);
    res.status(500).json({ error: 'Internal server error', message: String(error) });
  }
}
