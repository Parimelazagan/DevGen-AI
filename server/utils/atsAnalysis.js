import { z } from 'zod';

const stopWords = new Set('a an and are as at be by for from in is it of on or that the this to with you your our we will role job work working years year ability required preferred'.split(' '));
const requestSchema = z.object({
  jobDescription: z.string().trim().min(50).max(20_000),
  portfolio: z.object({
    personalInfo: z.object({ title: z.string().optional().default('') }).optional().default({}),
    about: z.string().nullable().optional().default(''),
    skills: z.array(z.string()).optional().default([]),
    experience: z.array(z.object({ role: z.string().optional().default(''), description: z.string().optional().default('') })).optional().default([]),
    projects: z.array(z.object({ title: z.string().optional().default(''), description: z.string().optional().default(''), tech: z.array(z.string()).optional().default([]) })).optional().default([]),
  }).passthrough(),
});

const extractKeywords = (text) => [...new Set((text.toLowerCase().match(/[a-z][a-z0-9+#.]{1,}/g) || []).filter((word) => !stopWords.has(word)))].slice(0, 60);

export function analyzeAtsRequest(input) {
  const parsed = requestSchema.safeParse(input);
  if (!parsed.success) return { valid: false, error: 'Paste a job description of at least 50 characters and provide a portfolio.', details: parsed.error.issues };
  const { jobDescription, portfolio } = parsed.data;
  const keywords = extractKeywords(jobDescription);
  const evidence = [portfolio.personalInfo.title, portfolio.about, ...portfolio.skills, ...portfolio.experience.flatMap((item) => [item.role, item.description]), ...portfolio.projects.flatMap((item) => [item.title, item.description, ...item.tech])].join(' ').toLowerCase();
  const matchedKeywords = keywords.filter((keyword) => evidence.includes(keyword));
  const missingKeywords = keywords.filter((keyword) => !evidence.includes(keyword)).slice(0, 12);
  const keywordScore = keywords.length ? Math.round((matchedKeywords.length / keywords.length) * 100) : 0;
  const evidenceScore = [portfolio.skills.length > 0, portfolio.experience.length > 0, portfolio.projects.length > 0, Boolean(portfolio.about)].filter(Boolean).length * 25;
  const atsScore = Math.round(keywordScore * 0.7 + evidenceScore * 0.3);
  const actions = [];
  if (!portfolio.personalInfo.title) actions.push({ priority: 'high', title: 'Add a targeted headline', reason: 'The portfolio has no professional headline.', action: 'Use a truthful role title that matches your demonstrated skills.' });
  if (missingKeywords.length) actions.push({ priority: 'high', title: 'Address missing job keywords', reason: `${missingKeywords.slice(0, 5).join(', ')} are mentioned in the job description but not found in your portfolio.`, action: 'Add only keywords supported by your existing skills, projects, or experience.' });
  if (!portfolio.projects.length) actions.push({ priority: 'medium', title: 'Add relevant project evidence', reason: 'Projects help recruiters verify technical claims.', action: 'Feature a project that demonstrates a matching skill.' });
  if (!portfolio.experience.some((item) => item.description)) actions.push({ priority: 'medium', title: 'Strengthen experience bullets', reason: 'Experience descriptions are missing or too limited.', action: 'Describe your real responsibilities, tools used, and measurable outcomes.' });
  return { valid: true, data: {
    atsScore, keywordScore, matchedKeywords, missingKeywords,
    scoreReasons: [`${matchedKeywords.length} of ${keywords.length} job keywords appear in your portfolio.`, `${evidenceScore}% of core evidence sections are complete.`],
    actions,
    improvements: {
      headline: { before: portfolio.personalInfo.title || 'No headline provided', after: `Keep your existing title and emphasize demonstrated matches such as ${matchedKeywords.slice(0, 3).join(', ') || 'your strongest relevant skills'}.` },
      summary: { before: portfolio.about || 'No summary provided', after: `Lead with your real experience and connect it to matching evidence: ${matchedKeywords.slice(0, 5).join(', ') || 'relevant skills and projects'}.` },
      experience: { before: portfolio.experience[0]?.description || 'No experience bullet provided', after: 'Rewrite one real experience bullet using: action + tool/skill + measurable outcome. Do not add claims you cannot support.' },
    },
  } };
}
