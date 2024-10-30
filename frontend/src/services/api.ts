export const addProject = async (newProject: any) => {
  const response = await fetch('http://localhost:3000/add-project', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newProject),
  });
  if (!response.ok) throw new Error('Failed to add project');
  return await response.json();
};

export const deleteProject = async (id: number) => {
  const response = await fetch(`http://localhost:3000/projects/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Failed to delete project');
};

export const updateProject = async (updatedProject: any) => {
  const response = await fetch(`http://localhost:3000/projects/${updatedProject.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedProject),
  });
  if (!response.ok) throw new Error('Failed to update project');
  return await response.json();
};