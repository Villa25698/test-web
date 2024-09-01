"use strict";
//lager liste over prosjekter
let projects = [];
let currentIndex = 0;
//her lager vi en function der vi skal vise fram prosjektene med å rendre dem
function renderProjects(projectsToRender) {
    const projectsContainer = document.getElementById('projects-container');
    if (projectsContainer) {
        projectsContainer.innerHTML = '';
        projectsToRender.forEach(project => {
            const card = document.createElement('div');
            card.className = 'project-card';
            card.innerHTML = `
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <p><strong>Languages:</strong> ${project.Languages.join(', ')}</p>
                <a href="${project.link}" target="_blank">View Project</a>
            `;
            projectsContainer.appendChild(card);
        });
    }
}
//her har vi en functiomn som oppdatere prosjektene til den nyeste versjonen
function fetchUpdatedProjects() {
    fetch('/api/projects')
        .then(response => response.json())
        .then((data) => {
        console.log("Fetched updated projects:", data);
        projects = data;
        currentIndex = 0;
        renderProjects(projects);
    })
        .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });
}
//her legger vi projectene til i en liste
function addNewProject() {
    const title = document.getElementById('project-title').value;
    const description = document.getElementById('project-description').value;
    const languages = document.getElementById('project-languages').value.split(',').map(lang => lang.trim());
    const link = document.getElementById('project-link').value;
    const newProject = {
        id: projects.length + 1,
        title,
        description,
        Languages: languages,
        link
    };
    fetch('http://localhost:3000/projects', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newProject)
    })
        .then(response => response.json())
        .then(() => {
        fetchUpdatedProjects();
    })
        .catch(error => console.error('Error:', error));
    //tommer input feltene i hadde på popup/modalen
    document.getElementById('project-title').value = '';
    document.getElementById('project-description').value = '';
    document.getElementById('project-languages').value = '';
    document.getElementById('project-link').value = '';
    const newProjectModal = document.getElementById('new-project-modal');
    if (newProjectModal) {
        newProjectModal.style.display = 'none';
    }
}
//her så viser vi fram prosjektene når nettsiden har lastet
document.addEventListener("DOMContentLoaded", () => {
    const addProjectButton = document.getElementById('add-Project');
    const closeModalButton = document.getElementById('close-modal');
    const saveProjectButton = document.getElementById('save-Project');
    fetchUpdatedProjects();
    addProjectButton.addEventListener('click', () => {
        const newProjectModal = document.getElementById('new-project-modal');
        if (newProjectModal) {
            newProjectModal.style.display = 'block';
        }
    });
    closeModalButton.addEventListener('click', () => {
        const newProjectModal = document.getElementById('new-project-modal');
        if (newProjectModal) {
            newProjectModal.style.display = 'none';
        }
    });
    window.addEventListener('click', (event) => {
        const newProjectModal = document.getElementById('new-project-modal');
        if (event.target === newProjectModal) {
            newProjectModal.style.display = 'none';
        }
    });
    saveProjectButton.addEventListener('click', addNewProject);
});
