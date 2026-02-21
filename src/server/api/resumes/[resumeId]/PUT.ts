import type { Request, Response } from 'express';
import { db } from '../../../db/client.js';
import { resumes, resumeSections } from '../../../db/schema.js';
import { eq } from 'drizzle-orm';

export default async function handler(req: Request, res: Response) {
  try {
    const { resumeId } = req.params;
    const { title, targetRole, targetIndustry, sections } = req.body;

    if (!resumeId) {
      return res.status(400).json({ error: 'Resume ID is required' });
    }

    const id = parseInt(resumeId);

    // Update resume
    await db
      .update(resumes)
      .set({
        title,
        targetRole: targetRole || null,
        targetIndustry: targetIndustry || null,
      })
      .where(eq(resumes.id, id));

    // Delete existing sections
    await db.delete(resumeSections).where(eq(resumeSections.resumeId, id));

    // Create new sections
    if (sections && sections.length > 0) {
      const sectionValues = sections.map((section: any, index: number) => ({
        resumeId: id,
        sectionType: section.sectionType,
        title: section.title || '',
        content: section.content,
        orderIndex: section.orderIndex ?? index,
      }));

      await db.insert(resumeSections).values(sectionValues);
    }

    // Fetch updated resume
    const updatedResume = await db.select().from(resumes).where(eq(resumes.id, id)).limit(1);
    const updatedSections = await db.select().from(resumeSections).where(eq(resumeSections.resumeId, id));

    res.json({
      resume: {
        id: updatedResume[0].id,
        title: updatedResume[0].title,
        targetRole: updatedResume[0].targetRole,
        targetIndustry: updatedResume[0].targetIndustry,
        sections: updatedSections.map((s) => ({
          id: s.id,
          sectionType: s.sectionType,
          title: s.title,
          content: s.content,
          orderIndex: s.orderIndex,
        })),
      },
    });
  } catch (error) {
    console.error('Failed to update resume:', error);
    res.status(500).json({ error: 'Failed to update resume', message: String(error) });
  }
}
