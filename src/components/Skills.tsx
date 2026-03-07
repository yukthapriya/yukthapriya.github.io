import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { SKILL_CATEGORIES } from '../data/portfolio';
import type { Skill } from '../types';

function SkillBar({ name, level, isVisible }: Skill & { isVisible: boolean }) {
  return (
    <div className="skill-bar-row">
      <div className="skill-bar-header">
        <span className="skill-name">{name}</span>
        <span className="skill-percent">{level}%</span>
      </div>
      <div className="skill-bar-track" role="progressbar" aria-valuenow={level} aria-valuemin={0} aria-valuemax={100} aria-label={`${name}: ${level}%`}>
        <div
          className="skill-bar-fill"
          style={{ width: isVisible ? `${level}%` : '0%' }}
        />
      </div>
    </div>
  );
}

export default function Skills() {
  const { ref, isVisible } = useScrollAnimation(0.1);

  return (
    <section id="skills" className="section skills-section">
      <div className="container">
        <h2 className="section-title">Core Competencies</h2>
        <p className="section-subtitle">
          Technologies I use daily to design, build, and ship production systems.
        </p>

        <div
          ref={ref}
          className={`skills-grid fade-in-section${isVisible ? ' visible' : ''}`}
        >
          {SKILL_CATEGORIES.map((cat) => (
            <div key={cat.title} className="skill-card">
              <div className="skill-card-header">
                <i className={cat.icon} aria-hidden="true" />
                <h3>{cat.title}</h3>
              </div>
              <div className="skill-bars">
                {cat.skills.map((skill) => (
                  <SkillBar key={skill.name} {...skill} isVisible={isVisible} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
