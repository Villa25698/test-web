import React from 'react';
import useContactForm from '../custom_hooks/useContactForm';

const ContactForm = () => {
  const { name, message, setName, setMessage, handleSubmit } = useContactForm();

  return (
    <section id="contact-form" className="relative z-10  p-8 rounded-lg shadow-xl w-11/12 max-w-7xl mx-auto mt-10 border-2 bg-secondary-200">
      <h2 className="text-2xl font-bold text-center mb-6">Contact Form</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-lg font-semibold mb-2">Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full border border-gray-400 p-2 rounded"
          />
        </div>
        <div>
          <label className="block text-lg font-semibold mb-2">Message:</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            className="w-full border border-gray-400 p-2 rounded"
          />
        </div>
        <button
          type="submit"
          className="bg-primary-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-600 hover:shadow-lg active:bg-blue-700 transition-all duration-200"
        >
          Send Message
        </button>
      </form>
    </section>
  );
};

export default ContactForm;
