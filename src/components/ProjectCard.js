import React from 'react';
import MindMapButton from '@site/src/components/MindMapButton';
import {buildProjectBranches} from '@site/src/components/MindMap/fromProject';

export default function ProjectCard({title, description, techStack, githubUrl, impactMetrics}) {
  const mindMapBranches = buildProjectBranches({description, techStack, impactMetrics, githubUrl});

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
        <br />
        <MindMapButton
          variant="inline"
          branches={mindMapBranches}
          title={title}
          subtitle={techStack && techStack.join(' • ')}
        />
      </div>
    </div>
  );
}
