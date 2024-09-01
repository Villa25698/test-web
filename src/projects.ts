//vi setter opp en oppsett/struktur hvordan prosjektene skal se ut
interface Project {
    id: number;
    title: string;
    description: string;
    Languages: string[];
    link: string;
}

//lager liste over prosjekter
let projects: Project[] = [];
let currentIndex = 0;

//her lager vi en function der vi skal vise fram prosjektene med å rendre dem
function renderProjects(projectsToRender: Project[]) {
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
    const title = (document.getElementById('project-title') as HTMLInputElement).value;
    const description = (document.getElementById('project-description') as HTMLTextAreaElement).value;
    const languages = (document.getElementById('project-languages') as HTMLInputElement).value.split(',').map(lang => lang.trim());
    const link = (document.getElementById('project-link') as HTMLInputElement).value;

    const newProject: Project = {
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
    (document.getElementById('project-title') as HTMLInputElement).value = '';
    (document.getElementById('project-description') as HTMLTextAreaElement).value = '';
    (document.getElementById('project-languages') as HTMLInputElement).value = '';
    (document.getElementById('project-link') as HTMLInputElement).value = '';

    const newProjectModal = document.getElementById('new-project-modal') as HTMLDivElement;
    if (newProjectModal) {
        newProjectModal.style.display = 'none';
    }
}
//her så viser vi fram prosjektene når nettsiden har lastet
document.addEventListener("DOMContentLoaded", () => {
    const addProjectButton = document.getElementById('add-Project') as HTMLButtonElement;
    const closeModalButton = document.getElementById('close-modal') as HTMLSpanElement;
    const saveProjectButton = document.getElementById('save-Project') as HTMLButtonElement;

    fetchUpdatedProjects();

    addProjectButton.addEventListener('click', () => {
        const newProjectModal = document.getElementById('new-project-modal') as HTMLDivElement;
        if (newProjectModal) {
            newProjectModal.style.display = 'block';
        }
    });

    closeModalButton.addEventListener('click', () => {
        const newProjectModal = document.getElementById('new-project-modal') as HTMLDivElement;
        if (newProjectModal) {
            newProjectModal.style.display = 'none';
        }
    });

    window.addEventListener('click', (event) => {
        const newProjectModal = document.getElementById('new-project-modal') as HTMLDivElement;
        if (event.target === newProjectModal) {
            newProjectModal.style.display = 'none';
        }
    });

    saveProjectButton.addEventListener('click', addNewProject);
});
