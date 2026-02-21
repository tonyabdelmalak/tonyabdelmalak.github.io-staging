import type { Request, Response } from 'express';
import { db } from '../../db/client.js';
import { questions } from '../../db/schema.js';
import { eq, and } from 'drizzle-orm';

export default async function handler(req: Request, res: Response) {
  try {
    const { category, type, difficulty, industry, role } = req.query;

    // Build filter conditions
    const conditions = [];
    if (category && category !== 'all') {
      conditions.push(eq(questions.categoryId, parseInt(category as string)));
    }
    if (type) {
      conditions.push(eq(questions.type, type as string));
    }
    if (difficulty && difficulty !== 'all') {
      conditions.push(eq(questions.difficulty, difficulty as string));
    }
    if (industry) {
      conditions.push(eq(questions.industry, industry as string));
    }
    if (role) {
      conditions.push(eq(questions.role, role as string));
    }

    // Fetch questions with filters
    const result = conditions.length > 0
      ? await db.select().from(questions).where(and(...conditions))
      : await db.select().from(questions);

    res.json({
      questions: result.map(q => ({
        id: q.id,
        categoryId: q.categoryId,
        question: q.question,
        type: q.type,
        difficulty: q.difficulty,
        industry: q.industry,
        role: q.role,
        sampleAnswer: q.sampleAnswer,
        evaluationCriteria: q.evaluationCriteria,
        tags: q.tags,
      })),
      count: result.length,
    });
  } catch (error) {
    console.error('Failed to fetch questions:', error);
    res.status(500).json({ error: 'Failed to fetch questions', message: String(error) });
  }
}
