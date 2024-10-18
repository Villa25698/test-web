import { useState } from 'react';
import { z } from 'zod';

const ProjectSchema = z.object({
  id: z.number(),
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  Languages: z.array(z.string()).nonempty("At least one language is required"),
  link: z.string().url("Invalid URL"),
  category: z.string().min(1, "Category is required"),
  createdAt: z.string(),
  status: z.string().min(1, "Status is required"),
  tags: z.array(z.string()),
  public: z.boolean(),
  author: z.string(),
});

interface Project {
  id: number;
  title: string;
  description: string;
  Languages: string[];
  link: string;
  category: string;
  createdAt: string;
  status: string;
  tags: string[];
  public: boolean;
  author: string;
}

const useModal = (onSave: (project: Project) => void) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [languages, setLanguages] = useState('');
  const [link, setLink] = useState('');
  const [category, setCategory] = useState('');
  const [createdAt, setCreatedAt] = useState('');
  const [status, setStatus] = useState('');
  const [tags, setTags] = useState('');
  const [isPublic, setIsPublic] = useState(false);
  const [author, setAuthor] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newProject = {
      id: Math.floor(Math.random() * 10000),
      title,
      description,
      Languages: languages.split(',').map(lang => lang.trim()),
      link,
      category,
      createdAt,
      status,
      tags: tags.split(',').map(tag => tag.trim()),
      public: isPublic,
      author,
    };

    const result = ProjectSchema.safeParse(newProject);

    if (!result.success) {
      console.error("Validation errors:", result.error.errors);
      alert("Validation failed: " + result.error.errors.map(e => e.message).join(", "));
      return;
    }

    onSave(result.data);
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
    setStatus('');
    setTags('');
    setIsPublic(false);
    setAuthor('');
  };

  return {
    isModalOpen,
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
    setIsModalOpen,
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
  };
};

export default useModal;
