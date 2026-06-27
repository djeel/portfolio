export interface Decision { title: string; detail: string }
export interface Project {
  slug: string; number: string; title: string; tagline: string
  category: string; year: string; role: string; color: string
  textColor: string; description: string; context: string
  challenge: string; decisions?: Decision[]; stack: string[]
  results: string; learnings: string[]; coverImage: string; url?: string
}

export const projects: Project[] = [
  {
    slug: 'murmur', coverImage: '/work/murmur-cover.png', number: '01', title: 'Murmur',
    tagline: 'A voice-first communication platform, built from scratch.',
    category: 'App · Product · Infrastructure', year: '2024–2026',
    role: 'Design · Development · Architecture',
    color: '#111111', textColor: '#F7F6F3',
    description: 'A full-featured communication platform: voice channels with screen sharing, text chat, DMs with end-to-end encryption, a bot API, and a complete production infrastructure.',
    context: 'Discord is the reference for community communication. But building something similar — from scratch, alone — is the best way to understand what makes a real-time platform actually work. Murmur started as an experiment and became a production-ready product.',
    challenge: 'Real-time voice is hard. WebRTC signaling needs to be fast and reliable. Managing concurrent WebSocket connections for chat while handling voice routing is a different problem than building a typical web app. Add auth, file storage, friends, multilingual UI, and E2EE for DMs — and the scope becomes significant.',
    decisions: [
      { title: 'Rust for the backend', detail: 'Axum + Tokio handles WebSocket signaling and the HTTP API. Performance-critical, memory-safe. The compiler forces you to think through failure modes before they reach production.' },
      { title: 'SolidJS for the frontend', detail: 'Fine-grained reactivity means the UI updates surgically — no virtual DOM overhead. Better for real-time dashboards, voice status, and live channel lists.' },
      { title: 'PostgreSQL + Redis', detail: 'Relational data for persistence, Redis for pub/sub and real-time event routing across instances.' },
      { title: 'WebRTC for voice', detail: 'Browser-native peer-to-peer mesh. Screen sharing included. No relay server needed for small rooms.' },
      { title: 'E2EE for direct messages', detail: 'Web Crypto API + TweetNaCl. Privacy by default. The server never sees plaintext DM content.' },
    ],
    stack: ['SolidJS', 'TypeScript', 'UnoCSS', 'Vite', 'Rust', 'Axum', 'Tokio', 'SQLx', 'PostgreSQL', 'Redis', 'WebRTC', 'Docker', 'Nginx', 'Prometheus', 'Grafana'],
    results: 'Production-ready: deployable in one command via Docker Compose, monitored with Prometheus + Grafana + Uptime Kuma, load-tested with autocannon and k6. CI/CD via GitHub Actions → GHCR → self-hosted runner → VPS.',
    learnings: [
      'Real-time systems force you to think about failure modes you would never consider in a CRUD app.',
      "Observability is not optional for production. If you can't measure it, you can't improve it.",
      "Rust's strict compiler is the point — it catches a class of bugs before they reach production.",
      'Building at this scope solo requires ruthless scope management and the discipline to ship something imperfect.',
    ],
    url: 'https://murmur.pm',
  },
  {
    slug: 'undercover', coverImage: '/work/undercover-cover.png', number: '02', title: 'Undercover',
    tagline: 'A real-time multiplayer social deduction game for the browser.',
    category: 'Game · Full-stack', year: '2024',
    role: 'Design · Development', color: '#1A3FFF', textColor: '#F7F6F3',
    description: 'A browser-based implementation of the Undercover party game, with real-time multiplayer, multiple game modes, and persistent state.',
    context: 'Undercover is a party game where players deduce who holds a different secret word. The web has no great version of it. I built one.',
    challenge: 'Real-time game state synchronization across multiple players, graceful handling of disconnects, and a UI that feels fast on any device.',
    decisions: [
      { title: 'FastAPI + Socket.IO', detail: 'Python FastAPI for game logic and HTTP, Socket.IO for real-time bidirectional events. SQLite persists state across disconnections.' },
      { title: 'React + Framer Motion', detail: 'Clean component structure with smooth phase transitions. TailwindCSS for rapid, consistent styling.' },
    ],
    stack: ['React', 'Vite', 'TypeScript', 'TailwindCSS', 'Framer Motion', 'Python', 'FastAPI', 'Socket.IO', 'SQLite'],
    results: '88 commits. Online multiplayer and local pass-and-play. Multiple word themes. Persistent state via SQLite.',
    learnings: [
      'Game state machines are a useful mental model for any complex UI with multiple modes.',
      'WebSocket-based UX requires careful thought about latency and reconnection states.',
    ],
    url: 'https://djeel.github.io/undercover',
  },
  {
    slug: 'gangui', coverImage: '/work/gangui-cover.png', number: '03', title: 'Gangui Network',
    tagline: 'A web presence for a Minecraft gaming community.',
    category: 'Community · Web', year: '2023–2026',
    role: 'Design · Development', color: '#1B3D2A', textColor: '#F7F6F3',
    description: 'A website for the Gangui Network Minecraft community server — giving an active gaming community a web home that matches their identity.',
    context: 'Gaming communities live and die by their presence. Gangui Network needed a clean, focused web home — not a generic gaming template.',
    challenge: 'Capturing the identity of a specific community without falling into generic gaming-website aesthetics.',
    decisions: [
      { title: 'Vanilla stack', detail: 'HTML, CSS, JavaScript — no framework. The site is mostly static with light interactivity. Adding a build tool would have been overhead without benefit.' },
      { title: 'Community-first design', detail: 'Colors and tone were derived from the community identity, not from a generic gaming template. Every visual choice was validated against their existing branding.' },
    ],
    stack: ['HTML', 'CSS', 'JavaScript'],
    results: 'Live at gangui.eu. Actively used by the community.',
    learnings: [
      'Designing for a community means understanding their culture first, then translating it visually.',
      'Constraints (simple stack, real users) are productive — they force focused decisions.',
    ],
    url: 'https://gangui.eu',
  },
  {
    slug: 'mcsounds', coverImage: '/work/mcsounds-cover.png', number: '04', title: 'MC Sounds',
    tagline: 'A fast, static web player to explore, search, and listen to every Minecraft Java Edition sound.',
    category: 'Tool · Frontend', year: '2025',
    role: 'Design · Development', color: '#1BD96A', textColor: '#0A0A0A',
    description: 'A static web app that lets you explore, search, and play every Minecraft Java Edition sound directly from Mojang\'s servers — no audio is committed or redistributed.',
    context: 'Minecraft has hundreds of unique sounds, but there\'s no good way to browse them outside the game. MC Sounds solves that: instant search with relevance ranking, category filtering, favorites, and a floating player with queue management — all running entirely client-side with zero backend.',
    challenge: 'Minecraft\'s audio is copyrighted by Mojang and must not be redistributed. The app had to stream audio directly from Mojang\'s content-addressed asset system without ever storing or serving .ogg files, while still feeling fast and responsive with hundreds of sounds.',
    decisions: [
      { title: 'Zero backend, 100% static', detail: 'The entire app is a static build — no server, no database. Sound metadata is a pre-generated manifest mapping names to SHA-1 hashes, resolved at runtime to Mojang\'s CDN URLs.' },
      { title: 'Mojang\'s asset system', detail: 'Instead of committing copyrighted audio, the app uses Mojang\'s official content-addressed storage. Each sound hash maps to a URL on resources.download.minecraft.net, streamed through an <audio> element.' },
      { title: 'Virtualized grid + instant search', detail: 'react-window powers a virtualized grid for smooth scrolling through hundreds of sounds. Client-side filtering with relevance ranking keeps search instant.' },
      { title: 'Floating player with queue', detail: 'A persistent player bar with play/pause, next/previous, loop, seek, and minimize. Users can build queues, reorder by selecting, or "Play all" from any context.' },
    ],
    stack: ['React', 'TypeScript', 'Vite', 'TailwindCSS', 'react-window', 'Vitest'],
    results: 'Fully deployed on Vercel. Instant search, floating player with queue, persistent favorites, light/dark theme, and download for any sound. GitHub Actions workflow for automated deployment.',
    learnings: [
      'Working around copyright constraints (no audio redistribution) forced a creative architecture that ended up being simpler and more deployable than a backend approach.',
      'Virtualized lists are essential when rendering hundreds of items — without react-window, the grid would choke on initial render.',
    ],
    url: 'https://mcsounds.vercel.app/',
  },
  {
    slug: 'kime', coverImage: '/work/kime-cover.png', number: '05', title: 'Kime',
    tagline: 'A gamified sports dashboard that turns training into a daily habit.',
    category: 'Web · Product · Gamification', year: '2024',
    role: 'Design · Development', color: '#5AF1C4', textColor: '#06231A',
    description: 'A Duolingo-inspired fitness dashboard: daily streaks, XP and levels, exercise tracking with progress stats, and goal reminders — designed to make consistent training feel rewarding.',
    context: 'Fitness apps are good at logging workouts but bad at keeping people coming back. Duolingo cracked daily retention for language learning through streaks, XP, and gentle pressure. Kime applies that same psychology to sport — turning training into a habit loop instead of a chore.',
    challenge: 'Gamification is easy to get wrong: too much and it feels gimmicky, too little and it does nothing. The hard part was designing a progression system — streaks, XP, levels — that genuinely motivates without punishing missed days, while keeping the dashboard readable at a glance.',
    decisions: [
      { title: 'React + TypeScript + Vite', detail: 'A fast SPA foundation: Vite for instant HMR, TypeScript for confidence in the state logic that drives streaks, XP, and level thresholds.' },
      { title: 'Streak, XP & level system', detail: 'The motivation core. Daily streaks reward consistency, XP and levels visualize long-term progress, and missed days soften the streak instead of resetting everything — borrowing Duolingo retention psychology.' },
      { title: 'TailwindCSS design system', detail: 'A utility-driven system keeps the dashboard dense but readable, with clear hierarchy between today goals, progress stats, and reminders.' },
    ],
    stack: ['React', 'TypeScript', 'Vite', 'TailwindCSS'],
    results: 'A working gamified dashboard: daily streaks, XP and levels, exercise tracking with progress stats, and goal reminders. Deployed on GitHub Pages.',
    learnings: [
      'Gamification is a design problem before it is a code problem — the reward curve matters more than the implementation.',
      'Borrowing proven retention mechanics is faster and safer than inventing a motivation system from scratch.',
    ],
    url: 'https://djeel.github.io/kime',
  },
  {
    slug: 'polyagent', coverImage: '/work/polyagent-cover.png', number: '06', title: 'PolyAgent',
    tagline: 'Conversational AI agent that searches LeBonCoin via Claude.',
    category: 'AI · Tool · Full-stack', year: '2025',
    role: 'Design · Development · Architecture', color: '#1A1A2E', textColor: '#F7F6F3',
    description: 'A conversational agent that understands natural language, asks clarifying questions with clickable choices, then searches LeBonCoin listings and presents results as cards — all through SSE streaming.',
    context: 'LeBonCoin has no good conversational search. You type keywords, scroll through noise, and miss deals. PolyAgent lets you chat naturally — "I\'m looking for a 3-room apartment in Lyon under 800€" — and the agent refines, searches, and shows you exactly what matches.',
    challenge: 'Connecting an LLM agent to a real search backend via MCP stdio, handling streaming responses with tool calls, and making the conversational flow feel natural while the agent toggles between asking questions and fetching results.',
    decisions: [
      { title: 'FastAPI + SSE streaming', detail: 'Server-Sent Events keep the conversation flowing in real time. The backend streams LLM tokens and tool results as they arrive — no polling, no WebSocket complexity.' },
      { title: 'MCP stdio for LeBonCoin', detail: 'The agent talks to leboncoin-mcp via JSON-RPC over stdio — a clean separation between the agent logic and the search backend. Easy to swap for other platforms.' },
      { title: 'OpenAI-compatible API', detail: 'Works with any OpenAI-compatible endpoint (9router, Gemini, Claude). Tool calling is handled at the API level — the agent just defines tools and the LLM decides when to call them.' },
      { title: 'Vanilla frontend + i18n', detail: 'No framework overhead. HTML/CSS/JS with marked.js for Markdown rendering. Trilingual (FR/EN/ES) from day one with a simple locale object.' },
    ],
    stack: ['Python', 'FastAPI', 'SSE', 'OpenAI API', 'MCP', 'HTML', 'CSS', 'JavaScript', 'marked.js'],
    results: 'Working conversational agent with real-time search, clickable choices, favorite saves (localStorage), persistent sessions, and trilingual support. Deployed locally, extensible to any OpenAI-compatible API.',
    learnings: [
      'MCP stdio is a clean abstraction for connecting LLMs to external tools — the protocol is simple and the separation of concerns is real.',
      'SSE streaming makes conversational AI feel instant — the user sees tokens appear as the model generates them, not after a full response.',
    ],
    url: 'https://github.com/wydii/polyagent',
  },
]

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug)
}
