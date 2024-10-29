// frontend/src/services/api.ts
export const addProject = async (newProject: any) => {
  const response = await fetch('http://localhost:3000/add-project', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newProject),
  });
  if (!response.ok) throw new Error('Failed to add project');
  return await response.json();
};
