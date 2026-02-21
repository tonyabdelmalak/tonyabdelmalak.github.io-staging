import type { Request, Response } from 'express';
import { getSecret } from '#airo/secrets';

export default async function handler(req: Request, res: Response) {
  try {
    const { resume, targetRole, targetIndustry } = req.body;

    if (!resume || !targetRole) {
      return res.status(400).json({ error: 'Resume and target role are required' });
    }

    const apiKey = getSecret('GROQ_API_KEY');
    if (!apiKey) {
      return res.status(500).json({ error: 'GROQ_API_KEY not configured' });
    }

    // Build resume content for AI analysis
    const resumeContent = resume.sections
      .map((s: any) => `${s.sectionType.toUpperCase()}: ${s.title}\n${s.content}`)
      .join('\n\n');

    const systemPrompt = `You are an expert resume optimization AI. Analyze the resume and optimize it for the target role.

Provide:
1. Optimized versions of each section with stronger action verbs, quantified achievements, and role-specific keywords
2. An optimization score (0-100) based on:
   - Keyword alignment with target role
   - Quantified achievements
   - Action verb strength
   - ATS compatibility
   - Clarity and impact

Return JSON format:
{
  "score": 85,
  "optimizedSections": [
    {
      "sectionType": "summary",
      "title": "Professional Summary",
      "content": "optimized content...",
      "improvements": "Added quantified achievements and role-specific keywords"
    }
  ],
  "overallFeedback": "Summary of key improvements made"
}`;

    const userPrompt = `Target Role: ${targetRole}
Target Industry: ${targetIndustry || 'General'}

Current Resume:
${resumeContent}

Optimize this resume for the target role. Maintain the same section structure but improve content.`;

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'llama-3.1-70b-versatile',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt },
        ],
        temperature: 0.7,
        max_tokens: 2000,
      }),
    });

    if (!response.ok) {
      throw new Error(`Groq API error: ${response.statusText}`);
    }

    const data = await response.json();
    const aiResponse = data.choices[0].message.content;

    // Parse JSON response
    let optimizationResult;
    try {
      // Extract JSON from markdown code blocks if present
      const jsonMatch = aiResponse.match(/```json\s*([\s\S]*?)```/) || aiResponse.match(/```\s*([\s\S]*?)```/);
      const jsonStr = jsonMatch ? jsonMatch[1] : aiResponse;
      optimizationResult = JSON.parse(jsonStr.trim());
    } catch (parseError) {
      console.error('Failed to parse AI response:', aiResponse);
      return res.status(500).json({ error: 'Failed to parse AI response' });
    }

    res.json({
      score: optimizationResult.score,
      optimizedSections: optimizationResult.optimizedSections.map((s: any, index: number) => ({
        sectionType: s.sectionType,
        title: s.title,
        content: s.content,
        orderIndex: index,
      })),
      feedback: optimizationResult.overallFeedback,
    });
  } catch (error) {
    console.error('Failed to optimize resume:', error);
    res.status(500).json({ error: 'Failed to optimize resume', message: String(error) });
  }
}
