import type { DiagramType } from '../types/portfolio';

interface ArchitectureSvgProps {
  type: DiagramType;
}

export function ArchitectureSvg({ type }: ArchitectureSvgProps) {
  switch (type) {
    case 'thumbcraft':
      return (
        <svg
          viewBox="0 0 420 132"
          className="h-32 w-full rounded-xl border border-white/10 bg-[#07070D]"
          role="img"
          aria-label="ThumbCraft AI System Architecture Diagram"
        >
          <defs>
            <linearGradient id="tc-grad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#00F5D4" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#6366F1" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#EC4899" stopOpacity="0.9" />
            </linearGradient>
          </defs>
          <path d="M98 66 H132 M214 66 H246 M326 44 H346 M326 88 H346" stroke="url(#tc-grad)" strokeWidth="1.5" strokeDasharray="3 3" fill="none" />
          <rect x="14" y="34" width="84" height="64" rx="8" fill="#10111A" stroke="#00F5D4" strokeOpacity="0.45" />
          <text x="56" y="58" textAnchor="middle" fill="#E4E4E7" fontSize="10" fontWeight="600">Canvas 2D</text>
          <text x="56" y="73" textAnchor="middle" fill="#A1A1AA" fontSize="8">3D Text + Rim</text>
          <text x="56" y="85" textAnchor="middle" fill="#00F5D4" fontSize="8">60fps Preview</text>

          <rect x="132" y="34" width="82" height="64" rx="8" fill="#10111A" stroke="#6366F1" strokeOpacity="0.5" />
          <text x="173" y="58" textAnchor="middle" fill="#E4E4E7" fontSize="10" fontWeight="600">Feed Sim</text>
          <text x="173" y="73" textAnchor="middle" fill="#A1A1AA" fontSize="8">Desktop / Shorts</text>
          <text x="173" y="85" textAnchor="middle" fill="#818CF8" fontSize="8">Live Viewport</text>

          <rect x="246" y="22" width="80" height="40" rx="7" fill="#10111A" stroke="#EC4899" strokeOpacity="0.55" />
          <text x="286" y="40" textAnchor="middle" fill="#E4E4E7" fontSize="9.5" fontWeight="600">Gemini CTR</text>
          <text x="286" y="53" textAnchor="middle" fill="#F472B6" fontSize="8">Vision Audit</text>

          <rect x="246" y="70" width="80" height="40" rx="7" fill="#10111A" stroke="#3F3F46" />
          <text x="286" y="88" textAnchor="middle" fill="#E4E4E7" fontSize="9.5" fontWeight="600">Razorpay</text>
          <text x="286" y="101" textAnchor="middle" fill="#A1A1AA" fontSize="8">Credit Ledger</text>

          <rect x="346" y="32" width="60" height="68" rx="8" fill="#10111A" stroke="#52525B" />
          <text x="376" y="62" textAnchor="middle" fill="#E4E4E7" fontSize="9.5" fontWeight="600">Firebase</text>
          <text x="376" y="75" textAnchor="middle" fill="#A1A1AA" fontSize="8">Auth & DB</text>
        </svg>
      );

    case 'stockledger':
      return (
        <svg
          viewBox="0 0 420 132"
          className="h-32 w-full rounded-xl border border-white/10 bg-[#07070D]"
          role="img"
          aria-label="StockLedger OS System Architecture Diagram"
        >
          <path d="M110 66 H140 M232 66 H262 M340 44 H358 M340 88 H358" stroke="#00F5D4" strokeOpacity="0.65" strokeWidth="1.5" fill="none" />
          <rect x="14" y="28" width="96" height="76" rx="8" fill="#10111A" stroke="#00F5D4" strokeOpacity="0.5" />
          <polygon points="62,42 82,52 62,62 42,52" fill="none" stroke="#00F5D4" strokeWidth="1.2" />
          <polygon points="42,52 62,62 62,78 42,68" fill="#00F5D4" fillOpacity="0.12" stroke="#00F5D4" strokeWidth="1" />
          <polygon points="82,52 62,62 62,78 82,68" fill="#6366F1" fillOpacity="0.15" stroke="#6366F1" strokeWidth="1" />
          <text x="62" y="94" textAnchor="middle" fill="#E4E4E7" fontSize="9" fontWeight="600">3D Warehouse Twin</text>

          <rect x="140" y="34" width="92" height="64" rx="8" fill="#10111A" stroke="#EC4899" strokeOpacity="0.45" />
          <text x="186" y="58" textAnchor="middle" fill="#E4E4E7" fontSize="9.5" fontWeight="600">Gemini OCR</text>
          <text x="186" y="72" textAnchor="middle" fill="#A1A1AA" fontSize="8">GST Invoice Scan</text>
          <text x="186" y="84" textAnchor="middle" fill="#F472B6" fontSize="8">HSN + Tax Split</text>

          <rect x="262" y="22" width="78" height="40" rx="7" fill="#10111A" stroke="#6366F1" strokeOpacity="0.55" />
          <text x="301" y="40" textAnchor="middle" fill="#E4E4E7" fontSize="9.5" fontWeight="600">Burn Engine</text>
          <text x="301" y="53" textAnchor="middle" fill="#818CF8" fontSize="8">14d Forecast</text>

          <rect x="262" y="70" width="78" height="40" rx="7" fill="#10111A" stroke="#3F3F46" />
          <text x="301" y="88" textAnchor="middle" fill="#E4E4E7" fontSize="9.5" fontWeight="600">SheetJS</text>
          <text x="301" y="101" textAnchor="middle" fill="#A1A1AA" fontSize="8">4-Sheet XLSX</text>

          <rect x="358" y="32" width="48" height="68" rx="8" fill="#10111A" stroke="#52525B" />
          <text x="382" y="64" textAnchor="middle" fill="#E4E4E7" fontSize="9" fontWeight="600">SQL</text>
          <text x="382" y="77" textAnchor="middle" fill="#A1A1AA" fontSize="8">Ledger</text>
        </svg>
      );

    case 'aetheria':
      return (
        <svg
          viewBox="0 0 420 132"
          className="h-32 w-full rounded-xl border border-white/10 bg-[#07070D]"
          role="img"
          aria-label="AETHERIA Spatial Architecture Diagram"
        >
          <circle cx="100" cy="66" r="42" fill="none" stroke="#6366F1" strokeOpacity="0.45" strokeWidth="1.2" />
          <ellipse cx="100" cy="66" rx="52" ry="18" transform="rotate(-18 100 66)" fill="none" stroke="#00F5D4" strokeOpacity="0.7" strokeWidth="1.3" />
          <ellipse cx="100" cy="66" rx="46" ry="16" transform="rotate(24 100 66)" fill="none" stroke="#EC4899" strokeOpacity="0.5" strokeWidth="1.1" />
          <circle cx="100" cy="66" r="6" fill="#00F5D4" />

          <path d="M158 66 H190" stroke="#6366F1" strokeWidth="1.5" strokeDasharray="3 3" />
          <rect x="190" y="26" width="98" height="80" rx="8" fill="#10111A" stroke="#6366F1" strokeOpacity="0.45" />
          <text x="239" y="54" textAnchor="middle" fill="#E4E4E7" fontSize="10" fontWeight="600">TypeScript UI</text>
          <text x="239" y="69" textAnchor="middle" fill="#A1A1AA" fontSize="8">Component Graph</text>
          <text x="239" y="84" textAnchor="middle" fill="#00F5D4" fontSize="8">60fps Choreography</text>

          <path d="M288 66 H318" stroke="#00F5D4" strokeWidth="1.5" strokeDasharray="3 3" />
          <rect x="318" y="34" width="88" height="64" rx="8" fill="#10111A" stroke="#3F3F46" />
          <text x="362" y="62" textAnchor="middle" fill="#E4E4E7" fontSize="9.5" fontWeight="600">Vite ESM</text>
          <text x="362" y="76" textAnchor="middle" fill="#A1A1AA" fontSize="8">Chunked Bundle</text>
        </svg>
      );

    case 'taskplatform':
      return (
        <svg
          viewBox="0 0 420 132"
          className="h-32 w-full rounded-xl border border-white/10 bg-[#07070D]"
          role="img"
          aria-label="AI Task Processing Platform Architecture Diagram"
        >
          <path d="M92 66 H124 M214 66 H244 M322 40 H348 M322 92 H348" stroke="#6366F1" strokeWidth="1.5" fill="none" />
          <rect x="14" y="36" width="78" height="60" rx="8" fill="#10111A" stroke="#00F5D4" strokeOpacity="0.45" />
          <text x="53" y="62" textAnchor="middle" fill="#E4E4E7" fontSize="9.5" fontWeight="600">REST API</text>
          <text x="53" y="76" textAnchor="middle" fill="#00F5D4" fontSize="8">Express</text>

          <rect x="124" y="30" width="90" height="72" rx="8" fill="#10111A" stroke="#EC4899" strokeOpacity="0.5" />
          <text x="169" y="54" textAnchor="middle" fill="#E4E4E7" fontSize="9.5" fontWeight="600">BullMQ</text>
          <text x="169" y="68" textAnchor="middle" fill="#A1A1AA" fontSize="8">Redis Broker</text>
          <text x="169" y="82" textAnchor="middle" fill="#F472B6" fontSize="8">Retries + DLQ</text>

          <rect x="244" y="22" width="78" height="36" rx="7" fill="#10111A" stroke="#6366F1" strokeOpacity="0.55" />
          <text x="283" y="44" textAnchor="middle" fill="#E4E4E7" fontSize="9">Worker #1</text>

          <rect x="244" y="74" width="78" height="36" rx="7" fill="#10111A" stroke="#6366F1" strokeOpacity="0.55" />
          <text x="283" y="96" textAnchor="middle" fill="#E4E4E7" fontSize="9">Worker #N</text>

          <rect x="348" y="34" width="58" height="64" rx="8" fill="#10111A" stroke="#3F3F46" />
          <text x="377" y="63" textAnchor="middle" fill="#E4E4E7" fontSize="9" fontWeight="600">MongoDB</text>
          <text x="377" y="77" textAnchor="middle" fill="#A1A1AA" fontSize="8">Docker</text>
        </svg>
      );

    case 'shl':
      return (
        <svg
          viewBox="0 0 420 132"
          className="h-32 w-full rounded-xl border border-white/10 bg-[#07070D]"
          role="img"
          aria-label="SHL Assessment Recommender Pipeline Diagram"
        >
          <path d="M96 66 H124 M210 66 H238 M320 66 H346" stroke="#00F5D4" strokeWidth="1.5" strokeDasharray="3 2" fill="none" />
          <rect x="14" y="36" width="82" height="60" rx="8" fill="#10111A" stroke="#6366F1" strokeOpacity="0.5" />
          <text x="55" y="62" textAnchor="middle" fill="#E4E4E7" fontSize="9.5" fontWeight="600">FastAPI</text>
          <text x="55" y="76" textAnchor="middle" fill="#818CF8" fontSize="8">Query Parse</text>

          <rect x="124" y="32" width="86" height="68" rx="8" fill="#10111A" stroke="#00F5D4" strokeOpacity="0.55" />
          <text x="167" y="56" textAnchor="middle" fill="#E4E4E7" fontSize="9.5" fontWeight="600">BM25 Index</text>
          <text x="167" y="71" textAnchor="middle" fill="#A1A1AA" fontSize="8">SHL Catalog</text>
          <text x="167" y="84" textAnchor="middle" fill="#00F5D4" fontSize="8">Lexical Rank</text>

          <rect x="238" y="32" width="82" height="68" rx="8" fill="#10111A" stroke="#EC4899" strokeOpacity="0.5" />
          <text x="279" y="58" textAnchor="middle" fill="#E4E4E7" fontSize="9.5" fontWeight="600">Guardrails</text>
          <text x="279" y="72" textAnchor="middle" fill="#A1A1AA" fontSize="8">Time + Role</text>
          <text x="279" y="84" textAnchor="middle" fill="#F472B6" fontSize="8">Deterministic</text>

          <rect x="346" y="36" width="60" height="60" rx="8" fill="#10111A" stroke="#3F3F46" />
          <text x="376" y="62" textAnchor="middle" fill="#E4E4E7" fontSize="9" fontWeight="600">JSON</text>
          <text x="376" y="76" textAnchor="middle" fill="#A1A1AA" fontSize="8">Pydantic</text>
        </svg>
      );

    case 'smartleads':
      return (
        <svg
          viewBox="0 0 420 132"
          className="h-32 w-full rounded-xl border border-white/10 bg-[#07070D]"
          role="img"
          aria-label="Smart Leads Dashboard CRM Architecture Diagram"
        >
          <path d="M98 66 H128 M210 66 H240 M326 44 H348 M326 88 H348" stroke="#818CF8" strokeWidth="1.5" fill="none" />
          <rect x="14" y="34" width="84" height="64" rx="8" fill="#10111A" stroke="#00F5D4" strokeOpacity="0.45" />
          <text x="56" y="59" textAnchor="middle" fill="#E4E4E7" fontSize="9.5" fontWeight="600">React TS</text>
          <text x="56" y="73" textAnchor="middle" fill="#A1A1AA" fontSize="8">CRM Filters</text>
          <text x="56" y="85" textAnchor="middle" fill="#00F5D4" fontSize="8">Context API</text>

          <rect x="128" y="34" width="82" height="64" rx="8" fill="#10111A" stroke="#6366F1" strokeOpacity="0.55" />
          <text x="169" y="59" textAnchor="middle" fill="#E4E4E7" fontSize="9.5" fontWeight="600">JWT Guard</text>
          <text x="169" y="73" textAnchor="middle" fill="#A1A1AA" fontSize="8">Middleware</text>
          <text x="169" y="85" textAnchor="middle" fill="#818CF8" fontSize="8">Stateless Auth</text>

          <rect x="240" y="22" width="86" height="40" rx="7" fill="#10111A" stroke="#3F3F46" />
          <text x="283" y="40" textAnchor="middle" fill="#E4E4E7" fontSize="9.5" fontWeight="600">Pagination</text>
          <text x="283" y="53" textAnchor="middle" fill="#A1A1AA" fontSize="8">Query Builder</text>

          <rect x="240" y="70" width="86" height="40" rx="7" fill="#10111A" stroke="#EC4899" strokeOpacity="0.45" />
          <text x="283" y="88" textAnchor="middle" fill="#E4E4E7" fontSize="9.5" fontWeight="600">CSV Stream</text>
          <text x="283" y="101" textAnchor="middle" fill="#F472B6" fontSize="8">Filtered Export</text>

          <rect x="348" y="34" width="58" height="64" rx="8" fill="#10111A" stroke="#52525B" />
          <text x="377" y="64" textAnchor="middle" fill="#E4E4E7" fontSize="9" fontWeight="600">Mongo</text>
          <text x="377" y="77" textAnchor="middle" fill="#A1A1AA" fontSize="8">Indexed</text>
        </svg>
      );
  }
}
