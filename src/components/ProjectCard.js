import React from 'react';

export default function ProjectCard({title, description, techStack, githubUrl, impactMetrics}) {
  return (
    <div className="project-card">
      <h3>{title}</h3>
      <p>{description}</p>

      {techStack && techStack.length > 0 && (
        <div className="tech-badges">
          {techStack.map((tech) => (
            <span key={tech} className="tech-badge">
              {tech}
            </span>
          ))}
        </div>
      )}

      {impactMetrics && impactMetrics.length > 0 && (
        <ul className="impact-metrics">
          {impactMetrics.map((metric) => (
            <li key={metric}>{metric}</li>
          ))}
        </ul>
      )}

      <div className="project-links">
        <a href={githubUrl} target="_blank" rel="noopener noreferrer">
          View on GitHub →
        </a>
      </div>
    </div>
  );
}
