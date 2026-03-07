import { useScrollAnimation } from '../hooks/useScrollAnimation';

export default function About() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="about" className="section about">
      <div
        ref={ref}
        className={`container about-grid fade-in-section${isVisible ? ' visible' : ''}`}
      >
        <div className="about-blurb">
          <h2>About Me</h2>
          <p>
            I'm a results-driven software engineer and researcher who builds end-to-end systems:
            user-facing frontends, backend services, ML pipelines, and data platforms. I ship
            product features with rigorous testing, observability, and team collaboration. I enjoy
            mentoring, code reviews, and turning models into reliable services.
          </p>
          <p>
            I aim to join a team where I can contribute across the stack — from prototyping ML
            models to productionising them with repeatable data workflows.
          </p>
          <p className="edu-line">
            <i className="fas fa-graduation-cap" aria-hidden="true" />{' '}
            <strong>MS Computer Science</strong> — Texas A&amp;M University-San Antonio (GPA 3.87/4.0)
          </p>

          <div className="contact-actions">
            <a className="btn btn-primary" href="mailto:hello@yukthapriya.com">
              <i className="fas fa-paper-plane" aria-hidden="true" /> Email
            </a>
            <a
              className="btn btn-outline"
              href="https://github.com/yukthapriya"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-github" aria-hidden="true" /> GitHub
            </a>
            <a
              className="btn btn-outline"
              href="https://www.linkedin.com/in/yukthapriya"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-linkedin" aria-hidden="true" /> LinkedIn
            </a>
            <a
              className="btn btn-outline"
              href="https://scholar.google.com/citations?hl=en&user=UkX-bOYAAAAJ"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fas fa-graduation-cap" aria-hidden="true" /> Scholar
            </a>
          </div>
        </div>

        {/* Quick stats */}
        <div className="about-stats">
          {[
            { value: '2+', label: 'Years industry experience' },
            { value: '2', label: 'IEEE / AAAI publications' },
            { value: '3+', label: 'Production ML systems shipped' },
            { value: '3.87', label: 'GPA (MS, Texas A&M)' },
          ].map((stat) => (
            <div key={stat.label} className="stat-card">
              <span className="stat-value">{stat.value}</span>
              <span className="stat-label">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
