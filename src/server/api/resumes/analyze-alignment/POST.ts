import type { Request, Response } from 'express';
import { getSecret } from '../../../../lib/secrets.js';

export default async function handler(req: Request, res: Response) {
  try {
    const { resume, jobDescription } = req.body;

    if (!resume || !jobDescription) {
      return res.status(400).json({ error: 'Resume and job description are required' });
    }

    const apiKey = getSecret('GROQ_API_KEY');
    if (!apiKey) {
      return res.status(500).json({ error: 'GROQ_API_KEY not configured' });
    }

    // Build resume content
    const resumeContent = resume.sections
      .map((s: any) => `${s.sectionType.toUpperCase()}: ${s.title}\n${s.content}`)
      .join('\n\n');

    const systemPrompt = `You are an expert resume-job alignment analyzer. Compare the resume against the job description and provide detailed analysis.

Analyze:
1. Keyword match percentage
2. Skills alignment
3. Experience relevance
4. Missing qualifications
5. Strengths that match the role
6. Recommendations for improvement

Return JSON format:
{
  "score": 75,
  "keywordMatch": 68,
  "skillsAlignment": 80,
  "experienceRelevance": 75,
  "strengths": ["5+ years Python experience", "Led team of 8 engineers"],
  "gaps": ["No AWS certification mentioned", "Limited cloud architecture experience"],
  "recommendations": ["Add AWS certifications if you have them", "Emphasize cloud projects"],
  "summary": "Strong match overall with some areas for improvement"
}`;

    const userPrompt = `Job Description:
${jobDescription}

Resume:
${resumeContent}

Analyze how well this resume aligns with the job description.`;

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
        max_tokens: 1500,
      }),
    });

    if (!response.ok) {
      throw new Error(`Groq API error: ${response.statusText}`);
    }

    const data = await response.json();
    const aiResponse = data.choices[0].message.content;

    // Parse JSON response
    let analysisResult;
    try {
      const jsonMatch = aiResponse.match(/```json\s*([\s\S]*?)```/) || aiResponse.match(/```\s*([\s\S]*?)```/);
      const jsonStr = jsonMatch ? jsonMatch[1] : aiResponse;
      analysisResult = JSON.parse(jsonStr.trim());
    } catch (parseError) {
      console.error('Failed to parse AI response:', aiResponse);
      return res.status(500).json({ error: 'Failed to parse AI response' });
    }

    res.json(analysisResult);
  } catch (error) {
    console.error('Failed to analyze alignment:', error);
    res.status(500).json({ error: 'Failed to analyze alignment', message: String(error) });
  }
}
