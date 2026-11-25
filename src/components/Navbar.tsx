import { useState } from 'react';
import { Check, Copy, Menu, X } from 'lucide-react';
import { CONTACT_EMAIL } from '../data/projects';
import type { SectionId } from '../types/portfolio';

interface NavbarProps {
  activeSection: SectionId;
  onNavigate: (section: SectionId) => void;
  onCopyEmail: () => void;
  emailCopied: boolean;
}

const NAV_LINKS: Array<{ label: string; href: string; section: SectionId }> = [
  { label: 'Work', href: '#work', section: 'work' },
  { label: 'Architecture', href: '#architecture', section: 'architecture' },
  { label: 'GitHub Live', href: '#github-live', section: 'work' },
  { label: 'Contact', href: '#contact', section: 'contact' },
];

export function Navbar({
  activeSection,
  onNavigate,
  onCopyEmail,
  emailCopied,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLinkClick = (section: SectionId, href: string) => {
    setMobileMenuOpen(false);
    onNavigate(section);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 border-b border-white/10 bg-[#06060A]/90">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-8 px-4 py-3.5 sm:px-6 lg:px-8">
        {/* Zone 1: Single-element brand wordmark */}
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            handleLinkClick('hero', '#hero');
          }}
          className="shrink-0 whitespace-nowrap font-mono text-sm font-semibold tracking-wider text-white transition-colors hover:text-[#00F5D4]"
        >
          UR // DEV
        </a>

        {/* Zone 2: 4 single-line nav links */}
        <nav
          aria-label="Primary Navigation"
          className="hidden items-center gap-7 md:flex"
        >
          {NAV_LINKS.map((link) => {
            const isActive =
              (link.href === '#github-live' ? false : activeSection === link.section);
            return (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link.section, link.href);
                }}
                className={`shrink-0 whitespace-nowrap text-sm font-medium transition-colors ${
                  isActive
                    ? 'text-[#00F5D4] underline decoration-[#00F5D4]/60 underline-offset-8'
                    : 'text-zinc-300 hover:text-white hover:underline hover:decoration-white/30 hover:underline-offset-8'
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={onCopyEmail}
            title={`Copy ${CONTACT_EMAIL}`}
            className="inline-flex min-h-[40px] shrink-0 items-center gap-2 whitespace-nowrap rounded-lg border border-[#00F5D4]/40 bg-[#00F5D4]/10 px-4 py-2 text-xs font-semibold text-[#00F5D4] transition-colors hover:bg-[#00F5D4] hover:text-zinc-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00F5D4]"
          >
            {emailCopied ? (
              <>
                <Check className="h-3.5 w-3.5" />
                <span>Copied Email</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" />
                <span>Copy Email</span>
              </>
            )}
          </button>

          <button
            type="button"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="inline-flex min-h-[40px] min-w-[40px] items-center justify-center rounded-lg border border-white/10 bg-zinc-900/80 text-zinc-200 transition-colors hover:border-white/25 md:hidden"
          >
            {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile navigation drawer */}
      {mobileMenuOpen && (
        <div className="border-t border-white/10 bg-[#09090F] px-4 py-3 md:hidden">
          <div className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link.section, link.href);
                }}
                className="min-h-[44px] rounded-lg px-3 py-2.5 text-sm font-medium text-zinc-200 transition-colors hover:bg-white/5 hover:text-[#00F5D4]"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
