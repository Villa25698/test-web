import React, { useState, useEffect } from 'react';
import Modal from './Modal';

interface Project {
  id: number;
  title: string;
  description: string;
  Languages: string[];
  link: string;
  createdAt: string;
  category: string;
}

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [showCategoryCount, setShowCategoryCount] = useState(false);

  useEffect(() => {
    fetch('http://localhost:3000/projects')
      .then((response) => response.json())
      .then((data) => setProjects(data));
  }, []);

  const addProject = (newProject: Project) => {
    fetch('http://localhost:3000/projects', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newProject),
    })
      .then((response) => response.json())
      .then((data) => {
        setProjects([...projects, data]);
      });
  };

  const categoryCount = projects.reduce((acc: { [key: string]: number }, project) => {
    acc[project.category] = (acc[project.category] || 0) + 1;
    return acc;
  }, {});

  return (
    <section id="projects">
      <div className="button-container">
        <Modal onSave={(newProject) => setProjects([...projects, newProject])} />
        <button
          onClick={() => setShowCategoryCount(!showCategoryCount)}
          className="category-count-btn"
        >
          {showCategoryCount ? 'Hide Project Count' : 'Show Project Count'}
        </button>
      </div>

      <h2>Projects</h2>

      {showCategoryCount && (
        <div className="category-summary">
          <h3>Project Count per Category:</h3>
          {Object.keys(categoryCount).map((category) => (
            <p key={category}>
              {category}: {categoryCount[category]} project(s)
            </p>
          ))}
        </div>
      )}

      <div className="projects-container">
        {projects.map((project) => (
          <article key={project.id} className="project-card">
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <p>Languages: {project.Languages.join(', ')}</p>
            <a href={project.link} target="_blank" rel="noopener noreferrer">
              View Project
            </a>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Projects;
