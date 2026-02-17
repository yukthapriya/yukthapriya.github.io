import React, { useEffect, useRef, useState } from "react";
import "./App.css";

function useIsClient() {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => setIsClient(true), []);
  return isClient;
}

const VOICE_TEXT = `Hello — I'm Yuktha Priya. I build production web systems, machine learning models, and data platforms.
I enjoy shipping features end-to-end and turning research into reliable products. How may I help you?`;

export default function App() {
  const isClient = useIsClient();
  const [navOpen, setNavOpen] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const voiceUtterRef = useRef(null);

  // Inject JSON-LD Person structured data (client-only)
  useEffect(() => {
    if (!isClient) return;
    const ld = {
      "@context": "https://schema.org",
      "@type": "Person",
      name: "Yuktha Priya Masupalli",
      jobTitle: ["Software Engineer", "AI Researcher", "Data Engineer"],
      url: window.location.origin + "/",
      sameAs: [
        "https://www.linkedin.com/in/yukthapriya",
        "https://github.com/yukthapriya",
        "https://scholar.google.com/citations?hl=en&user=UkX-bOYAAAAJ",
      ],
    };
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.innerHTML = JSON.stringify(ld);
    document.head.appendChild(script);
    return () => {
      try {
        document.head.removeChild(script);
      } catch (e) {}
    };
  }, [isClient]);

  useEffect(() => {
    // Close mobile nav on escape
    const onKey = (e) => {
      if (e.key === "Escape") setNavOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  // Voice synthesis helpers (guarded)
  const speak = async (text = VOICE_TEXT) => {
    if (!isClient || !("speechSynthesis" in window)) {
      alert("Speech synthesis not supported in this browser.");
      return;
    }

    const synth = window.speechSynthesis;

    try {
      // Cancel any pending speech, then speak
      synth.cancel();
    } catch (e) {
      // ignore
    }

    const utter = new SpeechSynthesisUtterance(text);
    utter.rate = 0.96;
    utter.pitch = 1.02;
    utter.volume = 0.95;

    // try to pick a good english voice
    const voices = synth.getVoices ? synth.getVoices() : [];
    if (voices && voices.length) {
      const preferred =
        voices.find((v) => /samantha/i.test(v.name)) ||
        voices.find((v) => /google us english female/i.test(v.name)) ||
        voices.find((v) => /female/i.test(v.name) && /en/i.test(v.lang)) ||
        voices.find((v) => /en/i.test(v.lang)) ||
        voices[0];
      if (preferred) utter.voice = preferred;
    }

    utter.onstart = () => {
      voiceUtterRef.current = utter;
      setSpeaking(true);
    };
    utter.onend = () => {
      voiceUtterRef.current = null;
      setSpeaking(false);
    };
    utter.onerror = () => {
      voiceUtterRef.current = null;
      setSpeaking(false);
    };

    try {
      synth.speak(utter);
    } catch (err) {
      console.error("speak error", err);
      setSpeaking(false);
    }
  };

  const toggleVoice = () => {
    if (!isClient || !("speechSynthesis" in window)) {
      alert("Speech synthesis not supported in this browser.");
      return;
    }
    const synth = window.speechSynthesis;
    if (synth.speaking || synth.pending) {
      // Stop speaking
      try {
        synth.cancel();
      } catch (e) {}
      setSpeaking(false);
      return;
    }
    speak();
  };

  // Contact form: open mailto with form values
  const onContactSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();
    const subject = encodeURIComponent(`Portfolio contact from ${name || "website visitor"}`);
    const body = encodeURIComponent(`${message}\n\n---\nFrom: ${name}\nEmail: ${email}`);
    window.location.href = `mailto:hello@yukthapriya.com?subject=${subject}&body=${body}`;
  };

  return (
    <div className="app-root">
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <div className="stars" aria-hidden="true" />
      <div className="stars2" aria-hidden="true" />

      <nav className="site-nav" role="navigation" aria-label="Main">
        <div className="container nav-inner">
          <a className="logo" href="/">
            Yuktha Priya
          </a>

          <button
            className="nav-toggle"
            aria-expanded={navOpen}
            aria-controls="primary-nav"
            aria-label="Toggle navigation"
            onClick={() => setNavOpen((v) => !v)}
          >
            <span className="hamburger" aria-hidden="true" />
          </button>

          <div id="primary-nav" className="nav-links" data-visible={navOpen}>
            <a href="#about" onClick={() => setNavOpen(false)}>
              About
            </a>
            <a href="#skills" onClick={() => setNavOpen(false)}>
              Skills
            </a>
            <a href="#projects" onClick={() => setNavOpen(false)}>
              Projects
            </a>
            <a href="#experience" onClick={() => setNavOpen(false)}>
              Experience
            </a>
            <a href="#publications" onClick={() => setNavOpen(false)}>
              Publications
            </a>
            <a href="#contact" onClick={() => setNavOpen(false)}>
              Contact
            </a>
            <a className="btn btn-small nav-resume" href="resume.pdf" download>
              Resume
            </a>
          </div>
        </div>
      </nav>

      <main id="main" tabIndex={-1}>
        {/* HERO */}
        <section className="hero">
          <div className="container hero-grid">
            <div className="holo-avatar">
              <img
                src="Photo-800.jpg"
                srcSet="Photo-400.jpg 400w, Photo-800.jpg 800w, Photo-1200.jpg 1200w"
                sizes="(max-width: 600px) 160px, (max-width: 1200px) 260px, 320px"
                alt="Yuktha Priya Masupalli"
                loading="lazy"
              />
              <div className="holo-ring" aria-hidden="true" />
            </div>

            <div className="hero-body">
              <p className="eyebrow">
                Open to roles: Full-Stack · Frontend · AI/ML · Data Science · Data Engineering
              </p>

              <h1 className="headline">Product-minded engineer building scalable web & ML systems</h1>

              <p className="lead">
                I design and ship production web apps, ML models, and data platforms that solve real problems.
                Strong in frontend (React), backend & APIs (Node/Go), ML/AI (PyTorch, LLMs), and data engineering
                (ETL, Spark, BigQuery). I bridge research and engineering — publishing in IEEE & AAAI — and deliver robust,
                monitored systems.
              </p>

              <div className="hero-ctas">
                <a className="btn btn-primary" href="resume.pdf" download>
                  <i className="fas fa-download" aria-hidden="true" /> Download Resume
                </a>
                <a className="btn btn-outline" href="#contact">
                  <i className="fas fa-envelope" aria-hidden="true" /> Contact Me
                </a>
                <button
                  id="activate-voice"
                  className={`btn voice-btn ${speaking ? "active" : ""}`}
                  aria-pressed={speaking}
                  onClick={toggleVoice}
                >
                  <i className="fas fa-microphone" aria-hidden="true" /> Voice Intro
                </button>
              </div>

              <ul className="highlights" aria-hidden="false">
                <li>
                  <strong>Production systems:</strong> Deployed microservices, CI/CD, logs & alerting
                </li>
                <li>
                  <strong>ML at scale:</strong> Model training, evaluation, interpretability & deployment
                </li>
                <li>
                  <strong>Data platforms:</strong> Pipelines, warehousing, OLAP & streaming ingestion
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* ABOUT & SKILLS */}
        <section id="about" className="section about">
          <div className="container about-grid">
            <div className="about-blurb">
              <h2>About Me</h2>
              <p>
                I'm a results-driven software engineer and researcher who builds end-to-end systems:
                user-facing frontends, backend services, ML pipelines, and data platforms. I ship product features
                with rigorous testing, observability, and team collaboration.
              </p>

              <p>
                I aim to join a team where I can contribute across the stack — from prototyping ML models to productionizing
                them with repeatable data workflows.
              </p>

              <div className="contact-actions">
                <a className="btn btn-primary" href="mailto:hello@yukthapriya.com">
                  <i className="fas fa-paper-plane" /> Email
                </a>
                <a className="btn btn-outline" href="https://github.com/yukthapriya" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-github" /> GitHub
                </a>
                <a className="btn btn-outline" href="https://www.linkedin.com/in/yukthapriya" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-linkedin" /> LinkedIn
                </a>
              </div>
            </div>

            <aside id="skills" className="skills-cards">
              <h3>Core Competencies</h3>
              <div className="skills-grid">
                <div className="skill-card">
                  <h4>Frontend & UI</h4>
                  <p>
                    React, TypeScript, Next.js, Vite, HTML5, CSS3, Tailwind, accessibility, performance tuning,
                    component-driven design
                  </p>
                </div>

                <div className="skill-card">
                  <h4>Backend & APIs</h4>
                  <p>Node.js, Express, Go, REST & GraphQL, Postgres, Redis, auth, testing, containerization</p>
                </div>

                <div className="skill-card">
                  <h4>ML / AI</h4>
                  <p>PyTorch, Hugging Face, LLM prompting & tuning, CLIP, computer vision, model evaluation</p>
                </div>

                <div className="skill-card">
                  <h4>Data Engineering</h4>
                  <p>Airflow, Spark, Kafka, BigQuery, Snowflake, ETL/ELT, data quality & observability</p>
                </div>

                <div className="skill-card">
                  <h4>DevOps & Infra</h4>
                  <p>Kubernetes, Docker, Terraform, GitHub Actions, monitoring (Prometheus, Grafana)</p>
                </div>

                <div className="skill-card">
                  <h4>Product & Process</h4>
                  <p>Agile, RFCs, mentoring, experiments, A/B testing, product-first engineering</p>
                </div>
              </div>
            </aside>
          </div>
        </section>

        {/* PROJECTS */}
        <section id="projects" className="section projects-section">
          <div className="container">
            <h2>Selected Projects</h2>
            <div className="projects-grid">
              <article className="project-card">
                <h3>JagCoach — Multimodal Coaching Agent</h3>
                <p className="project-description">
                  Voice + video + text agent that observes behavior, plans coaching steps, and integrates calendar/search/analytics tools.
                  Built frontend UI (React), backend orchestration, and CLIP-based vision module.
                </p>
                <div className="project-meta">
                  <span className="tag">React</span>
                  <span className="tag">PyTorch</span>
                  <span className="tag">GCP</span>
                  <span className="role">Role: Full-Stack / ML</span>
                </div>
                <a className="project-link" href="https://github.com/yukthapriya/jagcoach" target="_blank" rel="noopener noreferrer">
                  Source →
                </a>
              </article>

              <article className="project-card">
                <h3>Autonomous Recommendation Agent</h3>
                <p className="project-description">
                  Graph-based recommender using Neo4j and LLM planning for personalized university recommendations.
                  Focus: data modeling, ranking & evaluation, API endpoints for recommendations.
                </p>
                <div className="project-meta">
                  <span className="tag">Neo4j</span>
                  <span className="tag">LangChain</span>
                  <span className="tag">Node.js</span>
                  <span className="role">Role: Data / Backend</span>
                </div>
                <a className="project-link" href="https://github.com/yukthapriya/recommender" target="_blank" rel="noopener noreferrer">
                  Source →
                </a>
              </article>

              <article className="project-card">
                <h3>Public Health Early-Warning Agent</h3>
                <p className="project-description">
                  Multimodal monitoring pipeline that detects public health signals and triggers autonomous alerts.
                  Built streaming ingestion, anomaly detection, and alerting on Kubernetes.
                </p>
                <div className="project-meta">
                  <span className="tag">Kafka</span>
                  <span className="tag">Spark</span>
                  <span className="tag">Kubernetes</span>
                  <span className="role">Role: Data Eng / SRE</span>
                </div>
                <a className="project-link" href="https://github.com/yukthapriya/early-warning" target="_blank" rel="noopener noreferrer">
                  Source →
                </a>
              </article>
            </div>
          </div>
        </section>

        {/* EXPERIENCE */}
        <section id="experience" className="section experience">
          <div className="container">
            <h2>Experience</h2>
            <div className="timeline">
              <div className="timeline-item">
                <h3>Graduate Research Assistant — Texas A&M</h3>
                <p className="meta">MS Research · Machine Learning · 2024–Present</p>
                <ul>
                  <li>
                    Published research on model calibration for medical imaging (IEEE). Implemented probabilistic embeddings and
                    evaluation pipelines — replace with real metrics where available.
                  </li>
                  <li>Designed reproducible, containerized training pipelines and experiments.</li>
                </ul>
              </div>

              <div className="timeline-item">
                <h3>Software Engineer — Digitalsoft AI Solutions</h3>
                <p className="meta">Full-Stack & ML Engineering · 2022–2024</p>
                <ul>
                  <li>Built generative assistants using LangChain and vector search; shipped multiple features with CI/CD & monitoring.</li>
                  <li>Implemented API gateways and optimizations to reduce latency — replace with your metrics.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* PUBLICATIONS */}
        <section id="publications" className="section publications">
          <div className="container">
            <h2>Publications & Education</h2>
            <div className="pub-grid">
              <div className="pub-card">
                <h4>Improving Medical Imaging Model Calibration through Probabilistic Embedding</h4>
                <p className="venue">IEEE Big Data</p>
                <a href="https://ieeexplore.ieee.org/document/10825661/" target="_blank" rel="noopener noreferrer">
                  Read →
                </a>
              </div>
              <div className="pub-card">
                <h4>Benchmarking the Robustness of Contrastive Learning Models</h4>
                <p className="venue">AAAI</p>
                <a href="https://arxiv.org/abs/2501.09134" target="_blank" rel="noopener noreferrer">
                  Read →
                </a>
              </div>
            </div>

            <div className="education">
              <h4>Education</h4>
              <p>
                MS in Computer Science — Texas A&M University-San Antonio (GPA 3.87/4.0). B.Tech & Diploma — JNTUA / S.V Govt. Polytechnic.
              </p>
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="section contact-section">
          <div className="container contact-grid">
            <div>
              <h2>Let's build something</h2>
              <p>
                Open to Full-time & Contract roles across product engineering, ML/AI teams, and data platforms. Available for interviews.
              </p>

              <div className="contact-actions">
                <a className="btn btn-primary" href="mailto:hello@yukthapriya.com">
                  <i className="fas fa-envelope" /> Email me
                </a>
                <a className="btn btn-outline" href="https://github.com/yukthapriya" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-github" /> GitHub
                </a>
                <a className="btn btn-outline" href="https://www.linkedin.com/in/yukthapriya" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-linkedin" /> LinkedIn
                </a>
              </div>
            </div>

            <form className="contact-form" onSubmit={onContactSubmit} aria-label="Contact form (mailto)">
              <label htmlFor="name">Your name</label>
              <input id="name" name="name" type="text" required />

              <label htmlFor="email">Your email</label>
              <input id="email" name="email" type="email" required />

              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" rows={5} required />

              <button className="btn btn-primary" type="submit">
                Send message
              </button>
            </form>
          </div>
        </section>
      </main>

      <footer>
        <div className="container footer-inner">
          <p>© {new Date().getFullYear()} Yuktha Priya Masupalli — Software Engineer · AI / ML · Data</p>
          <div className="social-footer">
            <a href="https://github.com/yukthapriya" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-github" />
            </a>
            <a href="https://www.linkedin.com/in/yukthapriya" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-linkedin" />
            </a>
            <a href="https://scholar.google.com/citations?hl=en&user=UkX-bOYAAAAJ" target="_blank" rel="noopener noreferrer">
              <i className="fa-solid fa-graduation-cap" />
            </a>
          </div>
        </div>
      </footer>

      <style>{`
        /* ensure main takes remaining space */
        html,body,#root{height:100%}
        .app-root{min-height:100%;display:flex;flex-direction:column}
        main{flex:1}
      `}</style>
    </div>
  );
}
