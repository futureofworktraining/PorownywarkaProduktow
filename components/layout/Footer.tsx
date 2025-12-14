import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="mt-20 border-t border-gray-200 dark:border-slate-800 py-8 text-center text-gray-500 dark:text-slate-500 text-sm">
      <p>&copy; {new Date().getFullYear()} AI Product Comparator. Built with React, Tailwind & Gemini API.</p>
    </footer>
  );
};

export default Footer;
