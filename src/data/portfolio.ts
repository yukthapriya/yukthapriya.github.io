import type { SkillCategory, Project, ExperienceItem, Publication, NavLink } from '../types';

export const NAV_LINKS: NavLink[] = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Publications', href: '#publications' },
  { label: 'Contact', href: '#contact' },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'Frontend & UI',
    icon: 'fas fa-layer-group',
    skills: [
      { name: 'React / TypeScript', level: 95 },
      { name: 'Next.js / Vite', level: 88 },
      { name: 'CSS3 / Tailwind', level: 90 },
      { name: 'Accessibility (WCAG)', level: 85 },
    ],
  },
  {
    title: 'Backend & APIs',
    icon: 'fas fa-server',
    skills: [
      { name: 'Node.js / Express', level: 90 },
      { name: 'Go', level: 78 },
      { name: 'REST & GraphQL', level: 88 },
      { name: 'PostgreSQL / Redis', level: 85 },
    ],
  },
  {
    title: 'ML / AI',
    icon: 'fas fa-brain',
    skills: [
      { name: 'PyTorch', level: 92 },
      { name: 'Hugging Face / LLMs', level: 88 },
      { name: 'CLIP / Computer Vision', level: 85 },
      { name: 'Model Calibration', level: 90 },
    ],
  },
  {
    title: 'Data Engineering',
    icon: 'fas fa-database',
    skills: [
      { name: 'Spark / Kafka', level: 82 },
      { name: 'BigQuery / Snowflake', level: 85 },
      { name: 'Airflow (ETL/ELT)', level: 80 },
      { name: 'Dimensional Modeling', level: 83 },
    ],
  },
  {
    title: 'DevOps & Infra',
    icon: 'fas fa-cloud',
    skills: [
      { name: 'Kubernetes / Docker', level: 82 },
      { name: 'Terraform / IaC', level: 78 },
      { name: 'GitHub Actions CI/CD', level: 90 },
      { name: 'Prometheus / Grafana', level: 80 },
    ],
  },
  {
    title: 'Product & Process',
    icon: 'fas fa-rocket',
    skills: [
      { name: 'Agile / Scrum', level: 92 },
      { name: 'System Design / RFCs', level: 88 },
      { name: 'Code Review / Mentoring', level: 90 },
      { name: 'A/B Testing', level: 85 },
    ],
  },
];

export const PROJECTS: Project[] = [
  {
    title: 'JagCoach — Multimodal Coaching Agent',
    description:
      'Voice + video + text agent that observes behavior, plans coaching steps, and integrates calendar/search/analytics tools. Built frontend UI (React), backend orchestration, and CLIP-based vision module.',
    tags: ['React', 'PyTorch', 'CLIP', 'GCP', 'LangChain'],
    role: 'Full-Stack / ML',
    link: 'https://github.com/yukthapriya/jagcoach',
    featured: true,
  },
  {
    title: 'Autonomous Recommendation Agent',
    description:
      'Graph-based recommender using Neo4j and LLM planning for personalized university recommendations. Focus: data modeling, ranking & evaluation, and API endpoints.',
    tags: ['Neo4j', 'LangChain', 'Node.js', 'GraphQL'],
    role: 'Data / Backend',
    link: 'https://github.com/yukthapriya/recommender',
  },
  {
    title: 'Public Health Early-Warning Agent',
    description:
      'Multimodal monitoring pipeline detecting public-health signals and triggering autonomous alerts. Built streaming ingestion, anomaly detection, and alerting on Kubernetes.',
    tags: ['Kafka', 'Spark', 'Kubernetes', 'PyTorch'],
    role: 'Data Eng / SRE',
    link: 'https://github.com/yukthapriya/early-warning',
  },
];

export const EXPERIENCE: ExperienceItem[] = [
  {
    title: 'Graduate Research Assistant',
    company: 'Texas A&M University-San Antonio',
    period: '2024 – Present',
    type: 'MS Research · Machine Learning',
    bullets: [
      'Published IEEE Big Data research on model calibration for medical imaging via probabilistic embeddings; improved calibration AUC on benchmark datasets.',
      'Designed reproducible training pipelines, containerized workflows, and benchmarked contrastive learning robustness (AAAI).',
      'Mentored junior researchers on PyTorch best practices and research workflow.',
    ],
  },
  {
    title: 'Software Engineer',
    company: 'Digitalsoft AI Solutions',
    period: '2022 – 2024',
    type: 'Full-Stack & ML Engineering',
    bullets: [
      'Built generative AI assistants using LangChain and vector search; shipped 3+ consumer-facing features with full CI/CD and monitoring.',
      'Implemented API gateways and caching layers, reducing average response latency by ~35%.',
      'Architected data ingestion pipelines processing 10M+ records/day with Kafka and Spark.',
    ],
  },
];

export const PUBLICATIONS: Publication[] = [
  {
    title: 'Improving Medical Imaging Model Calibration through Probabilistic Embedding',
    venue: 'IEEE Big Data',
    year: '2024',
    link: 'https://ieeexplore.ieee.org/document/10825661/',
  },
  {
    title: 'Benchmarking the Robustness of Contrastive Learning Models',
    venue: 'AAAI',
    year: '2025',
    link: 'https://arxiv.org/abs/2501.09134',
  },
];

export const VOICE_INTRO_TEXT =
  "Hello — I'm Yuktha Priya. I build production web systems, machine learning pipelines, and data platforms. I enjoy shipping features end-to-end and turning research into reliable products. How may I help you?";
