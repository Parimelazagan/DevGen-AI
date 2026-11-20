import { z } from 'zod';

const optionalText = z.string().trim().max(10_000).nullable().optional().transform((value) => value || null);
const requiredText = optionalText.transform((value) => value || '');
const textList = z.array(z.string().trim().min(1).max(300)).max(100).optional().default([]);

export const portfolioSchema = z.object({
  personalInfo: z.object({
    name: requiredText,
    title: requiredText,
    photo: optionalText,
    location: optionalText,
  }).optional().default({ name: '', title: '', photo: null, location: null }),
  about: optionalText,
  skills: textList,
  experience: z.array(z.object({
    role: requiredText,
    company: requiredText,
    duration: requiredText,
    description: requiredText,
  })).max(50).optional().default([]),
  education: z.array(z.object({
    degree: requiredText,
    institution: requiredText,
    duration: requiredText,
  })).max(30).optional().default([]),
  projects: z.array(z.object({
    title: requiredText,
    description: requiredText,
    tech: textList,
    link: optionalText,
  })).max(30).optional().default([]),
  certifications: z.array(z.object({
    name: requiredText,
    issuer: requiredText,
    date: requiredText,
  })).max(50).optional().default([]),
  achievements: textList,
  contact: z.object({
    email: optionalText,
    phone: optionalText,
  }).optional().default({ email: null, phone: null }),
}).strip();

/** Validates model output before it can be rendered by the client. */
export function validatePortfolioOutput(raw) {
  const result = portfolioSchema.safeParse(raw);

  if (!result.success) {
    return {
      valid: false,
      error: 'The AI returned data that does not match the portfolio schema.',
      details: result.error.issues.map((issue) => ({ path: issue.path.join('.'), message: issue.message })),
    };
  }

  return { valid: true, data: result.data };
}
