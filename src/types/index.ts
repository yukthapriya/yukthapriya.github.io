// ─── Data Types ──────────────────────────────────────────────────────────────

export interface SkillCategory {
  title: string;
  icon: string;
  skills: Skill[];
}

export interface Skill {
  name: string;
  level: number; // 0–100
}

export interface Project {
  title: string;
  description: string;
  tags: string[];
  role: string;
  link: string;
  featured?: boolean;
}

export interface ExperienceItem {
  title: string;
  company: string;
  period: string;
  type: string;
  bullets: string[];
}

export interface Publication {
  title: string;
  venue: string;
  year: string;
  link: string;
}

export interface NavLink {
  label: string;
  href: string;
}

// ─── Email Form ───────────────────────────────────────────────────────────────

export interface ContactFormData {
  user_name: string;
  user_email: string;
  message: string;
}

export type SendResult = { ok: true; msg: string } | { ok: false; msg: string };

// ─── Hook Return Types ────────────────────────────────────────────────────────

export interface UseScrollAnimationReturn {
  ref: React.RefObject<HTMLDivElement | null>;
  isVisible: boolean;
}
