import type { Request, Response } from 'express';
import { db } from '../../db/client.js';
import { resumes, resumeSections } from '../../db/schema.js';
import { eq } from 'drizzle-orm';

export default async function handler(req: Request, res: Response) {
  try {
    const { userId } = req.query;

    // For MVP, we'll use a default userId since we don't have auth yet
    const defaultUserId = 1;
    const targetUserId = userId ? parseInt(userId as string) : defaultUserId;

    // Fetch all resumes for the user
    const userResumes = await db.select().from(resumes).where(eq(resumes.userId, targetUserId));

    // Fetch sections for each resume
    const resumesWithSections = await Promise.all(
      userResumes.map(async (resume) => {
        const sections = await db
          .select()
          .from(resumeSections)
          .where(eq(resumeSections.resumeId, resume.id));

        return {
          id: resume.id,
          title: resume.title,
          targetRole: resume.targetRole,
          targetIndustry: resume.targetIndustry,
          isPrimary: resume.isPrimary,
          aiOptimizationScore: resume.aiOptimizationScore ? parseFloat(resume.aiOptimizationScore) : null,
          sections: sections.map((s) => ({
            id: s.id,
            sectionType: s.sectionType,
            title: s.title,
            content: s.content,
            orderIndex: s.orderIndex,
          })),
        };
      })
    );

    res.json({
      resumes: resumesWithSections,
      count: resumesWithSections.length,
    });
  } catch (error) {
    console.error('Failed to fetch resumes:', error);
    res.status(500).json({ error: 'Failed to fetch resumes', message: String(error) });
  }
}
