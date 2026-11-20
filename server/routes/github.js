import { Router } from 'express';

const router = Router();
const cache = new Map();
const CACHE_TTL_MS = 10 * 60 * 1000;

async function githubFetch(url, headers) {
  const response = await fetch(url, { headers });

  // Public profiles should still work when a local token has expired or is invalid.
  if (response.status === 401 && headers.Authorization) {
    const { Authorization, ...publicHeaders } = headers;
    return fetch(url, { headers: publicHeaders });
  }

  return response;
}

async function getReadmeExcerpt(username, repoName, headers) {
  try {
    const res = await githubFetch(`https://api.github.com/repos/${username}/${repoName}/readme`, headers);
    if (!res.ok) return '';
    const data = await res.json();
    if (data.content && data.encoding === 'base64') {
      const decoded = Buffer.from(data.content, 'base64').toString('utf-8');
      const clean = decoded.replace(/#+/g, '').replace(/[\r\n]+/g, ' ').trim();
      return clean.length > 150 ? clean.substring(0, 147) + '...' : clean;
    }
  } catch (err) {
    // Ignore README fetch error
  }
  return '';
}

async function getRepositorySignals(username, repoName, headers) {
  try {
    const res = await githubFetch(`https://api.github.com/repos/${username}/${repoName}/contents`, headers);
    if (!res.ok) return {};
    const names = (await res.json()).map((item) => item.name.toLowerCase());
    return {
      hasTests: names.some((name) => /test|spec/.test(name)),
      hasCi: names.includes('.github') || names.includes('.gitlab-ci.yml'),
      hasDocker: names.includes('dockerfile') || names.includes('docker-compose.yml'),
      hasDeploymentConfig: names.some((name) => ['vercel.json', 'netlify.toml', 'render.yaml', 'procfile'].includes(name)),
    };
  } catch {
    return {};
  }
}

router.get('/:username', async (req, res) => {
  try {
    const { username } = req.params;
    const cached = cache.get(username.toLowerCase());
    if (cached && Date.now() - cached.createdAt < CACHE_TTL_MS) return res.json({ ...cached.data, cached: true });

    const headers = {
      'User-Agent': 'Portfolio-Generator-App',
      'Accept': 'application/vnd.github.v3+json',
    };

    if (process.env.GITHUB_TOKEN) {
      headers['Authorization'] = `token ${process.env.GITHUB_TOKEN}`;
    }

    // Step 2: Fetch user profile
    const userRes = await githubFetch(`https://api.github.com/users/${username}`, headers);
    if (userRes.status === 404) {
      return res.status(404).json({ error: 'GitHub user not found' });
    }
    if (!userRes.ok) {
      return res.status(500).json({ error: 'Failed to fetch GitHub data' });
    }
    const userData = await userRes.json();

    // Step 3: Fetch recently updated repos (up to 10)
    const reposRes = await githubFetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=10`, headers);
    if (!reposRes.ok) {
      return res.status(500).json({ error: 'Failed to fetch GitHub data' });
    }
    const reposData = await reposRes.json();

    // Step 6: Calculate top 3 languages across all fetched repos
    const langCounts = {};
    for (const repo of reposData) {
      if (repo.language) {
        langCounts[repo.language] = (langCounts[repo.language] || 0) + 1;
      }
    }
    const topLanguages = Object.keys(langCounts)
      .sort((a, b) => langCounts[b] - langCounts[a])
      .slice(0, 3);

    // Step 5: Select top 5 repos (sorted by stargazers_count desc)
    const sortedRepos = [...reposData].sort((a, b) => (b.stargazers_count || 0) - (a.stargazers_count || 0)).slice(0, 5);

    const projects = await Promise.all(
      sortedRepos.map(async (repo) => {
        let description = repo.description || '';
        if (!description) {
          description = await getReadmeExcerpt(username, repo.name, headers);
        }
        const signals = await getRepositorySignals(username, repo.name, headers);
        return {
          title: repo.name,
          description,
          tech: repo.language ? [repo.language] : [],
          link: repo.html_url,
          metadata: {
            stars: repo.stargazers_count || 0,
            forks: repo.forks_count || 0,
            updatedAt: repo.updated_at || null,
            readmeLength: description.length,
            ...signals,
          },
        };
      })
    );

    // Step 7: Build githubStats object
    const githubStats = {
      username: userData.login || username,
      publicRepos: userData.public_repos || 0,
      followers: userData.followers || 0,
      topLanguages,
    };

    const responseData = {
      projects,
      githubStats,
    };
    cache.set(username.toLowerCase(), { createdAt: Date.now(), data: responseData });
    return res.json(responseData);
  } catch (error) {
    console.error('[GitHub API Route Error]:', error);
    return res.status(500).json({ error: 'Failed to fetch GitHub data' });
  }
});

export default router;
