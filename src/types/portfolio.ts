export type SectionId = 'hero' | 'work' | 'architecture' | 'contact';

export type QualityMode = 'high' | 'eco';

export type ProjectCategory =
  | 'All Flagships'
  | 'AI & Multimodal'
  | '3D & Spatial Web'
  | 'Distributed Backend'
  | 'Full-Stack MERN';

export type DiagramType =
  | 'thumbcraft'
  | 'stockledger'
  | 'aetheria'
  | 'taskplatform'
  | 'shl'
  | 'smartleads';

export interface ArchitectureStage {
  id: string;
  layer: string;
  title: string;
  tech: string;
  detail: string;
  metric?: string;
}

export interface Project {
  id: string;
  repoName?: string;
  title: string;
  subtitle: string;
  visibility: 'Private SaaS' | 'Public Repo';
  featured: boolean;
  primaryCategory: Exclude<ProjectCategory, 'All Flagships'>;
  categories: Exclude<ProjectCategory, 'All Flagships'>[];
  summary: string;
  problem: string;
  architectureSummary: string;
  techStack: string[];
  skillKeys: string[];
  highlights: string[];
  flow: ArchitectureStage[];
  diagramType: DiagramType;
  githubUrl?: string;
  liveUrl?: string;
  stars: number;
  forks: number;
  language: string;
  updatedAt: string;
  isLiveSynced: boolean;
}

export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  homepage: string | null;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  pushed_at: string;
  archived: boolean;
  fork: boolean;
  topics?: string[];
}

export interface PublicRepoEntry {
  id: string;
  name: string;
  title: string;
  description: string;
  language: string;
  stars: number;
  forks: number;
  updatedAt: string;
  githubUrl: string;
  liveUrl?: string;
  techStack: string[];
  skillKeys: string[];
  isArchivedCategory: boolean;
  isLiveSynced: boolean;
}

export interface TechSkill {
  label: string;
  key: string;
  role: string;
}

export interface TechCategory {
  id: string;
  title: string;
  subtitle: string;
  accent: 'cyan' | 'indigo' | 'magenta' | 'emerald';
  skills: TechSkill[];
}

export interface SyncedPortfolioData {
  flagships: Project[];
  publicFeed: PublicRepoEntry[];
  archivedRepos: PublicRepoEntry[];
  totalPublicCount: number;
  syncSource: 'live' | 'cached' | 'fallback';
  lastSyncedAt: string;
}
