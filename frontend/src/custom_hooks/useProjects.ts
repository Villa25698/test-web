import { useState, useEffect } from 'react';
import { z } from 'zod';
import { addProject as addProjectToBackend } from '../services/api'; 

const ProjectSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  Languages: z.array(z.string()),
  status: z.string(),
  link: z.string().url(),
  createdAt: z.string(),
  category: z.string(),
  tags: z.array(z.string()),
  public: z.boolean(),
  demos: z.array(z.string()).optional(),
  author: z.string(),
});

interface Project {
  id: number;
  title: string;
  description: string;
  Languages: string[];
  status: string;
  link: string;
  createdAt: string;
  category: string;
  tags: string[];
  public: boolean;
  demos?: string[];
  author: string;
}

const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [showCategoryCount, setShowCategoryCount] = useState(false);

  useEffect(() => {
    fetch('http://localhost:3000/projects')
      .then((response) => response.json())
      .then((data) => {
        const parsedProjects = z.array(ProjectSchema).parse(data);
        setProjects(parsedProjects); 
      })
      .catch((error) => {
        console.error('Error fetching projects:', error);
      });
  }, []);

  const categoryCount = projects.reduce((acc: { [key: string]: number }, project: Project) => {
    acc[project.category] = (acc[project.category] || 0) + 1;
    return acc;
  }, {});

  const addProject = (newProject: Project) => {
    setProjects([...projects, newProject]);
    addProjectToBackend(newProject);
  };

  return { projects, showCategoryCount, setShowCategoryCount, categoryCount, addProject };
};

export default useProjects;
