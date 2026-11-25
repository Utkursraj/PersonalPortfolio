import { useMemo, useState } from 'react';
import {
  ArrowUpRight,
  Check,
  Copy,
  Mail,
  MapPin,
  Send,
} from 'lucide-react';
import { GitHubIcon, LinkedInIcon } from './BrandIcons';
import {
  CONTACT_EMAIL,
  GITHUB_PROFILE_URL,
  LINKEDIN_PROFILE_URL,
} from '../data/projects';

interface ContactTerminalProps {
  onCopyEmail: () => void;
  emailCopied: boolean;
}

const INQUIRY_TYPES = [
  'Full-Time Software Engineer',
  'Backend / AI Systems Role',
  'Freelance / Product Build',
  'Technical Collaboration',
] as const;

export function ContactTerminal({
  onCopyEmail,
  emailCopied,
}: ContactTerminalProps) {
  const [inquiryType, setInquiryType] = useState<string>(INQUIRY_TYPES[0]);
  const [senderName, setSenderName] = useState('');
  const [message, setMessage] = useState('');

  const mailtoHref = useMemo(() => {
    const subject = encodeURIComponent(
      `[${inquiryType}] Inquiry from ${senderName.trim() || 'Portfolio Visitor'}`
    );
    const bodyText =
      message.trim() ||
      `Hi Utkurs,\n\nI reviewed your portfolio and would like to connect regarding ${inquiryType.toLowerCase()}.`;
    const body = encodeURIComponent(bodyText);
    return `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
  }, [inquiryType, senderName, message]);

  return (
    <section
      id="contact"
      className="relative z-10 mx-auto max-w-7xl px-4 pt-20 pb-28 sm:px-6 lg:px-8"
    >
      <div className="rounded-2xl border border-white/12 bg-[#0B0B12]/94 p-6 shadow-2xl sm:p-10">
        <div className="grid gap-10 lg:grid-cols-12">
          {/* Left Direct Info Column */}
          <div className="flex flex-col justify-between lg:col-span-5">
            <div>
              <p className="font-mono text-xs font-medium text-[#00F5D4]">
                04. Direct Contact &amp; Hire
              </p>
              <h2
                className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl"
                style={{ textWrap: 'balance' }}
              >
                Let&apos;s engineer resilient, high-impact software.
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-zinc-400 sm:text-base">
                Open to Full-Stack, Backend, and AI-Native Software Engineer roles,
                founding engineering teams, and selective product builds.
              </p>

              <div className="mt-7 space-y-3">
                <div className="flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={onCopyEmail}
                    className="inline-flex min-h-[44px] items-center gap-2 whitespace-nowrap rounded-xl bg-[#00F5D4] px-5 py-2.5 text-sm font-semibold text-zinc-950 transition-colors hover:bg-[#34FFE3]"
                  >
                    {emailCopied ? (
                      <>
                        <Check className="h-4 w-4" />
                        <span>Copied {CONTACT_EMAIL}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4" />
                        <span>Copy {CONTACT_EMAIL}</span>
                      </>
                    )}
                  </button>

                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="inline-flex min-h-[44px] items-center gap-2 whitespace-nowrap rounded-xl border border-white/15 bg-zinc-900 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:border-white/35"
                  >
                    <Mail className="h-4 w-4 text-[#00F5D4]" />
                    <span>Open Mail App</span>
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-5 border-t border-white/10 pt-6 text-sm text-zinc-400">
              <a
                href={GITHUB_PROFILE_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 transition-colors hover:text-white"
              >
                <GitHubIcon className="h-4 w-4" />
                <span>GitHub (@Utkursraj)</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
              <a
                href={LINKEDIN_PROFILE_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 transition-colors hover:text-[#00F5D4]"
              >
                <LinkedInIcon className="h-4 w-4" />
                <span>LinkedIn</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
              <span className="inline-flex items-center gap-1.5 text-zinc-400">
                <MapPin className="h-4 w-4 text-indigo-400" />
                <span>Patna, India</span>
              </span>
            </div>
          </div>

          {/* Right Interactive Mailto Composer */}
          <div className="rounded-xl border border-white/10 bg-[#07070D] p-5 sm:p-6 lg:col-span-7">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="font-mono text-xs font-medium text-zinc-300">
                Direct Message Composer
              </span>
              <span className="font-mono text-[11px] text-zinc-500">
                mailto:{CONTACT_EMAIL}
              </span>
            </div>

            <div className="mt-4 space-y-4">
              <div>
                <span className="block font-mono text-xs text-zinc-400">
                  Inquiry Context
                </span>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {INQUIRY_TYPES.map((type) => {
                    const active = inquiryType === type;
                    return (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setInquiryType(type)}
                        className={`min-h-[34px] rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors ${
                          active
                            ? 'border-[#6366F1] bg-[#6366F1]/20 text-indigo-200'
                            : 'border-white/10 bg-zinc-900/70 text-zinc-400 hover:border-white/25 hover:text-zinc-200'
                        }`}
                      >
                        {type}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label
                  htmlFor="contact-name"
                  className="block font-mono text-xs text-zinc-400"
                >
                  Your Name / Team
                </label>
                <input
                  id="contact-name"
                  type="text"
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  placeholder="e.g., Priya Sharma — Engineering Lead"
                  className="mt-1.5 w-full rounded-xl border border-white/10 bg-zinc-950 px-3.5 py-2.5 text-sm text-white placeholder-zinc-600 focus:border-[#00F5D4] focus:outline-none"
                />
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  className="block font-mono text-xs text-zinc-400"
                >
                  Brief Note
                </label>
                <textarea
                  id="contact-message"
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Share role details, project architecture scope, or timeline..."
                  className="mt-1.5 w-full resize-none rounded-xl border border-white/10 bg-zinc-950 px-3.5 py-2.5 text-sm text-white placeholder-zinc-600 focus:border-[#00F5D4] focus:outline-none"
                />
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                <span className="font-mono text-[11px] text-zinc-500">
                  Launches your default mail client with pre-filled context
                </span>
                <a
                  href={mailtoHref}
                  className="inline-flex min-h-[42px] items-center gap-2 whitespace-nowrap rounded-xl bg-[#6366F1] px-5 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-indigo-500"
                >
                  <Send className="h-3.5 w-3.5" />
                  <span>Compose Email</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quiet Editorial Footer */}
      <footer className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-zinc-500 sm:flex-row">
        <span>© {new Date().getFullYear()} Utkurs Raj · B.Tech ECE &apos;24</span>
        <span>Built with React, TypeScript, Tailwind CSS &amp; Three.js</span>
      </footer>
    </section>
  );
}
