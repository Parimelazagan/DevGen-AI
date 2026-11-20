import { z } from 'zod';

const projectSchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string().max(4_000).nullable().optional(),
  tech: z.array(z.string().max(100)).max(30).optional().default([]),
  link: z.string().url().nullable().optional(),
  metadata: z.object({
    stars: z.number().int().nonnegative().optional().default(0),
    forks: z.number().int().nonnegative().optional().default(0),
    updatedAt: z.string().nullable().optional(),
    readmeLength: z.number().int().nonnegative().optional().default(0),
    hasTests: z.boolean().optional().default(false),
    hasCi: z.boolean().optional().default(false),
    hasDocker: z.boolean().optional().default(false),
    hasDeploymentConfig: z.boolean().optional().default(false),
  }).optional().default({}),
});

export const projectAnalysisRequestSchema = z.object({ projects: z.array(projectSchema).min(1).max(5) });

export function analyzeProject(project) {
  const { metadata, tech, description, title } = project;
  const signals = [metadata.readmeLength > 250, metadata.hasTests, metadata.hasCi, metadata.hasDocker, metadata.hasDeploymentConfig];
  const projectScore = Math.min(100, 35 + (Math.min(metadata.readmeLength, 1_000) / 1_000) * 25 + signals.slice(1).filter(Boolean).length * 10 + (tech.length ? 5 : 0) + (metadata.stars > 0 ? 5 : 0));
  const improvements = [];
  if (metadata.readmeLength < 250) improvements.push('Add a clear README with setup steps, features, and screenshots.');
  if (!metadata.hasTests) improvements.push('Add automated tests to demonstrate code reliability.');
  if (!metadata.hasCi) improvements.push('Add a CI workflow to run checks on every change.');
  if (!metadata.hasDocker) improvements.push('Add Docker support for reproducible local setup.');
  if (!metadata.hasDeploymentConfig) improvements.push('Add a deployment link or configuration so recruiters can try the project.');

  return {
    projectScore: Math.round(projectScore),
    qualitySignals: {
      readme: metadata.readmeLength >= 250,
      tests: metadata.hasTests,
      ci: metadata.hasCi,
      docker: metadata.hasDocker,
      deployment: metadata.hasDeploymentConfig,
    },
    documentation: {
      problem: description || `${title} is a software project presented through its GitHub repository.`,
      solution: `Built ${title}${tech.length ? ` using ${tech.join(', ')}` : ''}.`,
      technology: tech,
      keyFeatures: [
        ...(metadata.hasTests ? ['Automated tests'] : []),
        ...(metadata.hasCi ? ['Continuous integration'] : []),
        ...(metadata.hasDocker ? ['Containerized setup'] : []),
        ...(metadata.hasDeploymentConfig ? ['Deployment configuration'] : []),
      ],
      impact: metadata.stars > 0 ? `Received ${metadata.stars} GitHub star${metadata.stars === 1 ? '' : 's'}.` : 'Impact metrics can be added after measuring users, performance, or outcomes.',
    },
    improvementSuggestions: improvements,
  };
}
