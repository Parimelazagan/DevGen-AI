import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import githubRoutes from './routes/github.js';
import resumeRoutes from './routes/resume.js';
import generateRoutes from './routes/generate.js';
import projectRoutes from './routes/projects.js';
import portfolioRoutes from './routes/portfolios.js';
import atsRoutes from './routes/ats.js';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';

const app = express();

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/github', githubRoutes);
app.use('/api/resume', resumeRoutes);
app.use('/api/generate', generateRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/portfolios', portfolioRoutes);
app.use('/api/ats', atsRoutes);
app.use('/api', notFoundHandler);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
