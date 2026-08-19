import {splitSentences, truncate} from './utils';

/**
 * Builds mind map branches straight from a project card's own fields
 * (description, tech stack, impact metrics, repo link) instead of parsing
 * headings - project cards are short structured data, not long-form content.
 */
export function buildProjectBranches({description, techStack, impactMetrics, githubUrl}) {
  const branches = [];

  if (description) {
    branches.push({
      title: 'Overview',
      subtitle: 'What this project does',
      topics: [
        {
          name: 'Description',
          points: splitSentences(description)
            .slice(0, 5)
            .map((s) => truncate(s, 160)),
        },
      ],
    });
  }

  if (techStack && techStack.length > 0) {
    branches.push({
      title: 'Tech stack',
      subtitle: 'Tools and technologies used',
      topics: [{name: 'Technologies', points: techStack.slice(0, 5)}],
    });
  }

  if (impactMetrics && impactMetrics.length > 0) {
    branches.push({
      title: 'Impact',
      subtitle: 'Outcomes and results',
      topics: [{name: 'Results', points: impactMetrics.slice(0, 5)}],
    });
  }

  if (githubUrl) {
    branches.push({
      title: 'Links',
      subtitle: 'Where to find the code',
      topics: [{name: 'Repository', points: [githubUrl]}],
    });
  }

  return branches;
}
