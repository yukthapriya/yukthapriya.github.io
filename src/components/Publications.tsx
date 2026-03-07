import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { PUBLICATIONS } from '../data/portfolio';

export default function Publications() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="publications" className="section publications">
      <div className="container">
        <h2 className="section-title">Publications &amp; Education</h2>

        <div
          ref={ref}
          className={`pub-grid fade-in-section${isVisible ? ' visible' : ''}`}
        >
          {PUBLICATIONS.map((pub) => (
            <div key={pub.title} className="pub-card">
              <span className="pub-venue">{pub.venue} · {pub.year}</span>
              <h4>{pub.title}</h4>
              <a
                href={pub.link}
                target="_blank"
                rel="noopener noreferrer"
                className="pub-link"
                aria-label={`Read paper: ${pub.title}`}
              >
                Read paper <i className="fas fa-external-link-alt" aria-hidden="true" />
              </a>
            </div>
          ))}
        </div>

        <div className="education">
          <h3>
            <i className="fas fa-graduation-cap" aria-hidden="true" /> Education
          </h3>
          <ul>
            <li>
              <strong>MS in Computer Science</strong> — Texas A&amp;M University-San Antonio{' '}
              <span className="edu-gpa">GPA 3.87 / 4.0</span>
            </li>
            <li>
              <strong>B.Tech</strong> — Jawaharlal Nehru Technological University Anantapur (JNTUA)
            </li>
            <li>
              <strong>Diploma</strong> — S.V. Government Polytechnic
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
