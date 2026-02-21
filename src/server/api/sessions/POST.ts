import type { Request, Response } from 'express';
import { db } from '../../db/client.js';
import { practiceSessions, feedback } from '../../db/schema.js';
import { eq } from 'drizzle-orm';

export default async function handler(req: Request, res: Response) {
  try {
    const { userId, duration, overallScore, questions } = req.body;

    if (!userId || !questions || questions.length === 0) {
      return res.status(400).json({ error: 'User ID and questions are required' });
    }

    // Create practice session
    const sessionResult = await db.insert(practiceSessions).values({
      userId,
      scenarioId: null,
      duration,
      overallScore: overallScore?.toString() || null,
      confidenceScore: null,
      clarityScore: null,
      relevanceScore: null,
      aiFeedback: null,
    });

    const sessionId = Number(sessionResult[0].insertId);

    // Create feedback entries for each question
    if (questions.length > 0) {
      const feedbackValues = questions.map((q: any) => ({
        sessionId,
        questionId: q.questionId,
        responseText: q.answer,
        responseDuration: q.duration,
        aiScore: null,
        aiFeedback: q.feedback || null,
        strengths: null,
        improvements: null,
      }));

      await db.insert(feedback).values(feedbackValues);
    }

    // Mark session as completed
    await db
      .update(practiceSessions)
      .set({ completedAt: new Date() })
      .where(eq(practiceSessions.id, sessionId));

    res.status(201).json({
      sessionId,
      message: 'Session saved successfully',
    });
  } catch (error) {
    console.error('Failed to save session:', error);
    res.status(500).json({ error: 'Failed to save session', message: String(error) });
  }
}
