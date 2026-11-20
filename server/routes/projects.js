import { Router } from 'express';
import { analyzeProject, projectAnalysisRequestSchema } from '../utils/projectAnalysis.js';

const router = Router();

router.post('/analyze', (req, res) => {
  const parsed = projectAnalysisRequestSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: 'Select one to five valid GitHub projects.', code: 'INVALID_PROJECT_SELECTION' });
  }

  return res.json({
    projects: parsed.data.projects.map((project) => ({
      link: project.link,
      title: project.title,
      analysis: analyzeProject(project),
    })),
  });
});

export default router;
