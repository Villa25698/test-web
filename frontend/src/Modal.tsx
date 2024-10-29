import React from 'react';
import useModal from '../src/custom_hooks/useModal';

const Modal: React.FC<{ onSave: (project: any) => void }> = ({ onSave }) => {
  const {
    isModalOpen,
    setIsModalOpen,
    title,
    description,
    languages,
    link,
    category,
    createdAt,
    status,
    tags,
    isPublic,
    author,
    setTitle,
    setDescription,
    setLanguages,
    setLink,
    setCategory,
    setCreatedAt,
    setStatus,
    setTags,
    setIsPublic,
    setAuthor,
    handleSubmit,
  } = useModal((projectData) => {
    onSave(projectData);
    setIsModalOpen(false);
  });

  return (
    <>
      <button
        className="bg-primary-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-primary-600 transition-all duration-200"
        onClick={() => setIsModalOpen(true)}
      >
        Add Project
      </button>

      {isModalOpen && (
        <div className="modal-overlay fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="modal-content bg-white p-6 rounded-lg shadow-lg relative">
            <h2 className="text-text-900 text-xl font-bold mb-4">Add New Project</h2>
            <form onSubmit={handleSubmit}>
              <div>
                <label className="block mb-2">Title:</label>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required className="w-full border border-gray-400 p-2 rounded" />
              </div>
              <div>
                <label className="block mb-2">Description:</label>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} required className="w-full border border-gray-400 p-2 rounded" />
              </div>
              <div>
                <label className="block mb-2">Languages (comma-separated):</label>
                <input type="text" value={languages} onChange={(e) => setLanguages(e.target.value)} required className="w-full border border-gray-400 p-2 rounded" />
              </div>
              <div>
                <label className="block mb-2">Link:</label>
                <input type="url" value={link} onChange={(e) => setLink(e.target.value)} required className="w-full border border-gray-400 p-2 rounded" />
              </div>
              <div>
                <label className="block mb-2">Category:</label>
                <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} required className="w-full border border-gray-400 p-2 rounded" />
              </div>
              <div>
                <label className="block mb-2">Created At:</label>
                <input type="date" value={createdAt} onChange={(e) => setCreatedAt(e.target.value)} required className="w-full border border-gray-400 p-2 rounded" />
              </div>
              <div>
                <label className="block mb-2">Status:</label>
                <input type="text" value={status} onChange={(e) => setStatus(e.target.value)} required className="w-full border border-gray-400 p-2 rounded" />
              </div>
              <div>
                <label className="block mb-2">Tags (comma-separated):</label>
                <input type="text" value={tags} onChange={(e) => setTags(e.target.value)} required className="w-full border border-gray-400 p-2 rounded" />
              </div>
              <div>
                <label className="block mb-2">Public:</label>
                <input type="checkbox" checked={isPublic} onChange={(e) => setIsPublic(e.target.checked)} />
              </div>
              <div>
                <label className="block mb-2">Author:</label>
                <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} required className="w-full border border-gray-400 p-2 rounded" />
              </div>
              <button type="submit" className="bg-primary-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-primary-600 transition-all duration-200 mt-4">
                Save Project
              </button>
              <button
                type="button"
                className="bg-red-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-red-600 transition-all duration-200 mt-4 ml-2"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
