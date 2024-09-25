import React, { useState } from 'react';

interface ModalProps {
  onSave: (project: any) => void;
}

const Modal: React.FC<ModalProps> = ({ onSave }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [languages, setLanguages] = useState('');
  const [link, setLink] = useState('');
  const [category, setCategory] = useState('');
  const [createdAt, setCreatedAt] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newProject = {
      id: Math.floor(Math.random() * 10000),
      title,
      description,
      Languages: languages.split(',').map(lang => lang.trim()),
      link,
      createdAt,
      category,
    };
    onSave(newProject);
    setIsModalOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setLanguages('');
    setLink('');
    setCategory('');
    setCreatedAt('');
  };

  return (
    <>
      <button className="add-project-btn" onClick={() => setIsModalOpen(true)}>Add Project</button>

      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Add New Project</h2>
            <form onSubmit={handleSubmit}>
              <div>
                <label>Title:</label>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
              </div>
              <div>
                <label>Description:</label>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
              </div>
              <div>
                <label>Languages (comma-separated):</label>
                <input type="text" value={languages} onChange={(e) => setLanguages(e.target.value)} required />
              </div>
              <div>
                <label>Link:</label>
                <input type="url" value={link} onChange={(e) => setLink(e.target.value)} required />
              </div>
              <div>
                <label>Category:</label>
                <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} required />
              </div>
              <div>
                <label>Created At:</label>
                <input type="date" value={createdAt} onChange={(e) => setCreatedAt(e.target.value)} required />
              </div>
              <button type="submit">Save Project</button>
              <button type="button" onClick={() => setIsModalOpen(false)}>Cancel</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
