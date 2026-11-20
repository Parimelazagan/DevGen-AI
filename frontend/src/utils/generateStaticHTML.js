export function generateStaticHTML(data) {
  if (!data) return '';

  const {
    personalInfo = {},
    about,
    skills = [],
    experience = [],
    education = [],
    projects = [],
    githubStats,
    socialLinks,
    certifications = [],
    achievements = [],
    contact,
  } = data;

  const hasSocial =
    socialLinks &&
    (socialLinks.github || socialLinks.linkedin || socialLinks.twitter || socialLinks.website);

  const hasContact = contact && (contact.email || contact.phone);

  const personalInfoHTML = `
    <div class="header-section">
      ${
        personalInfo.photo
          ? `<img src="${personalInfo.photo}" alt="${personalInfo.name || 'Profile'}" class="profile-photo" />`
          : ''
      }
      <h1 class="name">${personalInfo.name || ''}</h1>
      ${personalInfo.title ? `<p class="title">${personalInfo.title}</p>` : ''}
      ${personalInfo.location ? `<p class="location">${personalInfo.location}</p>` : ''}
    </div>
  `;

  const aboutHTML = about
    ? `
    <section class="section">
      <h2 class="section-heading">About</h2>
      <p class="text-content">${about}</p>
    </section>
  `
    : '';

  const skillsHTML =
    skills && skills.length > 0
      ? `
    <section class="section">
      <h2 class="section-heading">Skills</h2>
      <div class="skills-container">
        ${skills.map((skill) => `<span class="pill">${skill}</span>`).join('')}
      </div>
    </section>
  `
      : '';

  const experienceHTML =
    experience && experience.length > 0
      ? `
    <section class="section">
      <h2 class="section-heading">Experience</h2>
      ${experience
        .map(
          (exp) => `
        <div class="item-entry">
          <h3 class="entry-title">${exp.role || ''}</h3>
          <p class="sub-text">${exp.company || ''}${exp.duration ? ` • ${exp.duration}` : ''}</p>
          ${exp.description ? `<p class="entry-desc">${exp.description}</p>` : ''}
        </div>
      `
        )
        .join('')}
    </section>
  `
      : '';

  const educationHTML =
    education && education.length > 0
      ? `
    <section class="section">
      <h2 class="section-heading">Education</h2>
      ${education
        .map(
          (edu) => `
        <div class="item-entry">
          <h3 class="entry-title">${edu.degree || ''}</h3>
          <p class="sub-text">${edu.institution || ''}${edu.duration ? ` • ${edu.duration}` : ''}</p>
        </div>
      `
        )
        .join('')}
    </section>
  `
      : '';

  const projectsHTML =
    projects && projects.length > 0
      ? `
    <section class="section">
      <h2 class="section-heading">Projects</h2>
      ${projects
        .map(
          (proj) => `
        <div class="card">
          <h3 class="card-title">${proj.title || ''}</h3>
          ${proj.description ? `<p class="card-desc">${proj.description}</p>` : ''}
          ${
            proj.tech && proj.tech.length > 0
              ? `<div class="skills-container" style="margin-top: 8px; margin-bottom: 8px;">
                  ${proj.tech.map((t) => `<span class="pill">${t}</span>`).join('')}
                </div>`
              : ''
          }
          ${
            proj.link
              ? `<a href="${proj.link}" target="_blank" rel="noopener noreferrer" class="link">View Project</a>`
              : ''
          }
        </div>
      `
        )
        .join('')}
    </section>
  `
      : '';

  const githubStatsHTML = githubStats
    ? `
    <section class="section">
      <h2 class="section-heading">GitHub Stats</h2>
      <div class="card">
        <p style="font-weight: 500; font-size: 0.875rem;">@${githubStats.username || ''}</p>
        <div style="display: flex; gap: 16px; margin: 8px 0; font-size: 0.875rem; color: #4b5563;">
          ${githubStats.publicRepos !== undefined ? `<span>Public Repos: ${githubStats.publicRepos}</span>` : ''}
          ${githubStats.followers !== undefined ? `<span>Followers: ${githubStats.followers}</span>` : ''}
        </div>
        ${
          githubStats.topLanguages && githubStats.topLanguages.length > 0
            ? `<div class="skills-container">
                ${githubStats.topLanguages.map((lang) => `<span class="pill">${lang}</span>`).join('')}
              </div>`
            : ''
        }
      </div>
    </section>
  `
    : '';

  const certificationsHTML =
    certifications && certifications.length > 0
      ? `
    <section class="section">
      <h2 class="section-heading">Certifications</h2>
      ${certifications
        .map(
          (cert) => `
        <div class="item-entry" style="margin-bottom: 12px;">
          <h3 class="entry-title">${cert.name || ''}</h3>
          <p class="sub-text">${cert.issuer || ''}${cert.date ? ` • ${cert.date}` : ''}</p>
        </div>
      `
        )
        .join('')}
    </section>
  `
      : '';

  const achievementsHTML =
    achievements && achievements.length > 0
      ? `
    <section class="section">
      <h2 class="section-heading">Achievements</h2>
      <ul class="achievements-list">
        ${achievements.map((item) => `<li>${item}</li>`).join('')}
      </ul>
    </section>
  `
      : '';

  const socialLinksHTML = hasSocial
    ? `
    <section class="section">
      <h2 class="section-heading">Social Links</h2>
      <div class="social-links">
        ${socialLinks.github ? `<a href="${socialLinks.github}" target="_blank" rel="noopener noreferrer" class="link">GitHub</a>` : ''}
        ${socialLinks.linkedin ? `<a href="${socialLinks.linkedin}" target="_blank" rel="noopener noreferrer" class="link">LinkedIn</a>` : ''}
        ${socialLinks.twitter ? `<a href="${socialLinks.twitter}" target="_blank" rel="noopener noreferrer" class="link">Twitter</a>` : ''}
        ${socialLinks.website ? `<a href="${socialLinks.website}" target="_blank" rel="noopener noreferrer" class="link">Website</a>` : ''}
      </div>
    </section>
  `
    : '';

  const contactHTML = hasContact
    ? `
    <section class="section">
      <h2 class="section-heading">Contact</h2>
      <div class="sub-text" style="color: #374151;">
        ${contact.email ? `<p>Email: ${contact.email}</p>` : ''}
        ${contact.phone ? `<p>Phone: ${contact.phone}</p>` : ''}
      </div>
    </section>
  `
    : '';

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${personalInfo.name || 'Portfolio'}</title>
  <style>
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      color: #111827;
      background-color: #ffffff;
      line-height: 1.6;
      padding: 40px 16px;
    }
    .container {
      max-width: 672px;
      margin: 0 auto;
    }
    .header-section {
      margin-bottom: 24px;
    }
    .profile-photo {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      object-fit: cover;
      margin-bottom: 16px;
    }
    .name {
      font-size: 1.875rem;
      font-weight: 700;
      line-height: 1.25;
    }
    .title {
      font-size: 1.125rem;
      color: #6b7280;
      margin-bottom: 4px;
    }
    .location {
      font-size: 0.875rem;
      color: #9ca3af;
    }
    .section {
      margin-bottom: 24px;
    }
    .section-heading {
      font-size: 1.25rem;
      font-weight: 600;
      margin-top: 32px;
      margin-bottom: 12px;
      border-bottom: 1px solid #e5e7eb;
      padding-bottom: 4px;
    }
    .text-content {
      color: #374151;
      line-height: 1.625;
    }
    .skills-container {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }
    .pill {
      display: inline-block;
      background-color: #f3f4f6;
      color: #374151;
      font-size: 0.875rem;
      padding: 4px 12px;
      border-radius: 9999px;
    }
    .card {
      border: 1px solid #e5e7eb;
      border-radius: 8px;
      padding: 16px;
      margin-bottom: 16px;
    }
    .card-title {
      font-size: 1.125rem;
      font-weight: 600;
    }
    .card-desc {
      font-size: 0.875rem;
      color: #4b5563;
      margin: 8px 0;
    }
    .item-entry {
      margin-bottom: 16px;
    }
    .entry-title {
      font-size: 1rem;
      font-weight: 600;
    }
    .entry-desc {
      font-size: 0.875rem;
      color: #4b5563;
      margin-top: 4px;
    }
    .sub-text {
      font-size: 0.875rem;
      color: #6b7280;
    }
    .link {
      color: #2563eb;
      text-decoration: none;
      font-size: 0.875rem;
    }
    .link:hover {
      text-decoration: underline;
    }
    .social-links {
      display: flex;
      flex-wrap: wrap;
      gap: 16px;
    }
    .achievements-list {
      padding-left: 20px;
      font-size: 0.875rem;
      color: #374151;
    }
    .achievements-list li {
      margin-bottom: 4px;
    }
  </style>
</head>
<body>
  <div class="container">
    ${personalInfoHTML}
    ${aboutHTML}
    ${skillsHTML}
    ${experienceHTML}
    ${educationHTML}
    ${projectsHTML}
    ${githubStatsHTML}
    ${certificationsHTML}
    ${achievementsHTML}
    ${socialLinksHTML}
    ${contactHTML}
  </div>
</body>
</html>`;
}
