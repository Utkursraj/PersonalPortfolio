import { useCallback, useEffect, useRef, useState } from 'react';
import { Check } from 'lucide-react';
import { ArchitectureModal } from './components/ArchitectureModal';
import { CommandConsole } from './components/CommandConsole';
import { ContactTerminal } from './components/ContactTerminal';
import { FlagshipShowcase } from './components/FlagshipShowcase';
import { GitHubFeed } from './components/GitHubFeed';
import { HeroSection } from './components/HeroSection';
import { Navbar } from './components/Navbar';
import { StageDock } from './components/StageDock';
import { TechMatrix } from './components/TechMatrix';
import { CONTACT_EMAIL, FLAGSHIP_PROJECTS } from './data/projects';
import { fetchSyncedPortfolio } from './services/githubSync';
import { PortfolioScene } from './three/PortfolioScene';
import type {
  Project,
  ProjectCategory,
  QualityMode,
  SectionId,
  SyncedPortfolioData,
} from './types/portfolio';

export default function App() {
  const canvasMountRef = useRef<HTMLDivElement | null>(null);
  const sceneRef = useRef<PortfolioScene | null>(null);

  const [activeSection, setActiveSection] = useState<SectionId>('hero');
  const [qualityMode, setQualityMode] = useState<QualityMode>('high');
  const [dockCollapsed, setDockCollapsed] = useState(false);

  const [portfolioData, setPortfolioData] = useState<SyncedPortfolioData>({
    flagships: FLAGSHIP_PROJECTS,
    publicFeed: [],
    archivedRepos: [],
    totalPublicCount: 16,
    syncSource: 'fallback',
    lastSyncedAt: new Date().toISOString(),
  });
  const [isRefreshingGithub, setIsRefreshingGithub] = useState(false);

  const [selectedCategory, setSelectedCategory] =
    useState<ProjectCategory>('All Flagships');
  const [activeSkillKey, setActiveSkillKey] = useState<string | null>(null);
  const [activeSkillLabel, setActiveSkillLabel] = useState<string | null>(null);

  const [inspectedProject, setInspectedProject] = useState<Project | null>(null);
  const [commandOpen, setCommandOpen] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);

  // 1. Mount Three.js WebGL Stage once on dedicated isolated container
  useEffect(() => {
    const mountEl = canvasMountRef.current;
    if (!mountEl) return;

    const sceneController = new PortfolioScene(mountEl, 'high');
    sceneRef.current = sceneController;

    return () => {
      sceneController.dispose();
      sceneRef.current = null;
    };
  }, []);

  // 2. Sync section choreography & quality mode to Three.js controller
  useEffect(() => {
    sceneRef.current?.setSection(activeSection);
  }, [activeSection]);

  useEffect(() => {
    sceneRef.current?.setQualityMode(qualityMode);
  }, [qualityMode]);

  // 3. Observe sections on scroll to drive smooth 3D camera choreography
  useEffect(() => {
    const sections: Array<{ id: SectionId; selector: string }> = [
      { id: 'hero', selector: '#hero' },
      { id: 'work', selector: '#work' },
      { id: 'architecture', selector: '#architecture' },
      { id: 'contact', selector: '#contact' },
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        let bestEntry: IntersectionObserverEntry | null = null;
        for (const entry of entries) {
          if (
            entry.isIntersecting &&
            (!bestEntry || entry.intersectionRatio > bestEntry.intersectionRatio)
          ) {
            bestEntry = entry;
          }
        }
        if (bestEntry) {
          const matched = sections.find(
            (s) => s.selector === `#${bestEntry?.target.id}`
          );
          if (matched) {
            setActiveSection(matched.id);
          }
        }
      },
      {
        threshold: [0.25, 0.5, 0.75],
        rootMargin: '-10% 0px -20% 0px',
      }
    );

    for (const s of sections) {
      const el = document.querySelector(s.selector);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, []);

  // 4. Live GitHub Sync on load and manual refresh
  useEffect(() => {
    let cancelled = false;
    void fetchSyncedPortfolio(false).then((data) => {
      if (!cancelled) {
        setPortfolioData(data);
      }
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const handleRefreshGithub = useCallback(async () => {
    setIsRefreshingGithub(true);
    const data = await fetchSyncedPortfolio(true);
    setPortfolioData(data);
    setIsRefreshingGithub(false);
  }, []);

  // 5. Global Keyboard Shortcuts (Cmd/Ctrl+K for Architecture Console, H for HUD dock toggle)
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setCommandOpen((prev) => !prev);
        return;
      }

      const target = e.target as HTMLElement | null;
      const isTyping =
        target?.tagName === 'INPUT' ||
        target?.tagName === 'TEXTAREA' ||
        target?.isContentEditable;

      if (!isTyping && !commandOpen && !inspectedProject && e.key.toLowerCase() === 'h') {
        setDockCollapsed((prev) => !prev);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [commandOpen, inspectedProject]);

  const handleCopyEmail = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = CONTACT_EMAIL;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    }
    setEmailCopied(true);
    window.setTimeout(() => setEmailCopied(false), 2600);
  }, []);

  const handleSelectSkill = useCallback(
    (skillKey: string | null, skillLabel: string | null) => {
      setActiveSkillKey(skillKey);
      setActiveSkillLabel(skillLabel);
    },
    []
  );

  const handleNavigateSection = useCallback(
    (section: SectionId, selector?: string) => {
      setActiveSection(section);
      if (selector) {
        document.querySelector(selector)?.scrollIntoView({ behavior: 'smooth' });
      }
    },
    []
  );

  return (
    <div className="relative min-h-screen bg-[#06060A] text-zinc-100">
      {/* Dedicated Isolated WebGL Viewport Canvas */}
      <div
        ref={canvasMountRef}
        aria-hidden="true"
        className="fixed inset-0 z-0"
      />

      {/* Measured contrast scrim so foreground typography stays razor-sharp */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[1] bg-[radial-gradient(circle_at_75%_35%,transparent_12%,rgba(6,6,10,0.62)_68%,rgba(6,6,10,0.88)_100%)]"
      />

      <Navbar
        activeSection={activeSection}
        onNavigate={(section) => handleNavigateSection(section)}
        onCopyEmail={handleCopyEmail}
        emailCopied={emailCopied}
      />

      <main className="relative z-10">
        <HeroSection
          totalPublicRepos={portfolioData.totalPublicCount}
          syncSource={portfolioData.syncSource}
          onExploreWork={() => handleNavigateSection('work', '#work')}
          onOpenCommand={() => setCommandOpen(true)}
        />

        <FlagshipShowcase
          projects={portfolioData.flagships}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          activeSkillKey={activeSkillKey}
          activeSkillLabel={activeSkillLabel}
          onSelectSkill={handleSelectSkill}
          onInspectProject={setInspectedProject}
        />

        <TechMatrix
          activeSkillKey={activeSkillKey}
          activeSkillLabel={activeSkillLabel}
          onSelectSkill={handleSelectSkill}
          flagshipProjects={portfolioData.flagships}
          publicRepos={portfolioData.publicFeed}
          onInspectProject={setInspectedProject}
        />

        <GitHubFeed
          publicFeed={portfolioData.publicFeed}
          archivedRepos={portfolioData.archivedRepos}
          syncSource={portfolioData.syncSource}
          isRefreshing={isRefreshingGithub}
          onRefresh={() => void handleRefreshGithub()}
          activeSkillKey={activeSkillKey}
        />

        <ContactTerminal
          onCopyEmail={handleCopyEmail}
          emailCopied={emailCopied}
        />
      </main>

      <StageDock
        activeSection={activeSection}
        qualityMode={qualityMode}
        collapsed={dockCollapsed}
        onToggleCollapse={() => setDockCollapsed((prev) => !prev)}
        onToggleQuality={() =>
          setQualityMode((prev) => (prev === 'high' ? 'eco' : 'high'))
        }
        onSelectSection={(section, selector) =>
          handleNavigateSection(section, selector)
        }
        onOpenCommand={() => setCommandOpen(true)}
      />

      {inspectedProject && (
        <ArchitectureModal
          key={inspectedProject.id}
          project={inspectedProject}
          onClose={() => setInspectedProject(null)}
        />
      )}

      {commandOpen && (
        <CommandConsole
          open={commandOpen}
          onClose={() => setCommandOpen(false)}
          flagships={portfolioData.flagships}
          publicRepos={portfolioData.publicFeed}
          onInspectProject={setInspectedProject}
          onSelectSkill={(key, label) => handleSelectSkill(key, label)}
        />
      )}

      {/* Clipboard Toast Confirmation */}
      {emailCopied && (
        <div
          role="status"
          aria-live="polite"
          className="fixed right-5 bottom-20 z-50 inline-flex items-center gap-2 rounded-xl border border-[#00F5D4]/40 bg-[#0A0A12] px-4 py-2.5 text-xs font-medium text-white shadow-2xl"
        >
          <Check className="h-4 w-4 text-[#00F5D4]" />
          <span>Copied {CONTACT_EMAIL} to clipboard</span>
        </div>
      )}
    </div>
  );
}
