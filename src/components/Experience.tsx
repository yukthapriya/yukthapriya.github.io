import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { EXPERIENCE } from '../data/portfolio';

export default function Experience() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="experience" className="section experience">
      <div className="container">
        <h2 className="section-title">Experience</h2>
        <p className="section-subtitle">
          Building production systems and publishing research since 2022.
        </p>

        <div
          ref={ref}
          className={`timeline fade-in-section${isVisible ? ' visible' : ''}`}
        >
          {EXPERIENCE.map((item, idx) => (
            <div key={idx} className="timeline-item">
              <div className="timeline-dot" aria-hidden="true" />
              <div className="timeline-content">
                <div className="timeline-header">
                  <h3>{item.title}</h3>
                  <span className="timeline-company">{item.company}</span>
                </div>
                <p className="meta">
                  <i className="fas fa-calendar-alt" aria-hidden="true" /> {item.period} &nbsp;·&nbsp; {item.type}
                </p>
                <ul>
                  {item.bullets.map((bullet, bi) => (
                    <li key={bi}>{bullet}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
