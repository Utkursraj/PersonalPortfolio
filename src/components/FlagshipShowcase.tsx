import { useMemo } from 'react';
import {
  ArrowUpRight,
  GitFork,
  Layers,
  Lock,
  Star,
  X,
} from 'lucide-react';
import { GitHubIcon } from './BrandIcons';
import { projectMatchesSkill } from '../data/projects';
import { formatRelativeDate } from '../services/githubSync';
import type { Project, ProjectCategory } from '../types/portfolio';
import { ArchitectureSvg } from './ArchitectureSvg';

interface FlagshipShowcaseProps {
  projects: Project[];
  selectedCategory: ProjectCategory;
  onSelectCategory: (category: ProjectCategory) => void;
  activeSkillKey: string | null;
  activeSkillLabel: string | null;
  onSelectSkill: (skillKey: string | null, skillLabel: string | null) => void;
  onInspectProject: (project: Project) => void;
}

const CATEGORIES: ProjectCategory[] = [
  'All Flagships',
  'AI & Multimodal',
  '3D & Spatial Web',
  'Distributed Backend',
  'Full-Stack MERN',
];

function normalizeTechToSkillKey(tech: string): string {
  const lower = tech.toLowerCase();
  if (lower.includes('react')) return 'react';
  if (lower.includes('typescript')) return 'typescript';
  if (lower.includes('three')) return 'threejs';
  if (lower.includes('canvas')) return 'html5-canvas';
  if (lower.includes('gemini') && lower.includes('ocr')) return 'multimodal-ocr';
  if (lower.includes('gemini')) return 'gemini';
  if (lower.includes('firebase')) return 'firebase';
  if (lower.includes('razorpay')) return 'razorpay';
  if (lower.includes('node')) return 'nodejs';
  if (lower.includes('express')) return 'express';
  if (lower.includes('tailwind')) return 'tailwind';
  if (lower.includes('chart')) return 'chartjs';
  if (lower.includes('postgres') || lower.includes('supabase')) return 'postgresql';
  if (lower.includes('bullmq')) return 'bullmq';
  if (lower.includes('redis')) return 'redis';
  if (lower.includes('mongo')) return 'mongodb';
  if (lower.includes('docker')) return 'docker';
  if (lower.includes('python')) return 'python';
  if (lower.includes('fastapi')) return 'fastapi';
  if (lower.includes('bm25')) return 'bm25';
  if (lower.includes('json')) return 'structured-json';
  if (lower.includes('rest')) return 'rest-api';
  if (lower.includes('jwt')) return 'jwt';
  if (lower.includes('vite')) return 'vite';
  return lower.replace(/\s+/g, '-');
}

export function FlagshipShowcase({
  projects,
  selectedCategory,
  onSelectCategory,
  activeSkillKey,
  activeSkillLabel,
  onSelectSkill,
  onInspectProject,
}: FlagshipShowcaseProps) {
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      if (selectedCategory === 'All Flagships') return true;
      return project.categories.includes(selectedCategory);
    });
  }, [projects, selectedCategory]);

  const matchingCount = useMemo(() => {
    if (!activeSkillKey) return 0;
    return filteredProjects.filter((p) =>
      projectMatchesSkill(p.skillKeys, p.techStack, activeSkillKey)
    ).length;
  }, [filteredProjects, activeSkillKey]);

  return (
    <section
      id="work"
      className="relative z-10 mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8"
    >
      <div className="flex flex-col justify-between gap-6 border-b border-white/10 pb-8 lg:flex-row lg:items-end">
        <div>
          <p className="font-mono text-xs font-medium text-[#00F5D4]">
            01. Flagship Systems
          </p>
          <h2
            className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl"
            style={{ textWrap: 'balance' }}
          >
            Production AI, Spatial 3D &amp; Distributed Architecture
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-400 sm:text-base">
            Curated flagship products and public repositories combining live GitHub
            telemetry with interactive end-to-end system blueprints.
          </p>
        </div>

        {/* Category Filter Buttons */}
        <div
          role="tablist"
          aria-label="Filter flagship systems by domain"
          className="flex flex-wrap items-center gap-1.5 rounded-xl border border-white/10 bg-[#0A0A11]/95 p-1.5"
        >
          {CATEGORIES.map((cat) => {
            const active = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => onSelectCategory(cat)}
                className={`min-h-[36px] shrink-0 whitespace-nowrap rounded-lg px-3.5 py-1.5 text-xs font-medium transition-colors ${
                  active
                    ? 'bg-[#00F5D4] font-semibold text-zinc-950'
                    : 'text-zinc-400 hover:bg-white/5 hover:text-zinc-100'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Tech Highlight Banner */}
      {activeSkillKey && (
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[#00F5D4]/35 bg-[#00F5D4]/10 px-4 py-3">
          <div className="text-sm text-zinc-200">
            Highlighting systems built with{' '}
            <span className="font-mono font-semibold text-[#00F5D4]">
              {activeSkillLabel ?? activeSkillKey}
            </span>
            <span className="ml-2 font-mono text-xs text-zinc-400 tabular-nums">
              ({matchingCount} of {filteredProjects.length} visible flagships match)
            </span>
          </div>
          <button
            type="button"
            onClick={() => onSelectSkill(null, null)}
            className="inline-flex min-h-[34px] items-center gap-1.5 whitespace-nowrap rounded-lg border border-white/15 bg-zinc-950/70 px-3 py-1 text-xs font-medium text-zinc-200 transition-colors hover:border-white/30 hover:text-white"
          >
            <X className="h-3.5 w-3.5" />
            <span>Clear Highlight</span>
          </button>
        </div>
      )}

      {/* Bento Showcase Grid */}
      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        {filteredProjects.map((project, index) => {
          const isSkillHighlighted = activeSkillKey
            ? projectMatchesSkill(project.skillKeys, project.techStack, activeSkillKey)
            : false;
          const isDimmed = Boolean(activeSkillKey) && !isSkillHighlighted;

          return (
            <article
              key={project.id}
              className={`group flex flex-col justify-between rounded-2xl border bg-[#0B0B12]/92 p-6 transition-all duration-200 hover:-translate-y-1 ${
                isSkillHighlighted
                  ? 'border-[#00F5D4]/70 shadow-[0_0_32px_rgba(0,245,212,0.14)]'
                  : isDimmed
                    ? 'border-white/5 opacity-50 hover:opacity-90'
                    : 'border-white/10 hover:border-[#6366F1]/55'
              } ${index < 2 && selectedCategory === 'All Flagships' ? 'lg:p-7' : ''}`}
            >
              <div>
                {/* Clean Unboxed Metadata Line (Zero-Pill Discipline) */}
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-zinc-400">
                  <div className="flex flex-wrap items-center gap-2 font-mono">
                    <span
                      className={
                        project.visibility === 'Private SaaS'
                          ? 'font-medium text-[#EC4899]'
                          : 'font-medium text-[#00F5D4]'
                      }
                    >
                      {project.visibility}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{project.primaryCategory}</span>
                    {project.language && (
                      <>
                        <span aria-hidden="true">·</span>
                        <span>{project.language}</span>
                      </>
                    )}
                  </div>

                  <div className="flex items-center gap-3 font-mono tabular-nums text-zinc-400">
                    {project.visibility === 'Public Repo' ? (
                      <>
                        <span className="inline-flex items-center gap-1" title="GitHub Stars">
                          <Star className="h-3.5 w-3.5 text-amber-300" />
                          {project.stars}
                        </span>
                        <span className="inline-flex items-center gap-1" title="GitHub Forks">
                          <GitFork className="h-3.5 w-3.5 text-zinc-400" />
                          {project.forks}
                        </span>
                        <span className="text-zinc-500">
                          {formatRelativeDate(project.updatedAt)}
                        </span>
                      </>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-zinc-400">
                        <Lock className="h-3 w-3 text-[#EC4899]" />
                        <span>Commercial IP</span>
                      </span>
                    )}
                  </div>
                </div>

                <h3 className="mt-3 text-xl font-bold tracking-tight text-white sm:text-2xl">
                  {project.title}
                </h3>
                <p className="mt-1 text-sm font-medium text-indigo-300">
                  {project.subtitle}
                </p>

                {/* Architectural SVG Schematic */}
                <div className="mt-5">
                  <ArchitectureSvg type={project.diagramType} />
                </div>

                <p className="mt-5 text-sm leading-relaxed text-zinc-300">
                  {project.summary}
                </p>

                {/* Interactive Stack Filter Controls */}
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {project.techStack.map((tech) => {
                    const key = normalizeTechToSkillKey(tech);
                    const isTechActive = activeSkillKey === key;
                    return (
                      <button
                        key={tech}
                        type="button"
                        onClick={() =>
                          onSelectSkill(
                            isTechActive ? null : key,
                            isTechActive ? null : tech
                          )
                        }
                        className={`rounded-md border px-2.5 py-1 font-mono text-[11px] transition-colors ${
                          isTechActive
                            ? 'border-[#00F5D4] bg-[#00F5D4]/15 text-[#00F5D4]'
                            : 'border-white/10 bg-zinc-900/90 text-zinc-300 hover:border-white/30 hover:text-white'
                        }`}
                      >
                        {tech}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Card Actions */}
              <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-5">
                <button
                  type="button"
                  onClick={() => onInspectProject(project)}
                  className="inline-flex min-h-[40px] items-center gap-2 whitespace-nowrap rounded-xl bg-white/10 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#6366F1] hover:text-white"
                >
                  <Layers className="h-3.5 w-3.5 text-[#00F5D4]" />
                  <span>Inspect Architecture</span>
                </button>

                <div className="flex items-center gap-2">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex min-h-[40px] items-center gap-1.5 whitespace-nowrap rounded-xl border border-white/10 px-3.5 py-2 text-xs font-medium text-zinc-300 transition-colors hover:border-white/30 hover:text-white"
                    >
                      <GitHubIcon className="h-3.5 w-3.5" />
                      <span>Repository</span>
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex min-h-[40px] items-center gap-1.5 whitespace-nowrap rounded-xl border border-[#00F5D4]/30 px-3.5 py-2 text-xs font-medium text-[#00F5D4] transition-colors hover:bg-[#00F5D4]/15"
                    >
                      <span>Live</span>
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
