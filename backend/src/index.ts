import { Hono } from 'hono';
import { serve } from '@hono/node-server';
import { PrismaClient } from '@prisma/client';
import { cors } from 'hono/cors';

const app = new Hono();
const prisma = new PrismaClient();

app.use("/*", cors());

async function testConnection() {
  try {
    await prisma.$connect();
    console.log('Database connection successful');
  } catch (error) {
    console.error('Database connection failed:', error);
  }
}

testConnection();



app.get('/projects', async (c) => {
  try {
    console.log('Attempting to fetch projects from the database...');

    const projects = await prisma.project.findMany({
      select: {
        id: true,
        title: true,
        description: true,
        status: true,
        link: true,
        createdAt: true,
        category: true,
        public: true,
        author: true,
        languages: { select: { name: true } },
        tags: { select: { name: true } },
        demos: { select: { url: true } },
      },
    });

    console.log('Raw projects data:', projects);

    const normalizedProjects = projects.map((project) => ({
      ...project,
      languages: project.languages.map((lang) => lang.name),
      tags: project.tags.map((tag) => tag.name),
      demos: project.demos.map((demo) => demo.url),
    }));
    
    console.log('Normalized projects data:', normalizedProjects);

    return c.json(normalizedProjects);
  } catch (err) {
    const error = err as Error;
    console.error('Error fetching projects:', error.stack);
    console.log('Error details:', error.message);

    return c.json({ error: 'Failed to fetch projects', details: error.message }, 500);
  }
});

app.get('/projects/:id', async (c) => {
  const projectId = Number(c.req.param('id'));

  if (isNaN(projectId)) {
    return c.json({ error: 'Invalid project ID' }, 400);
  }

  try {
    const project = await prisma.project.findUnique({
      where: { id: projectId },
      select: {
        id: true,
        title: true,
        description: true,
        status: true,
        link: true,
        createdAt: true,
        category: true,
        public: true,
        author: true,
        languages: { select: { name: true } },
        tags: { select: { name: true } },
        demos: { select: { url: true } },
      },
    });

    if (!project) {
      return c.json({ error: 'Project not found' }, 404);
    }

    const normalizedProject = {
      ...project,
      languages: project.languages.map((lang) => lang.name),
      tags: project.tags.map((tag) => tag.name),
      demos: project.demos.map((demo) => demo.url),
    };

    return c.json(normalizedProject);
  } catch (error) {
    console.error('Error fetching project:', error);
    return c.json({ error: 'Failed to fetch project' }, 500);
  }
});



app.post('/add-project', async (c) => {
  const newProject = await c.req.json();
  try {
    const project = await prisma.project.create({
      data: {
        title: newProject.title,
        description: newProject.description,
        status: newProject.status,
        link: newProject.link,
        createdAt: new Date(newProject.createdAt),
        category: newProject.category,
        public: newProject.public,
        author: newProject.author,
        languages: {
          create: (newProject.languages || []).map((lang: string) => ({ name: lang })),
        },
        tags: {
          create: (newProject.tags || []).map((tag: string) => ({ name: tag })),
        },
        demos: {
          create: (newProject.demos || []).map((demo: string) => ({ url: demo })),
        },
      },
    });
    return c.json(project);
  } catch (error) {
    console.error('Error adding project:', error);
    return c.json({ error: 'Failed to add project' }, 500);
  }
});

app.delete('/projects/:id', async (c) => {
  const projectId = Number(c.req.param('id'));

  if (isNaN(projectId)) {
    return c.json({ error: 'Invalid project ID' }, 400);
  }

  try {
    await prisma.language.deleteMany({ where: { projectId } });
    await prisma.tag.deleteMany({ where: { projectId } });
    await prisma.demo.deleteMany({ where: { projectId } });

    await prisma.project.delete({
      where: { id: projectId },
    });

    return c.json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Error deleting project:', error);
    return c.json({ error: 'Failed to delete project' }, 500);
  }
});

app.put('/projects/:id', async (c) => {
  const projectId = Number(c.req.param('id'));

  if (isNaN(projectId)) {
    return c.json({ error: 'Invalid project ID' }, 400);
  }

  try {
    const updatedData = await c.req.json();

    const updatedProject = await prisma.project.update({
      where: { id: projectId },
      data: {
        title: updatedData.title,
        description: updatedData.description,
        status: updatedData.status,
        link: updatedData.link,
        createdAt: new Date(updatedData.createdAt),
        category: updatedData.category,
        public: updatedData.public,
        author: updatedData.author,
        languages: updatedData.languages
          ? {
              set: [],
              create: updatedData.languages.map((lang: string) => ({ name: lang })),
            }
          : undefined,
        tags: updatedData.tags
          ? {
              set: [],
              create: updatedData.tags.map((tag: string) => ({ name: tag })),
            }
          : undefined,
        demos: updatedData.demos
          ? {
              set: [],
              create: updatedData.demos.map((demo: string) => ({ url: demo })),
            }
          : undefined,
      },
    });

    return c.json(updatedProject);
  } catch (error) {
    console.error('Error updating project:', error);
    return c.json({ error: 'Failed to update project' }, 500);
  }
});







const port = 3000;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
