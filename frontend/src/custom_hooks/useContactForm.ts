import { useState } from 'react';

const useContactForm = () => {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Message sent by ${name}: ${message}`);
    setName('');
    setMessage('');
  };

  return { name, message, setName, setMessage, handleSubmit };
};

export default useContactForm;
