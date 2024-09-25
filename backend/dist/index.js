var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
    }
    catch (err) {
        console.error('Error reading projects:', err);
        return c.json({ error: 'Failed to fetch projects' }, 500);
    }
});
app.post('/projects', (c) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newProject = yield c.req.json();
        const filePath = join(__dirname, 'data', 'projekter.json');
        const data = readFileSync(filePath, 'utf-8');
        const projects = JSON.parse(data);
        newProject.id = projects.length + 1;
        projects.push(newProject);
        writeFileSync(filePath, JSON.stringify(projects, null, 2), 'utf-8');
        return c.json(newProject);
    }
    catch (err) {
        console.error('Error saving project:', err);
        return c.json({ error: 'Failed to save project' }, 500);
    }
}));
app.get('/', (c) => {
    return c.text('Hono Server with JSON Data!');
});
const port = 3000;
console.log(`Server is running on port ${port}`);
serve({
    fetch: app.fetch,
    port,
});
