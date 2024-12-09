import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-4 text-center text-gray-600">
        Built with love by{' '}
        <a
          href="https://addyosmani.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800 transition-colors"
        >
          Addy Osmani
        </a>
      </div>
    </footer>
  );
};