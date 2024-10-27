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






const port = 3000;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
