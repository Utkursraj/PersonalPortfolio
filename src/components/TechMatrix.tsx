import { ArrowUpRight, Layers, X } from 'lucide-react';
import { TECH_CATEGORIES, projectMatchesSkill } from '../data/projects';
import type { Project, PublicRepoEntry } from '../types/portfolio';

interface TechMatrixProps {
  activeSkillKey: string | null;
  activeSkillLabel: string | null;
  onSelectSkill: (skillKey: string | null, skillLabel: string | null) => void;
  flagshipProjects: Project[];
  publicRepos: PublicRepoEntry[];
  onInspectProject: (project: Project) => void;
}

const ACCENT_CLASSES: Record<'cyan' | 'indigo' | 'magenta' | 'emerald', string> = {
  cyan: 'text-[#00F5D4]',
  indigo: 'text-indigo-300',
  magenta: 'text-pink-300',
  emerald: 'text-emerald-300',
};

export function TechMatrix({
  activeSkillKey,
  activeSkillLabel,
  onSelectSkill,
  flagshipProjects,
  publicRepos,
  onInspectProject,
}: TechMatrixProps) {
  const matchedFlagships = activeSkillKey
    ? flagshipProjects.filter((p) =>
        projectMatchesSkill(p.skillKeys, p.techStack, activeSkillKey)
      )
    : [];

  const matchedPublic = activeSkillKey
    ? publicRepos.filter((r) =>
        projectMatchesSkill(r.skillKeys, r.techStack, activeSkillKey)
      )
    : [];

  return (
    <section
      id="architecture"
      className="relative z-10 mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8"
    >
      <div className="flex flex-col justify-between gap-4 border-b border-white/10 pb-8 md:flex-row md:items-end">
        <div>
          <p className="font-mono text-xs font-medium text-indigo-300">
            02. Verified Stack &amp; System Matrix
          </p>
          <h2
            className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl"
            style={{ textWrap: 'balance' }}
          >
            Interactive Engineering Capability Matrix
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-400 sm:text-base">
            Select any technology below to highlight matching flagship systems and
            live GitHub repositories across the portfolio.
          </p>
        </div>

        {activeSkillKey && (
          <button
            type="button"
            onClick={() => onSelectSkill(null, null)}
            className="inline-flex min-h-[40px] shrink-0 items-center gap-2 self-start whitespace-nowrap rounded-xl border border-[#00F5D4]/40 bg-[#00F5D4]/10 px-4 py-2 text-xs font-semibold text-[#00F5D4] transition-colors hover:bg-[#00F5D4]/20 md:self-auto"
          >
            <X className="h-3.5 w-3.5" />
            <span>Reset Filter ({activeSkillLabel})</span>
          </button>
        )}
      </div>

      {/* Interactive Match Summary Bar */}
      {activeSkillKey && (
        <div className="mt-6 rounded-2xl border border-[#00F5D4]/30 bg-[#0B0B14]/95 p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="text-sm text-zinc-200">
              Showing matches for{' '}
              <span className="font-mono font-semibold text-[#00F5D4]">
                {activeSkillLabel}
              </span>
              <span className="ml-2 font-mono text-xs text-zinc-400 tabular-nums">
                · {matchedFlagships.length} Flagships · {matchedPublic.length} Public Repos
              </span>
            </div>

            <a
              href="#work"
              className="inline-flex items-center gap-1.5 font-mono text-xs font-medium text-[#00F5D4] hover:underline"
            >
              <span>Jump to Highlighted Showcase</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>

          {(matchedFlagships.length > 0 || matchedPublic.length > 0) && (
            <div className="mt-4 flex flex-wrap gap-2">
              {matchedFlagships.map((proj) => (
                <button
                  key={proj.id}
                  type="button"
                  onClick={() => onInspectProject(proj)}
                  className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-zinc-900 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:border-[#00F5D4]/60"
                >
                  <Layers className="h-3.5 w-3.5 text-[#00F5D4]" />
                  <span>{proj.title}</span>
                </button>
              ))}
              {matchedPublic.map((repo) => (
                <a
                  key={repo.id}
                  href={repo.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-zinc-950 px-3 py-1.5 text-xs text-zinc-300 transition-colors hover:border-white/30 hover:text-white"
                >
                  <span>{repo.title}</span>
                  <ArrowUpRight className="h-3 w-3 text-zinc-400" />
                </a>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 4-Domain Matrix Grid */}
      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
        {TECH_CATEGORIES.map((category) => (
          <div
            key={category.id}
            className="rounded-2xl border border-white/10 bg-[#0B0B12]/92 p-6"
          >
            <h3 className={`text-lg font-bold ${ACCENT_CLASSES[category.accent]}`}>
              {category.title}
            </h3>
            <p className="mt-1 text-xs leading-relaxed text-zinc-400">
              {category.subtitle}
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              {category.skills.map((skill) => {
                const isSelected = activeSkillKey === skill.key;
                const count =
                  flagshipProjects.filter((p) =>
                    projectMatchesSkill(p.skillKeys, p.techStack, skill.key)
                  ).length +
                  publicRepos.filter((r) =>
                    projectMatchesSkill(r.skillKeys, r.techStack, skill.key)
                  ).length;

                return (
                  <button
                    key={skill.key}
                    type="button"
                    onClick={() =>
                      onSelectSkill(
                        isSelected ? null : skill.key,
                        isSelected ? null : skill.label
                      )
                    }
                    title={`${skill.role} (${count} projects)`}
                    className={`inline-flex min-h-[38px] items-center gap-2 rounded-xl border px-3.5 py-2 text-left text-xs font-medium transition-all ${
                      isSelected
                        ? 'border-[#00F5D4] bg-[#00F5D4] font-semibold text-zinc-950 shadow-[0_0_20px_rgba(0,245,212,0.25)]'
                        : 'border-white/10 bg-zinc-900/85 text-zinc-200 hover:border-white/30 hover:bg-zinc-800'
                    }`}
                  >
                    <span>{skill.label}</span>
                    {count > 0 && (
                      <span
                        className={`font-mono text-[10px] tabular-nums ${
                          isSelected ? 'text-zinc-900' : 'text-zinc-500'
                        }`}
                      >
                        {count}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
