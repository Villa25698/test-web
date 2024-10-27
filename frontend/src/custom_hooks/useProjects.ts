import { useState, useEffect } from 'react';
import { z } from 'zod';
import { addProject as addProjectToBackend } from '../services/api'; 


const ProjectSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  languages: z.array(z.string()),
  status: z.string(),
  link: z.string(),
  createdAt: z.string(),
  category: z.string(),
  tags: z.array(z.string()),
  public: z.boolean(),
  author: z.string(),
  demos: z.array(z.string()).optional(),
});

interface Project {
  id: number;
  title: string;
  description: string;
  languages: string[];
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
    const fetchProjects = async () => {
      try {
        const response = await fetch('http://localhost:3000/projects');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();

        console.log('Fetched data:', data);

        if (!Array.isArray(data)) {
          console.error('Expected an array but received:', data);
          setProjects([]);
          return;
        }

        const normalizedData = data.map((project: any) => ({
          ...project,
          languages: Array.isArray(project.languages) ? project.languages : [project.languages],
          tags: Array.isArray(project.tags) ? project.tags : [project.tags],
          demos: Array.isArray(project.demos) ? project.demos : project.demos ? [project.demos] : [],
        }));

        const parsedProjects = z.array(ProjectSchema).parse(normalizedData) as Project[];
        setProjects(parsedProjects);

      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
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

