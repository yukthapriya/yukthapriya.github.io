# Yuktha Priya Masupalli — Portfolio

Expert-level personal portfolio built with **React 19 + TypeScript + Vite**, showcasing engineering skills through the implementation itself.

## ✨ Expert-Level Features Implemented

### React Architecture
- **TypeScript** throughout — strict mode, typed props, interfaces, generics
- **Component-driven design** — 9 modular, reusable components
- **Custom Hooks** demonstrating React best practices:
  - `useScrollAnimation` — IntersectionObserver API for scroll-triggered animations
  - `useVoiceIntro` — Web Speech API encapsulated as a reusable hook
  - `useActiveSection` — IntersectionObserver-based nav highlighting
- **Centralized data layer** — all content in `src/data/portfolio.ts`

### Performance & UX
- Animated **skill progress bars** triggered by Intersection Observer
- Scroll-triggered **fade-in animations** for all sections
- **Animated hamburger → X** mobile nav with keyboard support
- **Holographic avatar** with dual rotating orbital rings
- Gradient **scroll indicator** on hero
- **Pulsing availability badge** in contact section
- Voice introduction using Web Speech API

### Accessibility
- `skip-link` for keyboard navigation
- `aria-label`, `aria-live`, `aria-pressed`, `role` attributes throughout
- Focus-visible outlines on all interactive elements
- `prefers-reduced-motion` safe animations via CSS

### SEO
- Structured data (JSON-LD / schema.org)
- Open Graph meta tags
- Semantic HTML5 (`<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`)

### Deployment
- **GitHub Actions** CI/CD pipeline that auto-builds and deploys to GitHub Pages on every push to `main`

## 🚀 Local Development

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # TypeScript check + Vite production build
npm run preview    # Preview production build locally
npm run lint       # ESLint check
```

## 📧 Email Setup (optional)

To enable the contact form, create a `.env.local` file:

```
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

## 🏗 Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 19 + TypeScript |
| Build tool | Vite 6 |
| Styling | Custom CSS with CSS variables + animations |
| Email | EmailJS |
| Icons | Font Awesome 6 |
| Fonts | Inter + Orbitron (Google Fonts) |
| Deploy | GitHub Actions → GitHub Pages |

## 📁 Project Structure

```
src/
├── components/       # 9 modular React components
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── About.tsx
│   ├── Skills.tsx
│   ├── Projects.tsx
│   ├── Experience.tsx
│   ├── Publications.tsx
│   ├── Contact.tsx
│   └── Footer.tsx
├── hooks/            # 3 custom React hooks
│   ├── useScrollAnimation.ts
│   ├── useVoiceIntro.ts
│   └── useActiveSection.ts
├── data/             # Centralized content data
│   └── portfolio.ts
├── types/            # TypeScript interfaces
│   └── index.ts
├── assets/           # Static assets
└── App.tsx           # Root component with JSON-LD injection
```
