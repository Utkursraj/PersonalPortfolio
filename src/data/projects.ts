import type { Project, PublicRepoEntry, TechCategory } from '../types/portfolio';

export const GITHUB_USERNAME = 'Utkursraj';
export const CONTACT_EMAIL = 'rajutkurs@gmail.com';
export const GITHUB_PROFILE_URL = 'https://github.com/Utkursraj';
export const LINKEDIN_PROFILE_URL = 'https://www.linkedin.com/in/utkurs-raj';

export const EXCLUDED_ARCHIVE_REPOS = new Set([
  'analog-clock',
  'digital-clock',
  'game',
  'password-generator',
  'project-02-website-lamp-on-off-',
  '-countdown-timer-website',
]);

export const FLAGSHIP_PROJECTS: Project[] = [
  {
    id: 'thumbcraft-ai',
    title: 'ThumbCraft AI',
    subtitle: '3D YouTube & Shorts Thumbnail Studio + Gemini CTR Engine',
    visibility: 'Private SaaS',
    featured: true,
    primaryCategory: 'AI & Multimodal',
    categories: ['AI & Multimodal', '3D & Spatial Web', 'Full-Stack MERN'],
    summary:
      'Production-grade creator studio pairing a multi-pass HTML5 Canvas perspective renderer and dual neon rim-lighting compositor with Gemini AI CTR virality auditing, live YouTube feed simulation, Firebase wallets, and Razorpay billing.',
    problem:
      'Creators spend hours bouncing between Photoshop, 3D mockups, and intuition-based A/B guesswork without knowing how a thumbnail reads inside real YouTube desktop and mobile feeds.',
    architectureSummary:
      'Client-side multi-pass 2D/perspective Canvas compositor streams live composited frames to a YouTube feed simulator while Express APIs coordinate Gemini multimodal CTR audits, Firebase wallet credits, and Razorpay webhook settlement.',
    techStack: [
      'React',
      'TypeScript',
      'HTML5 Canvas',
      'Gemini API',
      'Firebase Auth & Firestore',
      'Razorpay',
      'Node.js',
      'Tailwind CSS',
    ],
    skillKeys: [
      'react',
      'typescript',
      'html5-canvas',
      'gemini',
      'structured-json',
      'firebase',
      'razorpay',
      'nodejs',
      'express',
      'tailwind',
      'vite',
    ],
    highlights: [
      'Multi-pass HTML5 Canvas perspective text warp and dual neon rim-light compositing',
      'Real-time YouTube Desktop & Shorts Mobile feed simulator at 60fps',
      'Gemini AI CTR virality scoring with structured JSON improvement directives',
      'Firebase credit ledger with idempotent Razorpay payment verification',
    ],
    flow: [
      {
        id: 'tc-client',
        layer: 'Client Studio',
        title: 'Multi-Pass HTML5 Canvas Engine',
        tech: 'React + TypeScript + Canvas 2D',
        detail:
          'Renders layered subject cutouts, perspective-warped display typography, and dual cyan/magenta rim-lighting passes directly into live YouTube feed frames.',
        metric: '60fps compositor',
      },
      {
        id: 'tc-api',
        layer: 'API & Billing',
        title: 'Express Gateway & Razorpay Webhooks',
        tech: 'Node.js + Express + Firebase Admin',
        detail:
          'Validates Firebase ID tokens, verifies HMAC signatures on Razorpay orders, and performs atomic credit ledger mutations.',
        metric: 'Idempotent ledger',
      },
      {
        id: 'tc-ai',
        layer: 'AI Audit',
        title: 'Gemini Multimodal CTR Critic',
        tech: '@google/genai + Structured JSON',
        detail:
          'Evaluates exported thumbnail frames for focal contrast, mobile legibility, and curiosity gap using strict JSON schema responses.',
        metric: 'Schema-validated',
      },
      {
        id: 'tc-db',
        layer: 'Persistence',
        title: 'Firestore Wallet & Asset Store',
        tech: 'Firebase Auth & Firestore',
        detail:
          'Stores project layer trees, credit balances, and audit history with per-user Firestore security rules.',
        metric: 'Real-time sync',
      },
    ],
    diagramType: 'thumbcraft',
    stars: 0,
    forks: 0,
    language: 'TypeScript',
    updatedAt: '2026-10-18T00:00:00Z',
    isLiveSynced: false,
  },
  {
    id: 'stockledger-os',
    title: 'StockLedger OS',
    subtitle: 'AI-Native Retail Inventory, 3D Digital Twin & GST POS',
    visibility: 'Private SaaS',
    featured: true,
    primaryCategory: '3D & Spatial Web',
    categories: ['3D & Spatial Web', 'AI & Multimodal', 'Full-Stack MERN'],
    summary:
      'Spatial retail operations platform uniting an interactive Three.js 3D warehouse digital twin with Gemini multimodal GST invoice OCR, 14-day burn-rate stockout prediction, and 4-sheet SheetJS .xlsx accounting exports.',
    problem:
      'Independent retailers rely on fragmented spreadsheets and manual GST bill entry, leaving blind spots in SKU velocity, aisle capacity, and sudden stockouts.',
    architectureSummary:
      'Three.js warehouse twin maps live SKU occupancy in 3D space while Gemini multimodal OCR extracts GST invoice line items into normalized PostgreSQL/MongoDB ledgers with deterministic burn-rate forecasting.',
    techStack: [
      'React',
      'TypeScript',
      'Three.js',
      'Gemini Multimodal OCR',
      'Node.js',
      'Chart.js',
      'PostgreSQL / Supabase',
      'SheetJS',
    ],
    skillKeys: [
      'react',
      'typescript',
      'threejs',
      'gemini',
      'multimodal-ocr',
      'structured-json',
      'nodejs',
      'chartjs',
      'postgresql',
      'tailwind',
      'vite',
    ],
    highlights: [
      'Interactive Three.js 3D warehouse twin color-coding rack occupancy & alert states',
      'Gemini multimodal GST invoice OCR extracting HSN codes, tax slabs, and SKU quantities',
      '14-day rolling burn-rate forecast identifying reorder deadlines before stockouts',
      '4-sheet SheetJS (.xlsx) export for Inventory, GST Ledger, Burn Forecast, and Reorder POs',
    ],
    flow: [
      {
        id: 'sl-client',
        layer: '3D Spatial UI',
        title: 'Three.js Warehouse Digital Twin',
        tech: 'Three.js + React + Chart.js',
        detail:
          'Visualizes aisles, bin capacity, and low-stock beacons in interactive 3D alongside velocity telemetry charts.',
        metric: 'Real-time SKU map',
      },
      {
        id: 'sl-ocr',
        layer: 'AI Ingestion',
        title: 'Multimodal GST Invoice Extractor',
        tech: '@google/genai + Multimodal OCR',
        detail:
          'Parses scanned supplier invoices into validated JSON line items including GSTIN, HSN codes, unit cost, and tax splits.',
        metric: 'Zero manual entry',
      },
      {
        id: 'sl-engine',
        layer: 'Forecast Engine',
        title: '14-Day Burn-Rate Predictor',
        tech: 'Node.js + TypeScript Analytics',
        detail:
          'Computes weighted daily depletion velocity per SKU and triggers reorder thresholds across supplier lead times.',
        metric: '14-day horizon',
      },
      {
        id: 'sl-export',
        layer: 'Data & Export',
        title: 'Relational Ledger & 4-Sheet XLSX',
        tech: 'PostgreSQL / Supabase + SheetJS',
        detail:
          'Persists transactional stock movements and compiles multi-tab accounting workbooks client/server-side.',
        metric: '4-sheet .xlsx',
      },
    ],
    diagramType: 'stockledger',
    stars: 0,
    forks: 0,
    language: 'TypeScript',
    updatedAt: '2026-11-02T00:00:00Z',
    isLiveSynced: false,
  },
  {
    id: 'aetheria',
    repoName: 'AETHERIA',
    title: 'AETHERIA',
    subtitle: 'Spatial Computing & Digital Product Architecture Experience',
    visibility: 'Public Repo',
    featured: true,
    primaryCategory: '3D & Spatial Web',
    categories: ['3D & Spatial Web'],
    summary:
      'Spatial computing and digital product architecture web experience built with TypeScript, React, and precision motion choreography.',
    problem:
      'Conventional static landing pages fail to communicate spatial depth, tactile responsiveness, and architectural hierarchy for modern digital products.',
    architectureSummary:
      'Modular TypeScript component architecture paired with GPU-composited motion primitives, responsive layout geometry, and Vite-bundled asset pipelines.',
    techStack: ['TypeScript', 'React', 'Vite', 'Tailwind CSS', 'Spatial Motion'],
    skillKeys: ['typescript', 'react', 'vite', 'tailwind', 'threejs'],
    highlights: [
      'Strict TypeScript component contracts with zero runtime layout shift',
      'Compositor-first spatial transitions tuned for 60fps interaction',
      'Responsive grid choreography across desktop and mobile viewports',
    ],
    flow: [
      {
        id: 'ae-ui',
        layer: 'Presentation',
        title: 'Spatial Interface Layer',
        tech: 'React + TypeScript + Tailwind',
        detail:
          'Composes high-contrast obsidian surfaces, balanced typographic scales, and modular showcase sections.',
        metric: 'Strict TS',
      },
      {
        id: 'ae-motion',
        layer: 'Choreography',
        title: 'GPU-Composited Motion Engine',
        tech: 'Transform / Opacity Pipelines',
        detail:
          'Animates spatial layers exclusively on GPU-composited properties while respecting prefers-reduced-motion.',
        metric: '60fps',
      },
      {
        id: 'ae-build',
        layer: 'Delivery',
        title: 'Vite Production Bundle',
        tech: 'Vite + Tree-Shaken ESM',
        detail:
          'Optimizes chunk splitting and static asset preloading for fast first contentful paint.',
        metric: 'Edge-ready',
      },
    ],
    diagramType: 'aetheria',
    githubUrl: 'https://github.com/Utkursraj/AETHERIA',
    stars: 0,
    forks: 0,
    language: 'TypeScript',
    updatedAt: '2026-09-15T00:00:00Z',
    isLiveSynced: false,
  },
  {
    id: 'ai-task-processing-platform',
    repoName: 'ai-task-processing-platform',
    title: 'AI Task Processing Platform',
    subtitle: 'Distributed Async Job Pipeline with BullMQ, Redis & Docker',
    visibility: 'Public Repo',
    featured: true,
    primaryCategory: 'Distributed Backend',
    categories: ['Distributed Backend', 'AI & Multimodal'],
    summary:
      'Fault-tolerant distributed asynchronous job processing architecture powered by Node.js, BullMQ worker queues, Redis state coordination, MongoDB persistence, and Docker Compose orchestration.',
    problem:
      'Blocking HTTP request-response cycles fail under bursty AI inference workloads, causing request timeouts, dropped jobs, and inability to scale workers independently.',
    architectureSummary:
      'Decoupled Producer-Queue-Worker topology where Express APIs enqueue idempotent jobs into Redis-backed BullMQ queues, consumed by containerized worker processes with exponential backoff and MongoDB state tracking.',
    techStack: ['Node.js', 'Express.js', 'BullMQ', 'Redis', 'MongoDB', 'Docker'],
    skillKeys: ['nodejs', 'express', 'bullmq', 'redis', 'mongodb', 'docker', 'rest-api'],
    highlights: [
      'Non-blocking job ingestion returning instant task IDs for async status polling',
      'BullMQ retry policies with exponential backoff and dead-letter visibility',
      'Redis-backed concurrency control and decoupled horizontal worker scaling',
      'Reproducible multi-container Docker topology for API, Redis, Worker, and MongoDB',
    ],
    flow: [
      {
        id: 'tp-api',
        layer: 'Ingestion API',
        title: 'Express Task Producer',
        tech: 'Node.js + Express + REST',
        detail:
          'Validates task payloads, persists initial PENDING job records in MongoDB, and enqueues work into BullMQ.',
        metric: '<15ms enqueue',
      },
      {
        id: 'tp-queue',
        layer: 'Broker & Queue',
        title: 'Redis + BullMQ Job Scheduler',
        tech: 'Redis + BullMQ',
        detail:
          'Manages priority queues, delayed retries, rate limits, and worker heartbeats without blocking HTTP threads.',
        metric: 'At-least-once',
      },
      {
        id: 'tp-worker',
        layer: 'Worker Pool',
        title: 'Containerized AI Task Workers',
        tech: 'Docker + Node.js Workers',
        detail:
          'Executes compute/AI payloads asynchronously across isolated worker containers with configurable concurrency.',
        metric: 'Horizontally scalable',
      },
      {
        id: 'tp-db',
        layer: 'State Store',
        title: 'MongoDB Job Ledger',
        tech: 'MongoDB (Mongoose)',
        detail:
          'Stores structured outputs, execution duration, failure traces, and status transitions.',
        metric: 'Audit trail',
      },
    ],
    diagramType: 'taskplatform',
    githubUrl: 'https://github.com/Utkursraj/ai-task-processing-platform',
    stars: 0,
    forks: 0,
    language: 'JavaScript',
    updatedAt: '2026-08-20T00:00:00Z',
    isLiveSynced: false,
  },
  {
    id: 'shl-assessment-recommender',
    repoName: 'shl-assessment-recommender',
    title: 'SHL Assessment Recommender',
    subtitle: 'Catalog-Grounded Conversational Engine with BM25 & FastAPI',
    visibility: 'Public Repo',
    featured: true,
    primaryCategory: 'AI & Multimodal',
    categories: ['AI & Multimodal', 'Distributed Backend'],
    summary:
      'Catalog-grounded conversational recommendation engine combining Python, FastAPI, BM25 lexical retrieval, deterministic business guardrails, and strict Pydantic schema validation.',
    problem:
      'Pure LLM recommenders hallucinate non-existent assessment SKUs, violate duration constraints, and return unstructured prose unfit for enterprise HR pipelines.',
    architectureSummary:
      'Two-stage retrieval and guardrail pipeline: FastAPI ingests job descriptions, scores SHL catalog entries via BM25 lexical ranking, enforces duration/role constraints deterministically, and returns schema-verified recommendations.',
    techStack: ['Python', 'FastAPI', 'BM25 Retrieval', 'Structured JSON Schemas', 'RESTful APIs'],
    skillKeys: ['python', 'fastapi', 'bm25', 'structured-json', 'rest-api', 'gemini'],
    highlights: [
      'Zero-hallucination catalog grounding via deterministic BM25 lexical retrieval',
      'Strict Pydantic schema validation on every recommendation payload',
      'Guardrail filters enforcing assessment duration, test type balance, and remote support',
      'Clean FastAPI OpenAPI endpoints with sub-second query scoring',
    ],
    flow: [
      {
        id: 'shl-input',
        layer: 'Query Intake',
        title: 'FastAPI Endpoint & Parser',
        tech: 'Python + FastAPI + Pydantic',
        detail:
          'Normalizes hiring queries, role seniority, and max duration constraints into typed request contracts.',
        metric: 'Typed contract',
      },
      {
        id: 'shl-bm25',
        layer: 'Retrieval',
        title: 'BM25 Lexical Catalog Scorer',
        tech: 'BM25 Retrieval',
        detail:
          'Ranks verified SHL assessment catalog items by domain, skill taxonomy, and competency overlap.',
        metric: '100% grounded',
      },
      {
        id: 'shl-guard',
        layer: 'Guardrails',
        title: 'Deterministic Constraint Filter',
        tech: 'Python Rule Engine',
        detail:
          'Balances technical vs. behavioral test types and guarantees total duration stays within hiring limits.',
        metric: 'Zero hallucination',
      },
      {
        id: 'shl-out',
        layer: 'Output Schema',
        title: 'Structured JSON Response',
        tech: 'Structured JSON Schemas',
        detail:
          'Emits strictly typed assessment URLs, test codes, and rationale ready for downstream ATS consumption.',
        metric: 'Schema-locked',
      },
    ],
    diagramType: 'shl',
    githubUrl: 'https://github.com/Utkursraj/shl-assessment-recommender',
    stars: 0,
    forks: 0,
    language: 'Python',
    updatedAt: '2026-07-14T00:00:00Z',
    isLiveSynced: false,
  },
  {
    id: 'smart-leads-dashboard',
    repoName: 'smart-leads-dashboard',
    title: 'Smart Leads Dashboard',
    subtitle: 'TypeScript MERN CRM with JWT Auth, Pagination & CSV Pipelines',
    visibility: 'Public Repo',
    featured: true,
    primaryCategory: 'Full-Stack MERN',
    categories: ['Full-Stack MERN'],
    summary:
      'Production-ready TypeScript CRM platform featuring JWT authentication, multi-criteria server-side filtering, indexed MongoDB pagination, pipeline analytics, and clean CSV export streams.',
    problem:
      'Sales teams outgrow static tables quickly when client-side filtering chokes on thousands of leads and lacks role-scoped authentication or clean export pipelines.',
    architectureSummary:
      'End-to-end TypeScript MERN stack with JWT-protected Express controllers, compound MongoDB query builders for filter+pagination, React Context state management, and streamed CSV exports.',
    techStack: ['TypeScript', 'React', 'Node.js', 'Express.js', 'MongoDB', 'JWT', 'Tailwind CSS'],
    skillKeys: [
      'typescript',
      'react',
      'nodejs',
      'express',
      'mongodb',
      'jwt',
      'context-api',
      'tailwind',
      'rest-api',
      'render',
    ],
    highlights: [
      'Stateless JWT authentication with protected API middleware and route guards',
      'Multi-criteria server-side filtering (status, source, date range, search) + pagination',
      'Streaming CSV export pipeline honoring active query filters',
      'Full TypeScript DTO parity between Express backend and React frontend',
    ],
    flow: [
      {
        id: 'sm-ui',
        layer: 'Frontend',
        title: 'TypeScript React CRM Workspace',
        tech: 'React + TypeScript + Context API',
        detail:
          'Provides debounced search, faceted lead filters, stage transitions, and instant CSV export triggers.',
        metric: 'Zero prop drift',
      },
      {
        id: 'sm-auth',
        layer: 'Security',
        title: 'JWT Auth & Validation Middleware',
        tech: 'JWT + Express Middleware',
        detail:
          'Verifies bearer tokens, sanitizes query parameters, and scopes lead mutations to authenticated owners.',
        metric: 'Stateless JWT',
      },
      {
        id: 'sm-api',
        layer: 'Query Layer',
        title: 'Server-Side Filter & Pagination API',
        tech: 'Node.js + Express + REST',
        detail:
          'Constructs dynamic Mongoose predicates with deterministic sorting, skip/limit windows, and total counts.',
        metric: 'Paginated queries',
      },
      {
        id: 'sm-db',
        layer: 'Database',
        title: 'Indexed MongoDB Lead Store',
        tech: 'MongoDB (Mongoose)',
        detail:
          'Maintains indexed lead statuses, activity logs, and pipeline metrics for rapid analytical aggregation.',
        metric: 'Indexed schemas',
      },
    ],
    diagramType: 'smartleads',
    githubUrl: 'https://github.com/Utkursraj/smart-leads-dashboard',
    stars: 0,
    forks: 0,
    language: 'TypeScript',
    updatedAt: '2026-08-05T00:00:00Z',
    isLiveSynced: false,
  },
];

export const CURATED_PUBLIC_REPOS: Record<string, Omit<PublicRepoEntry, 'id' | 'isLiveSynced'>> = {
  taskvault: {
    name: 'TaskVault',
    title: 'TaskVault',
    description:
      'Structured task and productivity vault with persistent workflows, clean state management, and responsive UI.',
    language: 'JavaScript',
    stars: 0,
    forks: 0,
    updatedAt: '2026-05-12T00:00:00Z',
    githubUrl: 'https://github.com/Utkursraj/TaskVault',
    techStack: ['React', 'Node.js', 'Express.js', 'MongoDB', 'Tailwind CSS'],
    skillKeys: ['react', 'nodejs', 'express', 'mongodb', 'tailwind', 'javascript'],
    isArchivedCategory: false,
  },
  stripe: {
    name: 'Stripe',
    title: 'Stripe Payment System',
    description:
      'Production-ready Stripe checkout integration with decoupled React frontend, Express payment intent backend, and Render deployment.',
    language: 'JavaScript',
    stars: 0,
    forks: 0,
    updatedAt: '2026-04-18T00:00:00Z',
    githubUrl: 'https://github.com/Utkursraj/Stripe',
    techStack: ['React', 'Node.js', 'Express.js', 'Stripe', 'Render'],
    skillKeys: ['react', 'nodejs', 'express', 'stripe', 'render', 'javascript'],
    isArchivedCategory: false,
  },
  airbnbclone: {
    name: 'AirbnbClone',
    title: 'Wanderlust (AirbnbClone)',
    description:
      'Full-stack accommodation marketplace with Passport.js session auth, Mapbox geocoding, Cloudinary media storage, and EJS SSR.',
    language: 'JavaScript',
    stars: 0,
    forks: 0,
    updatedAt: '2026-03-22T00:00:00Z',
    githubUrl: 'https://github.com/Utkursraj/AirbnbClone',
    liveUrl: 'https://airbnbclone-dnwy.onrender.com',
    techStack: ['Node.js', 'Express.js', 'MongoDB', 'EJS', 'Passport.js', 'Bootstrap'],
    skillKeys: ['nodejs', 'express', 'mongodb', 'ejs', 'passport', 'bootstrap', 'render', 'javascript'],
    isArchivedCategory: false,
  },
  expensetracker: {
    name: 'ExpenseTracker',
    title: 'Personal Expense Tracker',
    description:
      'Full-stack finance dashboard with JWT authentication, Chart.js analytics, transaction CRUD APIs, and MongoDB Atlas persistence.',
    language: 'JavaScript',
    stars: 0,
    forks: 0,
    updatedAt: '2026-04-04T00:00:00Z',
    githubUrl: 'https://github.com/Utkursraj/ExpenseTracker',
    liveUrl: 'https://expense-tracker-frontend-m3oi.onrender.com',
    techStack: ['React', 'Node.js', 'Express.js', 'MongoDB', 'JWT', 'Chart.js'],
    skillKeys: ['react', 'nodejs', 'express', 'mongodb', 'jwt', 'chartjs', 'tailwind', 'render', 'javascript'],
    isArchivedCategory: false,
  },
  'secure-taskflow-api': {
    name: 'secure-taskflow-api',
    title: 'Secure TaskFlow API',
    description:
      'Hardened RESTful backend service implementing JWT authorization, role guards, input validation, and structured error handling.',
    language: 'JavaScript',
    stars: 0,
    forks: 0,
    updatedAt: '2026-06-02T00:00:00Z',
    githubUrl: 'https://github.com/Utkursraj/secure-taskflow-api',
    techStack: ['Node.js', 'Express.js', 'JWT', 'MongoDB', 'RESTful APIs'],
    skillKeys: ['nodejs', 'express', 'jwt', 'mongodb', 'rest-api', 'javascript'],
    isArchivedCategory: false,
  },
  cloudora: {
    name: 'Cloudora',
    title: 'Cloudora',
    description:
      'Cloud-oriented full-stack web platform designed for clean deployment, responsive interfaces, and scalable API integration.',
    language: 'TypeScript',
    stars: 0,
    forks: 0,
    updatedAt: '2026-06-28T00:00:00Z',
    githubUrl: 'https://github.com/Utkursraj/Cloudora',
    techStack: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Node.js'],
    skillKeys: ['react', 'typescript', 'vite', 'tailwind', 'nodejs'],
    isArchivedCategory: false,
  },
};

export const TECH_CATEGORIES: TechCategory[] = [
  {
    id: 'frontend-3d',
    title: 'Frontend & 3D Graphics',
    subtitle: 'Interactive spatial viewports, Canvas compositors, and component systems',
    accent: 'cyan',
    skills: [
      { label: 'React', key: 'react', role: 'Component & UI Architecture' },
      { label: 'TypeScript', key: 'typescript', role: 'End-to-End Type Safety' },
      { label: 'JavaScript (ES6+)', key: 'javascript', role: 'Async & Browser Runtime' },
      { label: 'Vite', key: 'vite', role: 'Fast ESM Tooling' },
      { label: 'Tailwind CSS', key: 'tailwind', role: 'Design System Styling' },
      { label: 'Three.js', key: 'threejs', role: 'WebGL Spatial Scenes' },
      { label: 'HTML5 Canvas', key: 'html5-canvas', role: 'Multi-Pass 2D Compositing' },
      { label: 'Context API', key: 'context-api', role: 'App State Orchestration' },
      { label: 'Chart.js', key: 'chartjs', role: 'Telemetry Visualization' },
      { label: 'EJS', key: 'ejs', role: 'Server-Rendered Views' },
      { label: 'Bootstrap', key: 'bootstrap', role: 'Rapid Grid Layouts' },
    ],
  },
  {
    id: 'backend-distributed',
    title: 'Backend & Distributed Systems',
    subtitle: 'Asynchronous job queues, stateless auth, and high-throughput APIs',
    accent: 'indigo',
    skills: [
      { label: 'Node.js', key: 'nodejs', role: 'Event-Driven Runtime' },
      { label: 'Express.js', key: 'express', role: 'API Gateway & Middleware' },
      { label: 'Python', key: 'python', role: 'AI & Retrieval Services' },
      { label: 'FastAPI', key: 'fastapi', role: 'Typed Async Python APIs' },
      { label: 'RESTful APIs', key: 'rest-api', role: 'Resource Contracts' },
      { label: 'BullMQ', key: 'bullmq', role: 'Distributed Job Queues' },
      { label: 'Redis', key: 'redis', role: 'Queue & Cache Coordination' },
      { label: 'Passport.js', key: 'passport', role: 'Session Auth Strategies' },
      { label: 'JWT', key: 'jwt', role: 'Stateless Token Security' },
    ],
  },
  {
    id: 'ai-retrieval',
    title: 'AI & Retrieval Pipelines',
    subtitle: 'Catalog-grounded search, multimodal extraction, and strict schemas',
    accent: 'magenta',
    skills: [
      { label: 'Google Gemini API (@google/genai)', key: 'gemini', role: 'Multimodal Reasoning' },
      { label: 'Multimodal OCR', key: 'multimodal-ocr', role: 'Invoice & Vision Parsing' },
      { label: 'Structured JSON Schemas', key: 'structured-json', role: 'Deterministic Outputs' },
      { label: 'BM25 Retrieval', key: 'bm25', role: 'Lexical Grounded Search' },
    ],
  },
  {
    id: 'db-cloud-payments',
    title: 'Databases, Cloud & Payments',
    subtitle: 'Transactional ledgers, containers, and global checkout pipelines',
    accent: 'emerald',
    skills: [
      { label: 'MongoDB (Mongoose)', key: 'mongodb', role: 'Document & Aggregation Store' },
      { label: 'PostgreSQL / Supabase', key: 'postgresql', role: 'Relational SQL Ledger' },
      { label: 'MySQL', key: 'mysql', role: 'Structured Relational Data' },
      { label: 'Firebase (Auth & Firestore)', key: 'firebase', role: 'Auth & Realtime Store' },
      { label: 'Docker', key: 'docker', role: 'Container Orchestration' },
      { label: 'Razorpay', key: 'razorpay', role: 'INR Checkout & Webhooks' },
      { label: 'Stripe', key: 'stripe', role: 'Global Payment Intents' },
      { label: 'Render', key: 'render', role: 'Cloud Service Hosting' },
    ],
  },
];

export function projectMatchesSkill(
  skillKeys: string[],
  techStack: string[],
  activeSkillKey: string | null
): boolean {
  if (!activeSkillKey) return false;
  if (skillKeys.includes(activeSkillKey)) return true;
  const normalized = activeSkillKey.toLowerCase();
  return techStack.some((item) => item.toLowerCase().includes(normalized));
}
