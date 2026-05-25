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
]

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug)
}
