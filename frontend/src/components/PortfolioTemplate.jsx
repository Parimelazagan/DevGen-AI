const themes = {
  developer: { shell: 'bg-slate-950 text-slate-100', accent: 'text-cyan-300', card: 'bg-slate-900 border-slate-800', pill: 'bg-slate-800 text-cyan-100' },
  modern: { shell: 'bg-white text-slate-900', accent: 'text-indigo-600', card: 'bg-slate-50 border-slate-200', pill: 'bg-indigo-50 text-indigo-700' },
  executive: { shell: 'bg-stone-50 text-stone-900', accent: 'text-amber-700', card: 'bg-white border-stone-200', pill: 'bg-amber-50 text-amber-800' },
};

export default function PortfolioTemplate({ data, variant = 'modern', config = {} }) {
  if (!data) return null;
  const theme = themes[variant] || themes.modern;
  const accent = ({ blue: 'text-blue-600', violet: 'text-violet-600', emerald: 'text-emerald-600', amber: 'text-amber-700' })[config.palette] || theme.accent;
  const visible = config.sections || { about: true, skills: true, experience: true, projects: true, github: true, contact: true };
  const projects = config.reverseProjects ? [...(data.projects || [])].reverse() : (data.projects || []);
  const font = config.font === 'serif' ? 'font-serif' : config.font === 'mono' ? 'font-mono' : 'font-sans';
  const initials = (data.personalInfo?.name || 'P').split(' ').map((word) => word[0]).join('').slice(0, 2);
  return <article className={`${theme.shell} ${font} min-h-screen`}>
    <header className="max-w-6xl mx-auto px-6 py-14 md:py-20">
      <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
        {data.personalInfo?.photo ? <img src={data.personalInfo.photo} alt={data.personalInfo.name || 'Profile'} className="w-24 h-24 rounded-full object-cover" /> : <div className={`w-24 h-24 rounded-full flex items-center justify-center text-2xl font-bold ${theme.pill}`}>{initials}</div>}
        <div><p className={`uppercase tracking-[0.2em] text-xs font-semibold ${accent}`}>Portfolio</p><h1 className="text-4xl md:text-6xl font-bold mt-2">{data.personalInfo?.name || 'Your name'}</h1><p className="text-lg opacity-75 mt-2">{data.personalInfo?.title} {data.personalInfo?.location ? `· ${data.personalInfo.location}` : ''}</p></div>
      </div>
    </header>
    <main className="max-w-6xl mx-auto px-6 pb-16 grid gap-8">
      {visible.about && data.about && <section className={`${theme.card} border rounded-2xl p-6`}><h2 className={`font-bold text-xl mb-3 ${accent}`}>Profile</h2><p className="leading-7 opacity-85">{data.about}</p></section>}
      {visible.skills && data.skills?.length > 0 && <section><h2 className="font-bold text-2xl mb-4">Skills</h2><div className="flex flex-wrap gap-2">{data.skills.map((skill) => <span key={skill} className={`${theme.pill} px-3 py-1 rounded-full text-sm`}>{skill}</span>)}</div></section>}
      {visible.projects && projects.length > 0 && <section><h2 className="font-bold text-2xl mb-4">Selected projects</h2><div className="grid md:grid-cols-2 gap-4">{projects.map((project) => <article key={project.link || project.title} className={`${theme.card} border rounded-2xl p-5`}><div className="flex justify-between gap-3"><h3 className="font-bold text-lg">{project.title}</h3>{project.analysis?.projectScore && <span className={`${theme.pill} rounded-full h-fit px-2 py-1 text-xs`}>{project.analysis.projectScore}/100</span>}</div><p className="text-sm leading-6 opacity-75 mt-2">{project.analysis?.documentation?.solution || project.description}</p><div className="flex flex-wrap gap-2 mt-4">{project.tech?.map((tech) => <span key={tech} className={`${theme.pill} px-2 py-1 rounded text-xs`}>{tech}</span>)}</div>{project.link && <a className={`inline-block mt-4 text-sm font-semibold ${theme.accent}`} href={project.link} target="_blank" rel="noreferrer">View repository →</a>}</article>)}</div></section>}
      {visible.experience && data.experience?.length > 0 && <section><h2 className="font-bold text-2xl mb-4">Experience</h2><div className="space-y-4">{data.experience.map((item, index) => <article key={index} className={`${theme.card} border rounded-2xl p-5`}><h3 className="font-bold">{item.role}</h3><p className={`text-sm ${theme.accent}`}>{item.company} · {item.duration}</p><p className="text-sm leading-6 opacity-75 mt-2">{item.description}</p></article>)}</div></section>}
      {visible.github && data.githubStats && <section className={`${theme.card} border rounded-2xl p-6`}><h2 className="font-bold text-xl">GitHub credibility</h2><p className="opacity-75 mt-2">@{data.githubStats.username} · {data.githubStats.publicRepos} public repositories · {data.githubStats.followers} followers</p><p className={`text-sm mt-2 ${theme.accent}`}>{data.githubStats.topLanguages?.join(' · ')}</p></section>}
      {visible.contact && (data.contact?.email || data.socialLinks?.github) && <section className={`${theme.card} border rounded-2xl p-6`}><h2 className="font-bold text-xl">Let’s connect</h2><div className="flex flex-wrap gap-4 mt-3 text-sm">{data.contact?.email && <a className={theme.accent} href={`mailto:${data.contact.email}`}>{data.contact.email}</a>}{data.socialLinks?.github && <a className={theme.accent} href={data.socialLinks.github} target="_blank" rel="noreferrer">GitHub</a>}</div></section>}
    </main>
  </article>;
}
