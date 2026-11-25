import {
  CURATED_PUBLIC_REPOS,
  EXCLUDED_ARCHIVE_REPOS,
  FLAGSHIP_PROJECTS,
  GITHUB_USERNAME,
} from '../data/projects';
import type {
  GitHubRepo,
  Project,
  PublicRepoEntry,
  SyncedPortfolioData,
} from '../types/portfolio';

const CACHE_KEY = 'utkurs_github_repos_cache_v1';
const CACHE_TTL_MS = 15 * 60 * 1000;
const GITHUB_REPOS_ENDPOINT = `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`;

interface CachedPayload {
  fetchedAt: number;
  repos: GitHubRepo[];
}

function readCachedRepos(): CachedPayload | null {
  try {
    const raw = sessionStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as CachedPayload;
    if (!Array.isArray(parsed.repos) || typeof parsed.fetchedAt !== 'number') {
      return null;
    }
    if (Date.now() - parsed.fetchedAt > CACHE_TTL_MS) {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

function writeCachedRepos(repos: GitHubRepo[]): void {
  try {
    const payload: CachedPayload = {
      fetchedAt: Date.now(),
      repos,
    };
    sessionStorage.setItem(CACHE_KEY, JSON.stringify(payload));
  } catch {
    // Ignore storage quota / private-browsing errors
  }
}

function inferSkillKeysFromRepo(repo: GitHubRepo): { techStack: string[]; skillKeys: string[] } {
  const stack: string[] = [];
  const keys: string[] = [];

  if (repo.language) {
    stack.push(repo.language);
    keys.push(repo.language.toLowerCase());
  }

  const text = `${repo.name} ${repo.description ?? ''} ${(repo.topics ?? []).join(' ')}`.toLowerCase();

  const matchers: Array<[RegExp, string, string]> = [
    [/react/, 'React', 'react'],
    [/typescript/, 'TypeScript', 'typescript'],
    [/node|express/, 'Node.js', 'nodejs'],
    [/express/, 'Express.js', 'express'],
    [/mongo/, 'MongoDB', 'mongodb'],
    [/postgres|supabase/, 'PostgreSQL / Supabase', 'postgresql'],
    [/tailwind/, 'Tailwind CSS', 'tailwind'],
    [/docker/, 'Docker', 'docker'],
    [/redis/, 'Redis', 'redis'],
    [/bullmq/, 'BullMQ', 'bullmq'],
    [/fastapi/, 'FastAPI', 'fastapi'],
    [/python/, 'Python', 'python'],
    [/jwt/, 'JWT', 'jwt'],
    [/stripe/, 'Stripe', 'stripe'],
    [/three/, 'Three.js', 'threejs'],
  ];

  for (const [pattern, label, key] of matchers) {
    if (pattern.test(text)) {
      if (!stack.includes(label)) stack.push(label);
      if (!keys.includes(key)) keys.push(key);
    }
  }

  return {
    techStack: stack.slice(0, 5),
    skillKeys: keys,
  };
}

function buildSyncedData(
  liveRepos: GitHubRepo[] | null,
  syncSource: 'live' | 'cached' | 'fallback',
  syncedAtIso: string
): SyncedPortfolioData {
  const repoByLowerName = new Map<string, GitHubRepo>();
  if (liveRepos) {
    for (const repo of liveRepos) {
      repoByLowerName.set(repo.name.toLowerCase(), repo);
    }
  }

  const flagshipRepoNames = new Set<string>();

  const flagships: Project[] = FLAGSHIP_PROJECTS.map((project) => {
    if (!project.repoName) {
      return project;
    }

    const lower = project.repoName.toLowerCase();
    flagshipRepoNames.add(lower);
    const live = repoByLowerName.get(lower);

    if (!live) {
      return project;
    }

    return {
      ...project,
      stars: live.stargazers_count,
      forks: live.forks_count,
      language: live.language ?? project.language,
      updatedAt: live.pushed_at || live.updated_at || project.updatedAt,
      githubUrl: live.html_url || project.githubUrl,
      liveUrl: live.homepage && live.homepage.trim().length > 0 ? live.homepage : project.liveUrl,
      isLiveSynced: true,
    };
  });

  const publicFeed: PublicRepoEntry[] = [];
  const archivedRepos: PublicRepoEntry[] = [];
  const processedKeys = new Set<string>();

  // 1. Merge curated secondary public repos first so ordering & engineering descriptions are consistent
  for (const [key, curated] of Object.entries(CURATED_PUBLIC_REPOS)) {
    processedKeys.add(key);
    const live = repoByLowerName.get(key);
    publicFeed.push({
      id: `repo-${key}`,
      name: live?.name ?? curated.name,
      title: curated.title,
      description: live?.description?.trim() || curated.description,
      language: live?.language ?? curated.language,
      stars: live?.stargazers_count ?? curated.stars,
      forks: live?.forks_count ?? curated.forks,
      updatedAt: live?.pushed_at || live?.updated_at || curated.updatedAt,
      githubUrl: live?.html_url ?? curated.githubUrl,
      liveUrl: live?.homepage && live.homepage.trim().length > 0 ? live.homepage : curated.liveUrl,
      techStack: curated.techStack,
      skillKeys: curated.skillKeys,
      isArchivedCategory: false,
      isLiveSynced: Boolean(live),
    });
  }

  // 2. Partition remaining live GitHub repos into publicFeed vs archivedRepos
  if (liveRepos) {
    for (const repo of liveRepos) {
      const lower = repo.name.toLowerCase();
      if (flagshipRepoNames.has(lower) || processedKeys.has(lower)) {
        continue;
      }
      processedKeys.add(lower);

      const isBeginnerArchive = EXCLUDED_ARCHIVE_REPOS.has(lower) || repo.archived;
      const inferred = inferSkillKeysFromRepo(repo);

      const entry: PublicRepoEntry = {
        id: `gh-${repo.id}`,
        name: repo.name,
        title: repo.name,
        description:
          repo.description?.trim() ||
          (isBeginnerArchive
            ? 'Early foundational JavaScript / frontend practice repository.'
            : 'Public software engineering repository on GitHub.'),
        language: repo.language ?? 'JavaScript',
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        updatedAt: repo.pushed_at || repo.updated_at,
        githubUrl: repo.html_url,
        liveUrl: repo.homepage && repo.homepage.trim().length > 0 ? repo.homepage : undefined,
        techStack: inferred.techStack,
        skillKeys: inferred.skillKeys,
        isArchivedCategory: isBeginnerArchive,
        isLiveSynced: true,
      };

      if (isBeginnerArchive) {
        archivedRepos.push(entry);
      } else if (!repo.fork) {
        publicFeed.push(entry);
      } else {
        archivedRepos.push(entry);
      }
    }
  } else {
    // Provide static entries for the known excluded beginner repos in fallback mode so Archive drawer always has real data
    for (const archiveName of [
      'Analog-clock',
      'Digital-Clock',
      'Game',
      'Password-Generator',
      'Project-02-Website-lamp-On-Off-',
      '-Countdown-Timer-Website',
    ]) {
      archivedRepos.push({
        id: `archive-${archiveName}`,
        name: archiveName,
        title: archiveName,
        description: 'Early foundational web / DOM practice repository archived from main showcase.',
        language: 'JavaScript',
        stars: 0,
        forks: 0,
        updatedAt: '2024-06-01T00:00:00Z',
        githubUrl: `https://github.com/${GITHUB_USERNAME}/${archiveName}`,
        techStack: ['HTML', 'CSS', 'JavaScript'],
        skillKeys: ['javascript'],
        isArchivedCategory: true,
        isLiveSynced: false,
      });
    }
  }

  return {
    flagships,
    publicFeed,
    archivedRepos,
    totalPublicCount: liveRepos ? liveRepos.length : flagshipRepoNames.size + publicFeed.length + archivedRepos.length,
    syncSource,
    lastSyncedAt: syncedAtIso,
  };
}

export async function fetchSyncedPortfolio(forceRefresh = false): Promise<SyncedPortfolioData> {
  if (!forceRefresh) {
    const cached = readCachedRepos();
    if (cached) {
      return buildSyncedData(
        cached.repos,
        'cached',
        new Date(cached.fetchedAt).toISOString()
      );
    }
  }

  try {
    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), 7000);

    const response = await fetch(GITHUB_REPOS_ENDPOINT, {
      headers: {
        Accept: 'application/vnd.github+json',
      },
      signal: controller.signal,
    });
    window.clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`GitHub API responded with ${response.status}`);
    }

    const repos = (await response.json()) as GitHubRepo[];
    if (!Array.isArray(repos)) {
      throw new Error('Unexpected GitHub API payload');
    }

    writeCachedRepos(repos);
    return buildSyncedData(repos, 'live', new Date().toISOString());
  } catch {
    const staleCached = readCachedRepos();
    if (staleCached) {
      return buildSyncedData(
        staleCached.repos,
        'cached',
        new Date(staleCached.fetchedAt).toISOString()
      );
    }
    return buildSyncedData(null, 'fallback', new Date().toISOString());
  }
}

export function formatRelativeDate(isoString: string): string {
  const date = new Date(isoString);
  if (Number.isNaN(date.getTime())) return 'Recently';
  const diffMs = Date.now() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  if (diffDays <= 0) return 'Today';
  if (diffDays === 1) return '1d ago';
  if (diffDays < 30) return `${diffDays}d ago`;
  const diffMonths = Math.floor(diffDays / 30);
  if (diffMonths < 12) return `${diffMonths}mo ago`;
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}
