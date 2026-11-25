import { ArrowDownRight, Command, Move3d } from 'lucide-react';
import { GitHubIcon } from './BrandIcons';
import { GITHUB_PROFILE_URL } from '../data/projects';

interface HeroSectionProps {
  totalPublicRepos: number;
  syncSource: 'live' | 'cached' | 'fallback';
  onExploreWork: () => void;
  onOpenCommand: () => void;
}

export function HeroSection({
  totalPublicRepos,
  syncSource,
  onExploreWork,
  onOpenCommand,
}: HeroSectionProps) {
  return (
    <section
      id="hero"
      className="pointer-events-none relative z-10 flex min-h-screen flex-col justify-between px-4 pt-24 pb-24 sm:px-6 lg:px-8"
    >
      <div className="mx-auto grid w-full max-w-7xl flex-1 items-center gap-10 lg:grid-cols-12">
        {/* Left Editorial Column */}
        <div className="pointer-events-auto lg:col-span-7">
          <div className="mb-5 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs text-zinc-400">
            <span className="font-medium text-[#00F5D4]">B.Tech ECE &apos;24</span>
            <span aria-hidden="true">·</span>
            <span>Full-Stack &amp; AI Systems</span>
            <span aria-hidden="true">·</span>
            <span className="tabular-nums">
              {totalPublicRepos} GitHub Repos ({syncSource === 'fallback' ? 'Curated' : 'Synced'})
            </span>
          </div>

          <h1
            className="max-w-3xl text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-[3.65rem] lg:leading-[1.08]"
            style={{ textWrap: 'balance' }}
          >
            Utkurs Raj — Engineering AI-Native Systems &amp; Spatial Web Experiences.
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-relaxed text-zinc-300 sm:text-lg">
            B.Tech in Electronics &amp; Communication Engineering (2024). I architect
            production software across TypeScript, Node.js, and Python—spanning
            Three.js spatial interfaces, BullMQ distributed backends, and
            catalog-grounded Gemini AI products.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3.5">
            <button
              type="button"
              onClick={onExploreWork}
              className="inline-flex min-h-[44px] items-center gap-2 whitespace-nowrap rounded-xl bg-[#00F5D4] px-6 py-3 text-sm font-semibold text-zinc-950 transition-transform duration-200 hover:-translate-y-0.5 hover:bg-[#34FFE3] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00F5D4]"
            >
              <span>Explore Flagship Systems</span>
              <ArrowDownRight className="h-4 w-4" />
            </button>

            <a
              href={GITHUB_PROFILE_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-[44px] items-center gap-2 whitespace-nowrap rounded-xl border border-white/15 bg-[#0C0C14]/90 px-5 py-3 text-sm font-medium text-zinc-100 transition-colors hover:border-white/35 hover:bg-zinc-900"
            >
              <GitHubIcon className="h-4 w-4 text-zinc-300" />
              <span>GitHub (@Utkursraj)</span>
            </a>

            <button
              type="button"
              onClick={onOpenCommand}
              className="inline-flex min-h-[44px] items-center gap-2 whitespace-nowrap rounded-xl border border-[#6366F1]/40 bg-[#6366F1]/12 px-4 py-3 font-mono text-xs font-medium text-indigo-200 transition-colors hover:border-[#6366F1]/80 hover:bg-[#6366F1]/20"
            >
              <Command className="h-3.5 w-3.5 text-[#00F5D4]" />
              <span>Architecture Console</span>
              <span className="text-zinc-400">⌘K</span>
            </button>
          </div>
        </div>

        {/* Right Open Spatial Viewport Window (pointer-events-none lets mouse drag orbit the 3D WebGL core) */}
        <div className="hidden min-h-[380px] flex-col items-end justify-end lg:col-span-5 lg:flex">
          <div className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-[#09090F]/80 px-3 py-1.5 font-mono text-[11px] text-zinc-400">
            <Move3d className="h-3.5 w-3.5 text-[#00F5D4]" />
            <span>Interactive 3D Core · Drag to orbit</span>
          </div>
        </div>
      </div>

      {/* Full-width Quantitative Telemetry Strip below split */}
      <div className="pointer-events-auto mx-auto mt-10 grid w-full max-w-7xl grid-cols-2 gap-3 border-t border-white/10 pt-6 sm:grid-cols-4">
        <div className="rounded-xl border border-white/10 bg-[#0B0B12]/88 px-4 py-3.5">
          <div className="font-mono text-xs text-zinc-400">Flagship Systems</div>
          <div className="mt-1 font-mono text-xl font-semibold text-white tabular-nums">
            06 Curated
          </div>
        </div>
        <div className="rounded-xl border border-white/10 bg-[#0B0B12]/88 px-4 py-3.5">
          <div className="font-mono text-xs text-zinc-400">Live GitHub Telemetry</div>
          <div className="mt-1 font-mono text-xl font-semibold text-[#00F5D4] tabular-nums">
            {totalPublicRepos} Public Repos
          </div>
        </div>
        <div className="rounded-xl border border-white/10 bg-[#0B0B12]/88 px-4 py-3.5">
          <div className="font-mono text-xs text-zinc-400">Core Engineering</div>
          <div className="mt-1 font-mono text-sm font-semibold text-zinc-100 sm:text-base">
            TS · Node · Python · 3D
          </div>
        </div>
        <div className="rounded-xl border border-white/10 bg-[#0B0B12]/88 px-4 py-3.5">
          <div className="font-mono text-xs text-zinc-400">Academic Foundation</div>
          <div className="mt-1 font-mono text-xl font-semibold text-white tabular-nums">
            ECE &apos;24
          </div>
        </div>
      </div>
    </section>
  );
}
