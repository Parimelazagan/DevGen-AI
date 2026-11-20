# DevGen-AI 🚀
### AI-Powered Developer Portfolio & Case Study Generator

DevGen-AI is a full-stack, enterprise-grade developer portfolio generator that transforms your GitHub repositories and resume into tailored, high-converting developer portfolios and deep-dive technical case studies with the power of AI.

---

## ✨ Features

- 🐙 **GitHub Integration**: Connect and fetch repository details, tech stacks, languages, star counts, and commit metadata automatically.
- 📄 **Resume Parser & ATS Analysis**: Upload PDF resumes to extract skills, experience, and score ATS optimization for developer roles.
- 🤖 **AI-Driven Portfolio Synthesis**: Utilizes Groq LLM to intelligently generate compelling developer bios, project highlights, and technical case studies.
- 🎨 **Multiple Portfolio Templates**: Select from sleek, responsive templates tailored for modern software engineers, frontend specialists, backend architects, and full-stack devs.
- ⚡ **Live Interactive Preview**: Customize theme colors, typography, layout options, and preview changes in real-time.
- 📦 **Static Site Export**: Download ready-to-deploy static HTML/CSS packages or ZIP bundles for GitHub Pages, Vercel, Netlify, or custom hosting.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Routing**: [React Router v7](https://reactrouter.com/)
- **Exporting**: [JSZip](https://stuk.github.io/jszip/) & [FileSaver](https://github.com/eligrey/FileSaver.js/)
- **Linter**: [Oxlint](https://oxc.rs/)

### Backend
- **Runtime**: [Node.js](https://nodejs.org/) (ES Modules)
- **Framework**: [Express.js](https://expressjs.com/)
- **AI Engine**: [Groq SDK](https://github.com/groq/groq-typescript) (e.g. `openai/gpt-oss-20b` or custom models)
- **PDF Parser**: `pdf-parse` & `multer`
- **Validation**: [Zod](https://zod.dev/)

---

## 📁 Monorepo Structure

```
DevGen-AI/
├── frontend/             # Vite + React 19 Frontend application
│   ├── src/
│   │   ├── components/   # UI components and layout templates
│   │   ├── pages/        # Application views (Landing, Create, Preview, Ats, etc.)
│   │   ├── utils/        # Static export and helper utilities
│   │   └── data/         # Mock data and initial configurations
│   ├── public/           # Static assets and icons
│   └── package.json
├── server/               # Express API server
│   ├── routes/           # Endpoints (GitHub, Resume, Generate, ATS, etc.)
│   ├── middleware/       # Error handling & middleware
│   ├── utils/            # ATS analysis, AI prompts, and validation schemas
│   └── package.json
├── .env.example          # Environment variables template
├── .gitignore            # Git exclusion rules
├── package.json          # Monorepo workspace configuration
└── README.md
```

---

## 🚀 Quick Start

### 1. Prerequisites
- **Node.js** v18 or higher
- **npm** or **pnpm**
- A **GitHub Personal Access Token**
- A **Groq API Key** (from [Groq Console](https://console.groq.com/))

### 2. Clone Repository
```bash
git clone https://github.com/Parimelazagan/DevGen-AI.git
cd DevGen-AI
```

### 3. Install Dependencies
Install all workspace dependencies from the root:
```bash
npm install
```

### 4. Configure Environment Variables
Copy `.env.example` to `server/.env`:
```bash
cp .env.example server/.env
```
Edit `server/.env` and supply your API keys:
```env
PORT=5000
GITHUB_TOKEN=your_github_personal_access_token
GROQ_API_KEY=your_groq_api_key
GROQ_MODEL=openai/gpt-oss-20b
```

### 5. Run Development Servers
You can start both frontend and server:

**Frontend**:
```bash
npm run dev:frontend
```
*Frontend runs on `http://localhost:5173`*

**Backend Server**:
```bash
npm run dev:server
```
*Server runs on `http://localhost:5000`*

---

## 🛡️ Security & Privacy
- **API Keys & Secrets**: Never commit `.env` files. The repository is pre-configured with strict `.gitignore` rules preventing `.env` and credential files from being tracked.
- **Client-Side Safety**: All sensitive LLM and GitHub API token interactions are brokered via the Express backend.

---

## 🤝 Contributing
Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/Parimelazagan/DevGen-AI/issues).

---

## 📄 License
This project is open-source and licensed under the [MIT License](LICENSE).
