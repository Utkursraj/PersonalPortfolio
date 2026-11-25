import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowRight, Code2, Cpu, FolderGit2, Layers, Search, X } from 'lucide-react';
import { TECH_CATEGORIES } from '../data/projects';
import type { Project, PublicRepoEntry } from '../types/portfolio';

interface CommandConsoleProps {
  open: boolean;
  onClose: () => void;
  flagships: Project[];
  publicRepos: PublicRepoEntry[];
  onInspectProject: (project: Project) => void;
  onSelectSkill: (skillKey: string, skillLabel: string) => void;
}

type CommandItem =
  | {
      id: string;
      kind: 'flagship';
      title: string;
      subtitle: string;
      project: Project;
    }
  | {
      id: string;
      kind: 'repo';
      title: string;
      subtitle: string;
      repo: PublicRepoEntry;
    }
  | {
      id: string;
      kind: 'skill';
      title: string;
      subtitle: string;
      skillKey: string;
    };

export function CommandConsole({
  open,
  onClose,
  flagships,
  publicRepos,
  onInspectProject,
  onSelectSkill,
}: CommandConsoleProps) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const allItems = useMemo<CommandItem[]>(() => {
    const items: CommandItem[] = [];

    for (const project of flagships) {
      items.push({
        id: `flagship-${project.id}`,
        kind: 'flagship',
        title: project.title,
        subtitle: `${project.visibility} · ${project.primaryCategory} · ${project.techStack.slice(0, 3).join(', ')}`,
        project,
      });
    }

    for (const repo of publicRepos) {
      items.push({
        id: `repo-${repo.id}`,
        kind: 'repo',
        title: repo.title,
        subtitle: `GitHub Repo · ${repo.language} · ${repo.techStack.slice(0, 3).join(', ')}`,
        repo,
      });
    }

    for (const cat of TECH_CATEGORIES) {
      for (const skill of cat.skills) {
        items.push({
          id: `skill-${skill.key}`,
          kind: 'skill',
          title: skill.label,
          subtitle: `${cat.title} · ${skill.role}`,
          skillKey: skill.key,
        });
      }
    }

    return items;
  }, [flagships, publicRepos]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return allItems.slice(0, 12);
    return allItems.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.subtitle.toLowerCase().includes(q)
    );
  }, [allItems, query]);

  useEffect(() => {
    if (!open) return;
    const id = window.setTimeout(() => inputRef.current?.focus(), 20);
    return () => window.clearTimeout(id);
  }, [open]);

  const executeItem = (item: CommandItem) => {
    onClose();
    if (item.kind === 'flagship') {
      onInspectProject(item.project);
      return;
    }
    if (item.kind === 'skill') {
      onSelectSkill(item.skillKey, item.title);
      document.querySelector('#work')?.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    if (item.kind === 'repo') {
      document.querySelector('#github-live')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) =>
          filtered.length === 0 ? 0 : (prev + 1) % filtered.length
        );
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) =>
          filtered.length === 0 ? 0 : (prev - 1 + filtered.length) % filtered.length
        );
      } else if (e.key === 'Enter' && filtered[selectedIndex]) {
        e.preventDefault();
        executeItem(filtered[selectedIndex]);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/80 px-4 pt-[12vh]"
      role="dialog"
      aria-modal="true"
      aria-label="Interactive Architecture Console"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl overflow-hidden rounded-2xl border border-white/15 bg-[#0A0A12] shadow-[0_24px_80px_rgba(0,0,0,0.9)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3.5">
          <Search className="h-4 w-4 shrink-0 text-[#00F5D4]" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Search flagship systems, GitHub repos, or tech skills..."
            className="w-full bg-transparent text-sm text-white placeholder-zinc-500 focus:outline-none"
          />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close console"
            className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/10 text-zinc-400 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="max-h-[56vh] overflow-y-auto p-2">
          {filtered.length === 0 ? (
            <div className="px-4 py-10 text-center text-sm text-zinc-400">
              No projects or skills match &ldquo;{query}&rdquo;.
            </div>
          ) : (
            filtered.map((item, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <button
                  key={item.id}
                  type="button"
                  onMouseEnter={() => setSelectedIndex(idx)}
                  onClick={() => executeItem(item)}
                  className={`flex w-full items-center justify-between gap-3 rounded-xl px-3.5 py-2.5 text-left transition-colors ${
                    isSelected ? 'bg-[#6366F1]/20 text-white' : 'text-zinc-300 hover:bg-white/5'
                  }`}
                >
                  <div className="flex min-w-0 items-center gap-3">
                    {item.kind === 'flagship' ? (
                      <Layers className="h-4 w-4 shrink-0 text-[#00F5D4]" />
                    ) : item.kind === 'repo' ? (
                      <FolderGit2 className="h-4 w-4 shrink-0 text-indigo-300" />
                    ) : (
                      <Code2 className="h-4 w-4 shrink-0 text-pink-300" />
                    )}
                    <div className="min-w-0">
                      <div className="truncate text-sm font-semibold text-white">
                        {item.title}
                      </div>
                      <div className="truncate font-mono text-[11px] text-zinc-400">
                        {item.subtitle}
                      </div>
                    </div>
                  </div>
                  <ArrowRight className="h-3.5 w-3.5 shrink-0 text-zinc-500" />
                </button>
              );
            })
          )}
        </div>

        <div className="flex items-center justify-between border-t border-white/10 bg-[#07070C] px-4 py-2.5 font-mono text-[11px] text-zinc-500">
          <span className="inline-flex items-center gap-1.5">
            <Cpu className="h-3.5 w-3.5 text-indigo-400" />
            <span>Jump to Flagships, Repos, or Tech Filters</span>
          </span>
          <span>↑↓ Navigate · Enter Open · Esc Close</span>
        </div>
      </div>
    </div>
  );
}
