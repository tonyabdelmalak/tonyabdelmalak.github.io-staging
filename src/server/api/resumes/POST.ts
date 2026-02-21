import type { Request, Response } from 'express';
import { db } from '../../db/client.js';
import { resumes, resumeSections } from '../../db/schema.js';
import { eq } from 'drizzle-orm';

export default async function handler(req: Request, res: Response) {
  try {
    const { title, targetRole, targetIndustry, sections } = req.body;

    if (!title) {
      return res.status(400).json({ error: 'Title is required' });
    }

    // For MVP, use default userId
    const userId = 1;

    // Create resume
    const result = await db.insert(resumes).values({
      userId,
      title,
      targetRole: targetRole || null,
      targetIndustry: targetIndustry || null,
      isPrimary: false,
    });

    const resumeId = Number(result[0].insertId);

    // Create sections if provided
    if (sections && sections.length > 0) {
      const sectionValues = sections.map((section: any, index: number) => ({
        resumeId,
        sectionType: section.sectionType,
        title: section.title || '',
        content: section.content,
        orderIndex: section.orderIndex ?? index,
      }));

      await db.insert(resumeSections).values(sectionValues);
    }

    // Fetch the created resume with sections
    const newResume = await db.select().from(resumes).where(eq(resumes.id, resumeId)).limit(1);
    const newSections = await db.select().from(resumeSections).where(eq(resumeSections.resumeId, resumeId));

    res.status(201).json({
      resume: {
        id: newResume[0].id,
        title: newResume[0].title,
        targetRole: newResume[0].targetRole,
        targetIndustry: newResume[0].targetIndustry,
        sections: newSections.map((s) => ({
          id: s.id,
          sectionType: s.sectionType,
          title: s.title,
          content: s.content,
          orderIndex: s.orderIndex,
        })),
      },
    });
  } catch (error) {
    console.error('Failed to create resume:', error);
    res.status(500).json({ error: 'Failed to create resume', message: String(error) });
  }
}
