/**
 * data.js — CyberNova · Shell Data
 * P1 scope: nav config, route manifest, hero stats, feature cards
 */

const NAV_ITEMS = [
  { id: 'home',    label: 'Home',          icon: '⚡', route: '' },
  { id: 'modules', label: 'Modules',       icon: '📚', route: 'modules' },
  { id: 'labs',    label: 'Forensic Labs', icon: '🔬', route: 'labs' },
  { id: 'sims',    label: 'Investigations',icon: '🕵️', route: 'sims' },
  { id: 'cases',   label: 'Cases',         icon: '⚖️', route: 'cases' },
  { id: 'videos',  label: 'Videos',        icon: '🎬', route: 'videos' },
  { id: 'progress',label: 'Progress',      icon: '📊', route: 'progress' },
];

const HERO_STATS = [
  { num: '9',  label: 'Law Modules' },
  { num: '6',  label: 'Forensic Labs' },
  { num: '3',  label: 'Investigations' },
  { num: '12', label: 'Case Studies' },
];

const FEATURE_CARDS = [
  {
    id: 'modules',
    icon: '📚',
    color: '#00d4ff',
    tag: '9 Modules · 36 Drills',
    title: 'Law Modules',
    desc: 'IT Act sections 43, 66C/D, 67, 79, DPDP Act 2023, cyber jurisdiction, interception & more. Each module has doctrine + interactive quiz drills.',
    meta: 'Group A + Group B',
    route: 'modules',
  },
  {
    id: 'labs',
    icon: '🔬',
    color: '#a855f7',
    tag: '6 Labs',
    title: 'Forensic Labs',
    desc: 'Hands-on simulations: hash evidence integrity, order of volatility drag-drop, file signature inspector, chain of custody builder, certificate clinic, open-source toolkit.',
    meta: 'Interactive simulations',
    route: 'labs',
  },
  {
    id: 'sims',
    icon: '🕵️',
    color: '#ef4444',
    tag: '3 Investigations',
    title: 'Case Simulations',
    desc: 'Play the role of investigating officer in real-world cybercrime scenarios — corporate data theft, banking fraud, morphed image. Make evidence decisions and apply legal sections.',
    meta: 'Scored decision trees',
    route: 'sims',
  },
  {
    id: 'cases',
    icon: '⚖️',
    color: '#10b981',
    tag: '12 Case Studies',
    title: 'Landmark Cases',
    desc: 'Study landmark Indian cyber law precedents: Shreya Singhal, Anvar P.V., Arjun Panditrao, Avnish Bajaj, K.S. Puttaswamy and more.',
    meta: 'Supreme Court & HC',
    route: 'cases',
  },
  {
    id: 'videos',
    icon: '🎬',
    color: '#f59e0b',
    tag: '8 Video Lectures',
    title: 'Video Library',
    desc: 'Expert-led lectures covering forensics fundamentals, legal doctrine, open-source tool walkthroughs and case analysis sessions.',
    meta: 'Watch & learn',
    route: 'videos',
  },
  {
    id: 'progress',
    icon: '📊',
    color: '#8b5cf6',
    tag: 'Points · Badges',
    title: 'My Progress',
    desc: 'Track your learning journey — completed modules, lab scores, investigation results, earned badges and your place on the local leaderboard.',
    meta: 'Gamified dashboard',
    route: 'progress',
  },
];

/** Route ownership map — teammates fill their own sections */
const ROUTE_OWNERS = {
  '':         'P1 — Shell',
  'modules':  'P2/P3 — Modules A & B',
  'labs':     'P4/P5 — Labs 1-6',
  'sims':     'P6 — Sims',
  'cases':    'P7 — Cases & Videos',
  'videos':   'P7 — Cases & Videos',
  'progress': 'P7 — Progress & Gamification',
};
