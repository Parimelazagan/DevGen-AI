import { Router } from 'express';
import crypto from 'crypto';
import { z } from 'zod';

const router = Router();
const portfolios = new Map();
const publishSchema = z.object({ data: z.object({ personalInfo: z.object({ name: z.string().optional() }).optional() }).passthrough(), template: z.enum(['developer', 'modern', 'executive']), config: z.object({}).passthrough().optional().default({}) });

router.post('/', (req, res) => {
  const parsed = publishSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: 'Portfolio data or template is invalid.', code: 'INVALID_PORTFOLIO' });
  const slug = `${(parsed.data.data.personalInfo?.name || 'portfolio').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || 'portfolio'}-${crypto.randomBytes(3).toString('hex')}`;
  portfolios.set(slug, { ...parsed.data, createdAt: new Date().toISOString() });
  return res.status(201).json({ slug, createdAt: portfolios.get(slug).createdAt });
});

router.get('/:slug', (req, res) => {
  const portfolio = portfolios.get(req.params.slug);
  if (!portfolio) return res.status(404).json({ error: 'Portfolio not found or the server has restarted.', code: 'PORTFOLIO_NOT_FOUND' });
  return res.json(portfolio);
});

export default router;
