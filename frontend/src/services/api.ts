export const addProject = async (newProject: any) => {
    try {
      const response = await fetch('http://localhost:3000/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProject),
      });
  
      if (!response.ok) {
        throw new Error('Failed to save project');
      }
  
      return await response.json();
    } catch (error) {
      console.error('Error while saving project:', error);
      throw error;
    }
  };
  