export const fullMockData = {
  personalInfo: {
    name: "Alex Morgan",
    title: "Senior Full Stack Engineer",
    photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    location: "San Francisco, CA",
  },
  about: "Passionate software engineer with 5+ years of experience building scalable web applications and cloud architectures.",
  skills: ["React", "JavaScript", "Node.js", "Tailwind CSS", "TypeScript", "Python", "PostgreSQL", "Docker"],
  experience: [
    {
      role: "Senior Software Engineer",
      company: "TechCorp Labs",
      duration: "2022 - Present",
      description: "Led frontend architecture refactoring, reducing page load times by 40% across core products.",
    },
    {
      role: "Full Stack Developer",
      company: "Innovate Inc",
      duration: "2020 - 2022",
      description: "Developed microservices and responsive web dashboards for enterprise customers.",
    },
  ],
  education: [
    {
      degree: "B.S. in Computer Science",
      institution: "University of California, Berkeley",
      duration: "2016 - 2020",
    },
  ],
  projects: [
    {
      id: 1,
      title: "DevFlow - Developer Productivity Platform",
      description: "A comprehensive developer platform for automating CI/CD workflows and monitoring pipeline performance.",
      tech: ["React", "Node.js", "Tailwind CSS", "PostgreSQL"],
      link: "https://github.com/alexmorgan/devflow",
    },
    {
      id: 2,
      title: "CloudScale - Infrastructure Monitoring Dashboard",
      description: "Real-time metrics visualizer for Kubernetes clusters and microservices health.",
      tech: ["TypeScript", "React", "Go", "Docker"],
      link: "https://github.com/alexmorgan/cloudscale",
    },
  ],
  githubStats: {
    username: "alexmorgan",
    publicRepos: 42,
    followers: 1250,
    topLanguages: ["JavaScript", "TypeScript", "Python"],
  },
  socialLinks: {
    github: "https://github.com/alexmorgan",
    linkedin: "https://linkedin.com/in/alexmorgan",
    twitter: "https://twitter.com/alexmorgan",
    website: "https://alexmorgan.dev",
  },
  certifications: [
    {
      name: "AWS Certified Solutions Architect",
      issuer: "Amazon Web Services",
      date: "2023",
    },
  ],
  achievements: [
    "Published top-performing open source React library with 1,000+ GitHub stars.",
    "Speaker at React Global Summit 2024.",
  ],
  contact: {
    email: "alex.morgan@example.com",
    phone: "+1 (555) 019-2834",
  },
};

export const partialMockData = {
  personalInfo: {
    name: "Alex Morgan",
    title: "Junior Developer",
    photo: null,
    location: null,
  },
  about: "Enthusiastic beginner developer learning web development.",
  skills: ["HTML", "CSS", "JavaScript", "React"],
  experience: [],
  education: [
    {
      degree: "B.S. in Software Engineering",
      institution: "State University",
      duration: "2021 - 2025",
    },
  ],
  projects: [
    {
      title: "Personal Weather App",
      description: "Simple app using Fetch API and OpenWeatherMap.",
      tech: ["JavaScript", "CSS"],
      link: null,
    },
  ],
  githubStats: null,
  socialLinks: {
    github: "https://github.com/alexmorgan",
    linkedin: null,
    twitter: null,
    website: null,
  },
  certifications: [],
  achievements: [],
  contact: {
    email: "alex@example.com",
    phone: null,
  },
};

export default fullMockData;
