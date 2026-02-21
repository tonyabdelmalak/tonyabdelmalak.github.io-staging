import type { Request, Response } from 'express';
import { db } from '../../../db/client.js';
import { questionCategories } from '../../../db/schema.js';

export default async function handler(req: Request, res: Response) {
  try {
    const categories = await db.select().from(questionCategories);

    res.json({
      categories: categories.map(c => ({
        id: c.id,
        name: c.name,
        description: c.description,
        icon: c.icon,
      })),
      count: categories.length,
    });
  } catch (error) {
    console.error('Failed to fetch categories:', error);
    res.status(500).json({ error: 'Failed to fetch categories', message: String(error) });
  }
}
