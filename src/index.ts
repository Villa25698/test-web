import { Hono } from 'hono';
import { serve } from '@hono/node-server';
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { cors } from 'hono/cors';

const app = new Hono();

app.use(("/*"), cors());

app.get('/projects', (c) => {
  const filePath = join(__dirname, 'projekter.json');
  const data = readFileSync(filePath, 'utf-8');
  const projects = JSON.parse(data);
  return c.json(projects);
});

app.post('/projects', async (c) => {
  const newProject = await c.req.json(); 
  const filePath = join(__dirname, 'projekter.json');
  const data = readFileSync(filePath, 'utf-8');
  const projects = JSON.parse(data);

  newProject.id = projects.length + 1; 
  projects.push(newProject); 

  
  writeFileSync(filePath, JSON.stringify(projects, null, 2), 'utf-8');

  return c.json(newProject); 
});

app.get('/', (c) => {
  return c.text('Hono Server with JSON Data!');
});

const port = 3000;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port
});
