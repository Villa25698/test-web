
import React from 'react';
import useProjects from '../custom_hooks/useProjects';
import Modal from '../Modal';
import { format } from 'date-fns';

const Projects = () => {
  const { projects, showCategoryCount, setShowCategoryCount, categoryCount, addProject, deleteProject, updateProject } = useProjects();

  return (
    <section id="projects" className="w-full flex flex-col items-center py-10 relative z-20">
      <div className="flex space-x-4 mb-6">
        <Modal onSave={addProject} />
        <button
          onClick={() => setShowCategoryCount(!showCategoryCount)}
          className="bg-primary-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-600 hover:shadow-lg active:bg-blue-700 transition-all duration-200 border-2 border-gray-300 flex items-center"
        >
          <span>Show Project Count</span>
        </button>
      </div>

      <h2 className="text-3xl font-bold mb-6">Projects</h2>

      {showCategoryCount && (
        <div className="bg-gray-100 p-4 rounded-lg shadow-md w-full max-w-md mb-6">
          <h3 className="text-lg font-bold">Project Count per Category:</h3>
          {Object.keys(categoryCount).map((category) => (
            <p key={category}>
              {category}: {categoryCount[category]} project(s)
            </p>
          ))}
        </div>
      )}

      <div className="relative z-10 p-8 rounded-lg shadow-xl w-11/12 max-w-7xl border-2 bg-secondary-200">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div key={project.id} className="block transform transition-transform duration-200 hover:scale-105 hover:z-10">
              <article className="bg-white border border-gray-400 rounded-lg shadow-md p-6 flex flex-col justify-between relative">
                <h3 className="text-xl font-bold mb-2 text-center">{project.title}</h3>
                <p className="text-sm text-gray-600 mb-4 text-center">{project.description}</p>
                <p className="text-sm mb-4 text-center text-gray-500">Languages: {project.languages.join(', ')}</p>
                <p className="text-sm mb-4 text-center text-gray-400">
                  Published: {format(new Date(project.createdAt), 'dd MMM yyyy')}
                </p>
                
                <div className="flex justify-between mt-4">
                  <button 
                    className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 w-1/2 mr-2"
                    onClick={() => updateProject(project)}
                  >
                    Update
                  </button>
                  <button 
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 w-1/2 ml-2"
                    onClick={() => deleteProject(project.id)}
                  >
                    Delete
                  </button>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
