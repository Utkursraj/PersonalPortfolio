import { ChevronDown, ChevronUp, Command, Cpu, Sparkles } from 'lucide-react';
import type { QualityMode, SectionId } from '../types/portfolio';

interface StageDockProps {
  activeSection: SectionId;
  qualityMode: QualityMode;
  collapsed: boolean;
  onToggleCollapse: () => void;
  onToggleQuality: () => void;
  onSelectSection: (section: SectionId, selector: string) => void;
  onOpenCommand: () => void;
}

const SECTION_CONTROLS: Array<{ id: SectionId; label: string; selector: string }> = [
  { id: 'hero', label: 'Core', selector: '#hero' },
  { id: 'work', label: 'Work', selector: '#work' },
  { id: 'architecture', label: 'Stack', selector: '#architecture' },
  { id: 'contact', label: 'Contact', selector: '#contact' },
];

export function StageDock({
  activeSection,
  qualityMode,
  collapsed,
  onToggleCollapse,
  onToggleQuality,
  onSelectSection,
  onOpenCommand,
}: StageDockProps) {
  return (
    <div className="pointer-events-none fixed bottom-4 left-1/2 z-30 flex -translate-x-1/2 flex-col items-center">
      <button
        type="button"
        onClick={onToggleCollapse}
        aria-label={collapsed ? 'Show 3D Stage Controls' : 'Hide 3D Stage Controls'}
        className="pointer-events-auto mb-1.5 inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border border-white/15 bg-[#09090F]/92 px-3 py-1 font-mono text-[11px] font-medium text-zinc-300 shadow-lg transition-colors hover:border-[#00F5D4]/50 hover:text-white"
      >
        {collapsed ? (
          <>
            <ChevronUp className="h-3 w-3 text-[#00F5D4]" />
            <span>Show 3D Controls</span>
          </>
        ) : (
          <>
            <ChevronDown className="h-3 w-3 text-zinc-400" />
            <span>Hide Controls</span>
          </>
        )}
      </button>

      {!collapsed && (
        <div className="pointer-events-auto flex max-w-[94vw] items-center gap-2 overflow-x-auto rounded-2xl border border-white/12 bg-[#09090F]/95 px-2.5 py-2 shadow-[0_12px_40px_rgba(0,0,0,0.75)]">
          {/* 3D FX Toggle */}
          <button
            type="button"
            onClick={onToggleQuality}
            className={`inline-flex min-h-[36px] shrink-0 items-center gap-1.5 whitespace-nowrap rounded-xl border px-3 py-1.5 font-mono text-xs font-medium transition-colors ${
              qualityMode === 'high'
                ? 'border-[#6366F1]/50 bg-[#6366F1]/15 text-indigo-200 hover:bg-[#6366F1]/25'
                : 'border-white/15 bg-zinc-900 text-zinc-300 hover:border-white/30'
            }`}
          >
            {qualityMode === 'high' ? (
              <Sparkles className="h-3.5 w-3.5 text-[#00F5D4]" />
            ) : (
              <Cpu className="h-3.5 w-3.5 text-zinc-400" />
            )}
            <span>3D FX: {qualityMode === 'high' ? 'High' : 'Eco'}</span>
          </button>

          <span aria-hidden="true" className="h-5 w-px shrink-0 bg-white/10" />

          {/* Section Camera Choreography Switcher */}
          <div className="flex shrink-0 items-center gap-1">
            {SECTION_CONTROLS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onSelectSection(item.id, item.selector)}
                  className={`min-h-[36px] shrink-0 whitespace-nowrap rounded-xl px-3 py-1.5 text-xs font-medium transition-colors ${
                    isActive
                      ? 'bg-[#00F5D4] font-semibold text-zinc-950'
                      : 'text-zinc-400 hover:bg-white/5 hover:text-zinc-100'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          <span aria-hidden="true" className="hidden h-5 w-px shrink-0 bg-white/10 sm:block" />

          {/* Command Palette Trigger */}
          <button
            type="button"
            onClick={onOpenCommand}
            className="hidden min-h-[36px] shrink-0 items-center gap-1.5 whitespace-nowrap rounded-xl border border-white/10 bg-zinc-900 px-3 py-1.5 font-mono text-xs text-zinc-300 transition-colors hover:border-[#00F5D4]/40 hover:text-white sm:inline-flex"
          >
            <Command className="h-3.5 w-3.5 text-[#00F5D4]" />
            <span>K</span>
          </button>
        </div>
      )}
    </div>
  );
}
