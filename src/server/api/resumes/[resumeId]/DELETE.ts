import type { Request, Response } from 'express';
import { db } from '../../../db/client.js';
import { resumes, resumeSections } from '../../../db/schema.js';
import { eq } from 'drizzle-orm';

export default async function handler(req: Request, res: Response) {
  try {
    const { resumeId } = req.params;

    if (!resumeId) {
      return res.status(400).json({ error: 'Resume ID is required' });
    }

    const id = parseInt(resumeId);

    // Delete sections first (foreign key constraint)
    await db.delete(resumeSections).where(eq(resumeSections.resumeId, id));

    // Delete resume
    await db.delete(resumes).where(eq(resumes.id, id));

    res.json({ message: 'Resume deleted successfully' });
  } catch (error) {
    console.error('Failed to delete resume:', error);
    res.status(500).json({ error: 'Failed to delete resume', message: String(error) });
  }
}
