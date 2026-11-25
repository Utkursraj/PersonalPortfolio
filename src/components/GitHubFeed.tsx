import { useEffect, useMemo, useState } from 'react';
import {
  Archive,
  ArrowUpRight,
  GitFork,
  RefreshCw,
  Search,
  Star,
  X,
} from 'lucide-react';
import { GitHubIcon } from './BrandIcons';
import { GITHUB_PROFILE_URL, projectMatchesSkill } from '../data/projects';
import { formatRelativeDate } from '../services/githubSync';
import type { PublicRepoEntry } from '../types/portfolio';

interface GitHubFeedProps {
  publicFeed: PublicRepoEntry[];
  archivedRepos: PublicRepoEntry[];
  syncSource: 'live' | 'cached' | 'fallback';
  isRefreshing: boolean;
  onRefresh: () => void;
  activeSkillKey: string | null;
}

const LANGUAGE_COLOR: Record<string, string> = {
  TypeScript: 'bg-blue-400',
  JavaScript: 'bg-amber-300',
  Python: 'bg-emerald-400',
  HTML: 'bg-orange-400',
  CSS: 'bg-indigo-400',
};

export function GitHubFeed({
  publicFeed,
  archivedRepos,
  syncSource,
  isRefreshing,
  onRefresh,
  activeSkillKey,
}: GitHubFeedProps) {
  const [archiveOpen, setArchiveOpen] = useState(false);
  const [archiveQuery, setArchiveQuery] = useState('');

  useEffect(() => {
    if (!archiveOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setArchiveOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [archiveOpen]);

  const filteredArchive = useMemo(() => {
    const q = archiveQuery.trim().toLowerCase();
    if (!q) return archivedRepos;
    return archivedRepos.filter(
      (r) =>
        r.name.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q) ||
        r.language.toLowerCase().includes(q)
    );
  }, [archivedRepos, archiveQuery]);

  const syncLabel =
    syncSource === 'live'
      ? 'Live GitHub API'
      : syncSource === 'cached'
        ? 'Cached · 15m TTL'
        : 'Offline Curated Fallback';

  return (
    <section
      id="github-live"
      className="relative z-10 mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8"
    >
      <div className="flex flex-col justify-between gap-6 border-b border-white/10 pb-8 md:flex-row md:items-end">
        <div>
          <p className="font-mono text-xs font-medium text-[#00F5D4]">
            03. Live Public Repositories
          </p>
          <h2
            className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl"
            style={{ textWrap: 'balance' }}
          >
            Synced Open-Source Feed (@Utkursraj)
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-400 sm:text-base">
            Additional full-stack, payment, and backend repositories fetched from
            GitHub with 15-minute session caching. Foundational learning exercises
            are separated into the archive drawer.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <span className="font-mono text-xs text-zinc-400">{syncLabel}</span>

          <button
            type="button"
            onClick={onRefresh}
            disabled={isRefreshing}
            className="inline-flex min-h-[40px] items-center gap-2 whitespace-nowrap rounded-xl border border-white/10 bg-zinc-900/90 px-3.5 py-2 text-xs font-medium text-zinc-200 transition-colors hover:border-white/30 disabled:opacity-50"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>{isRefreshing ? 'Syncing' : 'Refresh GitHub'}</span>
          </button>

          <button
            type="button"
            onClick={() => setArchiveOpen(true)}
            className="inline-flex min-h-[40px] items-center gap-2 whitespace-nowrap rounded-xl border border-[#6366F1]/40 bg-[#6366F1]/12 px-4 py-2 text-xs font-semibold text-indigo-200 transition-colors hover:border-[#6366F1]/80 hover:bg-[#6366F1]/22"
          >
            <Archive className="h-3.5 w-3.5 text-[#00F5D4]" />
            <span>View Full GitHub Archive ({archivedRepos.length})</span>
          </button>
        </div>
      </div>

      {/* Secondary Public Repositories Grid */}
      <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {publicFeed.map((repo) => {
          const isMatched = activeSkillKey
            ? projectMatchesSkill(repo.skillKeys, repo.techStack, activeSkillKey)
            : false;
          const isDimmed = Boolean(activeSkillKey) && !isMatched;
          const dotColor = LANGUAGE_COLOR[repo.language] ?? 'bg-zinc-400';

          return (
            <article
              key={repo.id}
              className={`flex flex-col justify-between rounded-2xl border bg-[#0B0B12]/90 p-5 transition-all duration-200 hover:-translate-y-0.5 ${
                isMatched
                  ? 'border-[#00F5D4]/70 shadow-[0_0_24px_rgba(0,245,212,0.12)]'
                  : isDimmed
                    ? 'border-white/5 opacity-50 hover:opacity-90'
                    : 'border-white/10 hover:border-white/25'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 font-mono text-xs text-zinc-400">
                  <div className="flex items-center gap-2">
                    <span className={`h-2 w-2 rounded-full ${dotColor}`} aria-hidden="true" />
                    <span>{repo.language}</span>
                  </div>
                  <div className="flex items-center gap-3 tabular-nums">
                    <span className="inline-flex items-center gap-1">
                      <Star className="h-3 w-3 text-amber-300" />
                      {repo.stars}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <GitFork className="h-3 w-3" />
                      {repo.forks}
                    </span>
                    <span className="text-zinc-500">
                      {formatRelativeDate(repo.updatedAt)}
                    </span>
                  </div>
                </div>

                <h3 className="mt-3 text-lg font-bold text-white">{repo.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                  {repo.description}
                </p>

                <div className="mt-4 flex flex-wrap gap-1.5 font-mono text-[11px] text-zinc-400">
                  {repo.techStack.map((tech, idx) => (
                    <span key={tech}>
                      {tech}
                      {idx < repo.techStack.length - 1 ? ' · ' : ''}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-5 flex items-center gap-3 border-t border-white/10 pt-4">
                <a
                  href={repo.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-[36px] items-center gap-1.5 text-xs font-semibold text-zinc-200 transition-colors hover:text-[#00F5D4]"
                >
                  <GitHubIcon className="h-3.5 w-3.5" />
                  <span>Source</span>
                </a>
                {repo.liveUrl && (
                  <a
                    href={repo.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex min-h-[36px] items-center gap-1 text-xs font-semibold text-[#00F5D4] transition-colors hover:underline"
                  >
                    <span>Live Demo</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                )}
              </div>
            </article>
          );
        })}
      </div>

      {/* Full GitHub Archive Drawer Modal */}
      {archiveOpen && (
        <div
          className="fixed inset-0 z-50 flex justify-end bg-black/75"
          role="dialog"
          aria-modal="true"
          aria-labelledby="archive-drawer-title"
          onClick={() => setArchiveOpen(false)}
        >
          <div
            className="flex h-full w-full max-w-xl flex-col border-l border-white/15 bg-[#09090F] p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-4">
              <div>
                <p className="font-mono text-xs text-[#00F5D4]">
                  GitHub Archive Drawer
                </p>
                <h3
                  id="archive-drawer-title"
                  className="mt-1 text-xl font-bold text-white"
                >
                  Excluded &amp; Foundational Repositories
                </h3>
                <p className="mt-1 text-xs text-zinc-400">
                  Earlier learning projects and forks kept separate from the main
                  engineering showcase.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setArchiveOpen(false)}
                aria-label="Close GitHub archive drawer"
                className="inline-flex min-h-[40px] min-w-[40px] items-center justify-center rounded-xl border border-white/10 bg-zinc-900 text-zinc-300 hover:border-white/30 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="relative mt-4">
              <Search className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-zinc-500" />
              <input
                type="text"
                value={archiveQuery}
                onChange={(e) => setArchiveQuery(e.target.value)}
                placeholder="Filter archive repositories..."
                className="w-full rounded-xl border border-white/10 bg-zinc-950 py-2.5 pr-4 pl-10 text-sm text-white placeholder-zinc-500 focus:border-[#00F5D4] focus:outline-none"
              />
            </div>

            <div className="mt-4 flex-1 space-y-3 overflow-y-auto pr-1">
              {filteredArchive.length === 0 ? (
                <div className="rounded-xl border border-white/10 bg-zinc-950/60 p-6 text-center text-sm text-zinc-400">
                  No archived repositories match &ldquo;{archiveQuery}&rdquo;.
                </div>
              ) : (
                filteredArchive.map((repo) => (
                  <div
                    key={repo.id}
                    className="flex items-start justify-between gap-4 rounded-xl border border-white/10 bg-zinc-950/75 p-4"
                  >
                    <div>
                      <div className="flex items-center gap-2 font-mono text-xs text-zinc-400">
                        <span className="font-semibold text-zinc-200">{repo.name}</span>
                        <span aria-hidden="true">·</span>
                        <span>{repo.language}</span>
                        <span aria-hidden="true">·</span>
                        <span className="tabular-nums">★ {repo.stars}</span>
                      </div>
                      <p className="mt-1 text-xs leading-relaxed text-zinc-400">
                        {repo.description}
                      </p>
                    </div>
                    <a
                      href={repo.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex min-h-[36px] shrink-0 items-center gap-1 rounded-lg border border-white/10 px-3 py-1.5 text-xs font-medium text-zinc-200 hover:border-[#00F5D4]/50 hover:text-[#00F5D4]"
                    >
                      <span>Open</span>
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                  </div>
                ))
              )}
            </div>

            <div className="mt-4 border-t border-white/10 pt-4">
              <a
                href={`${GITHUB_PROFILE_URL}?tab=repositories`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex w-full min-h-[44px] items-center justify-center gap-2 rounded-xl border border-white/15 bg-zinc-900 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:border-[#00F5D4]/60"
              >
                <GitHubIcon className="h-4 w-4" />
                <span>Browse All Repositories on GitHub</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
