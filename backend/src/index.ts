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

app.get('/', (c) => {
  return c.text('Hono Server with JSON Data!');
});

const port = 3000;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});