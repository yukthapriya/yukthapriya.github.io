// src/App.js
import React, { useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import "./App.css";
import Photo from "./assets/Photo.jpg"; // place your Photo.jpg in src/assets/Photo.jpg
import AvatarFallback from "./assets/avatar-fallback.svg"; // optional: a small inline svg file you can add

// Replace these env names in your .env file (see instructions below)
const EMAILJS_SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICE_ID || "";
const EMAILJS_TEMPLATE_ID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID || "";
const EMAILJS_PUBLIC_KEY = process.env.REACT_APP_EMAILJS_PUBLIC_KEY || "";

const VOICE_TEXT = `Hello — I'm Yuktha Priya. I build production web systems, scalable ML models and data platforms.
I enjoy shipping features end-to-end and turning research into reliable products. How may I help you?`;

export default function App() {
  const [navOpen, setNavOpen] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [imgSrc, setImgSrc] = useState(Photo);
  const [sending, setSending] = useState(false);
  const [sendResult, setSendResult] = useState(null); // { ok: true|false, msg: "" }
  const formRef = useRef(null);

  // Ensure JSON-LD is injected client-side (optional)
  useEffect(() => {
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
    const s = document.createElement("script");
    s.type = "application/ld+json";
    s.innerHTML = JSON.stringify(ld);
    document.head.appendChild(s);
    return () => {
      try { document.head.removeChild(s); } catch (e) {}
    };
  }, []);

  // Image error handler: if import fails or path case mismatch, fallback to default
  const onImgError = (e) => {
    if (imgSrc === AvatarFallback) return;
    // try public path as fallback
    const publicFallback = `${process.env.PUBLIC_URL || ""}/Photo.jpg`;
    if (imgSrc !== publicFallback) {
      setImgSrc(publicFallback);
      return;
    }
    // final fallback to inline svg asset if present
    setImgSrc(AvatarFallback);
  };

  // EMAIL: send via EmailJS (client-only). Configure EmailJS account and template first.
  const sendEmail = async (e) => {
    e.preventDefault();
    if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
      setSendResult({ ok: false, msg: "Email service not configured. See README/setup instructions." });
      return;
    }
    const form = formRef.current;
    setSending(true);
    setSendResult(null);
    try {
      const res = await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        form,
        EMAILJS_PUBLIC_KEY
      );
      setSendResult({ ok: true, msg: "Message sent — thank you! I will reply within 48 hours." });
      form.reset();
    } catch (err) {
      console.error("EmailJS error:", err);
      setSendResult({ ok: false, msg: "Failed to send message. Try again or email hello@yukthapriya.com directly." });
    } finally {
      setSending(false);
    }
  };

  // Simple Voice Intro
  const toggleVoice = () => {
    if (!("speechSynthesis" in window)) {
      alert("Speech synthesis not supported.");
      return;
    }
    const synth = window.speechSynthesis;
    if (synth.speaking || synth.pending) {
      synth.cancel();
      setSpeaking(false);
      return;
    }
    const u = new SpeechSynthesisUtterance(VOICE_TEXT);
    u.rate = 0.95;
    u.pitch = 1.02;
    u.volume = 0.95;
    u.onstart = () => setSpeaking(true);
    u.onend = () => setSpeaking(false);
    synth.cancel();
    synth.speak(u);
  };

  // Helpful keyboard handler to close nav on Escape
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setNavOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="app-root">
      <a className="skip-link" href="#main">Skip to content</a>

      <div className="stars" aria-hidden="true" />
      <div className="stars2" aria-hidden="true" />

      <nav className="site-nav" role="navigation" aria-label="Main">
        <div className="container nav-inner">
          {/* Professional logo: compact SVG icon + name/title */}
          <a href="/" className="logo" aria-label="Home — Yuktha Priya Masupalli">
            <svg width="36" height="36" viewBox="0 0 36 36" role="img" aria-hidden="true" focusable="false">
              <defs><linearGradient id="g" x1="0" x2="1"><stop offset="0" stopColor="#00d4ff" /><stop offset="1" stopColor="#00ff9d" /></linearGradient></defs>
              <rect rx="8" width="36" height="36" fill="url(#g)"></rect>
              <text x="50%" y="57%" textAnchor="middle" fontFamily="Orbitron, sans-serif" fontWeight="700" fontSize="14" fill="#001">YP</text>
            </svg>
            <span className="logo-text">
              Yuktha Priya <span className="logo-dot">·</span><small className="logo-role">Software & ML Engineer</small>
            </span>
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
            <a href="#about" onClick={() => setNavOpen(false)}>About</a>
            <a href="#skills" onClick={() => setNavOpen(false)}>Skills</a>
            <a href="#projects" onClick={() => setNavOpen(false)}>Projects</a>
            <a href="#experience" onClick={() => setNavOpen(false)}>Experience</a>
            <a href="#publications" onClick={() => setNavOpen(false)}>Publications</a>
            <a href="#contact" onClick={() => setNavOpen(false)}>Contact</a>
            <a className="btn btn-small nav-resume" href="resume.pdf" download>Resume</a>
          </div>
        </div>
      </nav>

      <main id="main" tabIndex={-1}>
        {/* HERO */}
        <section className="hero">
          <div className="container hero-grid">
            <div className="holo-avatar">
              <img
                src={imgSrc}
                srcSet={`${Photo} 800w`}
                alt="Yuktha Priya Masupalli"
                loading="lazy"
                onError={onImgError}
              />
              <div className="holo-ring" aria-hidden="true" />
            </div>

            <div className="hero-body">
              <p className="eyebrow">Open to roles: Full-Stack · Frontend · Systems · ML · Data Engineering</p>

              <h1 className="headline">Engineer for scale — product, systems & ML</h1>

              <p className="lead">
                I ship large-scale web systems and machine learning pipelines: production APIs, low-latency services,
                distributed training, model deployment and data platforms. I design for observability, reliability, and measurable impact.
              </p>

              <div className="hero-ctas">
                <a className="btn btn-primary" href="resume.pdf" download><i className="fas fa-download" aria-hidden="true" /> Download Resume</a>
                <a className="btn btn-outline" href="#contact"><i className="fas fa-envelope" aria-hidden="true" /> Contact</a>
                <button id="activate-voice" className={`btn voice-btn ${speaking ? "active" : ""}`} aria-pressed={speaking} onClick={toggleVoice}>
                  <i className="fas fa-microphone" aria-hidden="true" /> Voice Intro
                </button>
              </div>

              <ul className="highlights">
                <li><strong>Systems & scale:</strong> Low-latency APIs, horizontal scaling, caching & CDN strategies</li>
                <li><strong>ML → Product:</strong> End-to-end model lifecycle, reproducible pipelines, model monitoring</li>
                <li><strong>Distributed data:</strong> Streaming ingestion, columnar warehousing, OLAP & served features</li>
              </ul>
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="section contact-section">
          <div className="container contact-grid">
            <div>
              <h2>Let's build at scale</h2>
              <p>Open to Senior / Staff / Principal roles across product engineering, ML/AI, and data platforms. I enjoy architecture, mentoring, and technical leadership.</p>

              <div className="contact-actions">
                <a className="btn btn-primary" href="mailto:hello@yukthapriya.com"><i className="fas fa-envelope" /> Email</a>
                <a className="btn btn-outline" href="https://github.com/yukthapriya" target="_blank" rel="noopener noreferrer"><i className="fab fa-github" /> GitHub</a>
                <a className="btn btn-outline" href="https://www.linkedin.com/in/yukthapriya" target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin" /> LinkedIn</a>
              </div>
            </div>

            <form ref={formRef} className="contact-form" onSubmit={sendEmail} aria-label="Contact form">
              <label htmlFor="name">Your name</label>
              <input id="name" name="user_name" type="text" required />

              <label htmlFor="email">Your email</label>
              <input id="email" name="user_email" type="email" required />

              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" rows={5} required />

              <button className="btn btn-primary" type="submit" disabled={sending}>
                {sending ? "Sending…" : "Send message"}
              </button>

              {sendResult && (
                <div className={`send-result ${sendResult.ok ? "ok" : "err"}`} role="status" aria-live="polite">
                  {sendResult.msg}
                </div>
              )}

              <div className="email-hint">
                Prefer not to use the form? Direct email: <a href="mailto:hello@yukthapriya.com">hello@yukthapriya.com</a>
              </div>
            </form>
          </div>
        </section>

        {/* ...Other sections (skills, projects, experience) remain unchanged... */}
      </main>

      <footer>
        <div className="container footer-inner">
          <p>© {new Date().getFullYear()} Yuktha Priya Masupalli — Software Engineer · ML · Data</p>
          <div className="social-footer">
            <a href="https://github.com/yukthapriya" target="_blank" rel="noopener noreferrer"><i className="fab fa-github" /></a>
            <a href="https://www.linkedin.com/in/yukthapriya" target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin" /></a>
            <a href="https://scholar.google.com/citations?hl=en&user=UkX-bOYAAAAJ" target="_blank" rel="noopener noreferrer"><i className="fa-solid fa-graduation-cap" /></a>
          </div>
        </div>
      </footer>

      {/* small runtime style to keep layout height correct */}
      <style>{`
        html,body,#root{height:100%}
        .app-root{min-height:100%;display:flex;flex-direction:column}
        main{flex:1}
        .send-result.ok{color:#88ffb0;margin-top:.6rem}
        .send-result.err{color:#ff8b88;margin-top:.6rem}
      `}</style>
    </div>
  );
}
