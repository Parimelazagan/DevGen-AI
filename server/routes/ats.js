import { Router } from 'express';
import { analyzeAtsRequest } from '../utils/atsAnalysis.js';

const router = Router();
router.post('/analyze', (req, res) => {
  const result = analyzeAtsRequest(req.body);
  if (!result.valid) return res.status(400).json({ error: result.error, code: 'INVALID_ATS_REQUEST' });
  return res.json(result.data);
});
export default router;
