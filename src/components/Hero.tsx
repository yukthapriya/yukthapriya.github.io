import { useState } from 'react';
import { useVoiceIntro } from '../hooks/useVoiceIntro';
import { VOICE_INTRO_TEXT } from '../data/portfolio';
import Photo from '../assets/Photo.jpg';

export default function Hero() {
  const { speaking, toggle: toggleVoice } = useVoiceIntro(VOICE_INTRO_TEXT);
  const [imgSrc, setImgSrc] = useState<string>(Photo);

  const onImgError = () => {
    if (imgSrc !== '/Photo.jpg') {
      setImgSrc('/Photo.jpg');
    }
  };

  return (
    <section className="hero" aria-label="Introduction">
      <div className="container hero-grid">
        {/* Avatar */}
        <div className="holo-avatar">
          <div className="avatar-wrapper">
            <img
              src={imgSrc}
              alt="Yuktha Priya Masupalli"
              loading="eager"
              decoding="async"
              onError={onImgError}
            />
          </div>
          <div className="holo-ring" aria-hidden="true" />
          <div className="holo-ring holo-ring-2" aria-hidden="true" />
        </div>

        {/* Body */}
        <div className="hero-body">
          <p className="eyebrow animate-fade-in">
            Open to roles: Full-Stack &nbsp;·&nbsp; Frontend &nbsp;·&nbsp; Systems &nbsp;·&nbsp; ML &nbsp;·&nbsp; Data Engineering
          </p>

          <h1 className="headline animate-slide-up">
            Engineer for scale —<br />
            <span className="headline-accent">product, systems &amp; ML</span>
          </h1>

          <p className="lead animate-fade-in-delay">
            I ship large-scale web systems and machine learning pipelines: production APIs,
            low-latency services, distributed training, model deployment, and data platforms.
            I design for observability, reliability, and measurable impact.
          </p>

          <div className="hero-ctas animate-fade-in-delay-2">
            <a className="btn btn-primary" href="/Resume.pdf" download>
              <i className="fas fa-download" aria-hidden="true" /> Download Resume
            </a>
            <a className="btn btn-outline" href="#contact">
              <i className="fas fa-envelope" aria-hidden="true" /> Contact
            </a>
            <button
              id="activate-voice"
              className={`btn voice-btn${speaking ? ' active' : ''}`}
              aria-pressed={speaking}
              onClick={toggleVoice}
              title="Listen to voice introduction"
            >
              <i className={`fas ${speaking ? 'fa-stop' : 'fa-microphone'}`} aria-hidden="true" />
              {speaking ? 'Stop' : 'Voice Intro'}
            </button>
          </div>

          <ul className="highlights animate-fade-in-delay-3" role="list">
            <li>
              <i className="fas fa-bolt" aria-hidden="true" />
              <span><strong>Systems &amp; scale:</strong> Low-latency APIs, horizontal scaling, caching &amp; CDN</span>
            </li>
            <li>
              <i className="fas fa-brain" aria-hidden="true" />
              <span><strong>ML → Product:</strong> End-to-end model lifecycle, reproducible pipelines, model monitoring</span>
            </li>
            <li>
              <i className="fas fa-database" aria-hidden="true" />
              <span><strong>Distributed data:</strong> Streaming ingestion, columnar warehousing, OLAP &amp; served features</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Scroll indicator */}
      <a href="#about" className="scroll-indicator" aria-label="Scroll to About section">
        <span className="scroll-dot" />
      </a>
    </section>
  );
}
