import { useEffect, useState } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  GitFork,
  Lock,
  Star,
  X,
} from 'lucide-react';
import { GitHubIcon } from './BrandIcons';
import { formatRelativeDate } from '../services/githubSync';
import type { Project } from '../types/portfolio';

interface ArchitectureModalProps {
  project: Project | null;
  onClose: () => void;
}

export function ArchitectureModal({ project, onClose }: ArchitectureModalProps) {
  const [selectedStageId, setSelectedStageId] = useState<string | null>(null);

  useEffect(() => {
    if (!project) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project, onClose]);

  if (!project) return null;

  const activeStage =
    project.flow.find((stage) => stage.id === selectedStageId) ?? project.flow[0];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="arch-modal-title"
      onClick={onClose}
    >
      <div
        className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl border border-white/15 bg-[#0A0A12] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.85)] sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Modal Header */}
        <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-5">
          <div>
            <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-zinc-400">
              <span
                className={
                  project.visibility === 'Private SaaS'
                    ? 'font-semibold text-[#EC4899]'
                    : 'font-semibold text-[#00F5D4]'
                }
              >
                {project.visibility}
              </span>
              <span aria-hidden="true">·</span>
              <span>{project.primaryCategory}</span>
              <span aria-hidden="true">·</span>
              <span>{project.language}</span>
              {project.visibility === 'Public Repo' && (
                <>
                  <span aria-hidden="true">·</span>
                  <span className="inline-flex items-center gap-1 tabular-nums">
                    <Star className="h-3.5 w-3.5 text-amber-300" />
                    {project.stars}
                  </span>
                  <span className="inline-flex items-center gap-1 tabular-nums">
                    <GitFork className="h-3.5 w-3.5" />
                    {project.forks}
                  </span>
                  <span>Updated {formatRelativeDate(project.updatedAt)}</span>
                </>
              )}
            </div>
            <h3
              id="arch-modal-title"
              className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl"
            >
              {project.title}
            </h3>
            <p className="mt-1 text-sm font-medium text-indigo-300">
              {project.subtitle}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close architecture inspector"
            className="inline-flex min-h-[40px] min-w-[40px] shrink-0 items-center justify-center rounded-xl border border-white/10 bg-zinc-900 text-zinc-300 transition-colors hover:border-white/30 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Problem & System Summary */}
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <div className="rounded-xl border border-white/10 bg-zinc-950/80 p-4">
            <h4 className="font-mono text-xs font-semibold text-zinc-400">
              Engineering Challenge
            </h4>
            <p className="mt-2 text-sm leading-relaxed text-zinc-300">
              {project.problem}
            </p>
          </div>
          <div className="rounded-xl border border-white/10 bg-zinc-950/80 p-4">
            <h4 className="font-mono text-xs font-semibold text-[#00F5D4]">
              System Architecture
            </h4>
            <p className="mt-2 text-sm leading-relaxed text-zinc-300">
              {project.architectureSummary}
            </p>
          </div>
        </div>

        {/* Interactive System Flow Pipeline */}
        <div className="mt-7">
          <div className="flex items-center justify-between">
            <h4 className="font-mono text-xs font-semibold text-zinc-300">
              Interactive Request &amp; Data Flow (Select any stage)
            </h4>
            <span className="font-mono text-[11px] text-zinc-500">
              Client → API → AI/Queue → Storage
            </span>
          </div>

          <div className="mt-3 flex flex-col items-stretch gap-2 md:flex-row md:items-center">
            {project.flow.map((stage, idx) => {
              const isSelected = activeStage?.id === stage.id;
              return (
                <div
                  key={stage.id}
                  className="flex flex-1 flex-col items-center gap-2 md:flex-row"
                >
                  <button
                    type="button"
                    onClick={() => setSelectedStageId(stage.id)}
                    className={`w-full flex-1 rounded-xl border p-3.5 text-left transition-colors ${
                      isSelected
                        ? 'border-[#00F5D4] bg-[#00F5D4]/12'
                        : 'border-white/10 bg-zinc-900/70 hover:border-white/25'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono text-[11px] text-[#00F5D4]">
                        0{idx + 1}. {stage.layer}
                      </span>
                      {stage.metric && (
                        <span className="font-mono text-[10px] text-zinc-400 tabular-nums">
                          {stage.metric}
                        </span>
                      )}
                    </div>
                    <div className="mt-1 text-sm font-semibold text-white">
                      {stage.title}
                    </div>
                    <div className="mt-1 font-mono text-[11px] text-zinc-400">
                      {stage.tech}
                    </div>
                  </button>
                  {idx < project.flow.length - 1 && (
                    <ArrowRight className="hidden h-4 w-4 shrink-0 text-zinc-500 md:block" />
                  )}
                </div>
              );
            })}
          </div>

          {/* Selected Stage Detail Panel */}
          {activeStage && (
            <div className="mt-3 rounded-xl border border-[#6366F1]/35 bg-[#6366F1]/10 p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="font-mono text-xs font-semibold text-indigo-200">
                  {activeStage.layer} — {activeStage.title}
                </span>
                <span className="font-mono text-xs text-[#00F5D4]">
                  {activeStage.tech}
                </span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-zinc-200">
                {activeStage.detail}
              </p>
            </div>
          )}
        </div>

        {/* Engineering Highlights */}
        <div className="mt-7">
          <h4 className="font-mono text-xs font-semibold text-zinc-400">
            Key Engineering Highlights
          </h4>
          <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
            {project.highlights.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2.5 rounded-xl border border-white/10 bg-zinc-950/60 p-3 text-sm text-zinc-300"
              >
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#00F5D4]" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Footer Actions */}
        <div className="mt-7 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-5">
          <div className="flex flex-wrap gap-2 font-mono text-xs text-zinc-400">
            {project.techStack.map((tech, idx) => (
              <span key={tech}>
                {tech}
                {idx < project.techStack.length - 1 ? ' · ' : ''}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-3">
            {project.visibility === 'Private SaaS' && !project.githubUrl && (
              <span className="inline-flex items-center gap-1.5 font-mono text-xs text-zinc-400">
                <Lock className="h-3.5 w-3.5 text-[#EC4899]" />
                <span>Private SaaS Codebase</span>
              </span>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-[40px] items-center gap-2 whitespace-nowrap rounded-xl border border-white/15 bg-zinc-900 px-4 py-2 text-xs font-semibold text-white transition-colors hover:border-white/35"
              >
                <GitHubIcon className="h-3.5 w-3.5" />
                <span>View Source on GitHub</span>
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-[40px] items-center gap-2 whitespace-nowrap rounded-xl bg-[#00F5D4] px-4 py-2 text-xs font-semibold text-zinc-950 transition-colors hover:bg-[#34FFE3]"
              >
                <span>Open Live Deployment</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
