import { Hono } from 'hono';
import { serve } from '@hono/node-server';
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { cors } from 'hono/cors';

const app = new Hono();

app.use("/*", cors());

app.get('/projects', (c) => {
  try {
    const filePath = join(__dirname, 'data', 'projekter.json');
    console.log(`Reading projects from: ${filePath}`);
    const data = readFileSync(filePath, 'utf-8');
    const projects = JSON.parse(data);
    return c.json(projects);
  } catch (err) {
    console.error('Error reading projects:', err);
    return c.json({ error: 'Failed to fetch projects' }, 500);
  }
});


app.post('/projects', async (c) => {
  try {
    const newProject = await c.req.json();
    const filePath = join(__dirname, 'data', 'projekter.json');
    const data = readFileSync(filePath, 'utf-8');
    const projects = JSON.parse(data);

    
    newProject.id = projects.length + 1;
    projects.push(newProject);

    
    writeFileSync(filePath, JSON.stringify(projects, null, 2), 'utf-8');
    return c.json(newProject);
  } catch (err) {
    console.error('Error saving project:', err);
    return c.json({ error: 'Failed to save project' }, 500);
  }
});

app.get('/', (c) => {
  return c.text('Hono Server with JSON Data!');
});

const port = 3000;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
