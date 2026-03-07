import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Publications from './components/Publications';
import Contact from './components/Contact';
import Footer from './components/Footer';
import './App.css';

// JSON-LD structured data for SEO
const STRUCTURED_DATA = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Yuktha Priya Masupalli',
  jobTitle: ['Software Engineer', 'AI Researcher', 'Data Engineer'],
  url: 'https://yukthapriya.github.io/',
  sameAs: [
    'https://www.linkedin.com/in/yukthapriya',
    'https://github.com/yukthapriya',
    'https://scholar.google.com/citations?hl=en&user=UkX-bOYAAAAJ',
  ],
};

export default function App() {
  // Inject JSON-LD structured data for SEO
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(STRUCTURED_DATA);
    document.head.appendChild(script);
    return () => {
      try {
        document.head.removeChild(script);
      } catch {
        // noop – already removed
      }
    };
  }, []);

  return (
    <div className="app-root">
      {/* Accessibility: skip to main content */}
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      {/* Decorative starfield background */}
      <div className="stars" aria-hidden="true" />
      <div className="stars2" aria-hidden="true" />

      <Navbar />

      <main id="main" tabIndex={-1}>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Publications />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
