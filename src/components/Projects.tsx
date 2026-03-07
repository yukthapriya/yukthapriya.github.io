import { useState } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { PROJECTS } from '../data/portfolio';
import type { Project } from '../types';

function ProjectCard({ project }: { project: Project }) {
  const [hovered, setHovered] = useState(false);

  return (
    <article
      className={`project-card${project.featured ? ' featured' : ''}${hovered ? ' hovered' : ''}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {project.featured && (
        <span className="featured-badge">
          <i className="fas fa-star" aria-hidden="true" /> Featured
        </span>
      )}
      <h3>{project.title}</h3>
      <p className="project-description">{project.description}</p>
      <div className="project-meta">
        <div className="project-tags">
          {project.tags.map((tag) => (
            <span key={tag} className="tag">{tag}</span>
          ))}
        </div>
        <span className="role">
          <i className="fas fa-user-gear" aria-hidden="true" /> {project.role}
        </span>
      </div>
      <a
        href={project.link}
        className="project-link"
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`View source code for ${project.title}`}
      >
        View Source <i className="fas fa-arrow-right" aria-hidden="true" />
      </a>
    </article>
  );
}

export default function Projects() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="projects" className="section projects-section">
      <div className="container">
        <h2 className="section-title">Selected Projects</h2>
        <p className="section-subtitle">
          A selection of systems I've built — combining frontend, backend, ML, and data engineering.
        </p>

        <div
          ref={ref}
          className={`projects-grid fade-in-section${isVisible ? ' visible' : ''}`}
        >
          {PROJECTS.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
