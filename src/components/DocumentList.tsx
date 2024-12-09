import React from 'react';
import { Trash2 } from 'lucide-react';
import type { DocumentPage } from '../types';

interface DocumentListProps {
  pages: DocumentPage[];
  onDelete: (id: string) => void;
}

export const DocumentList: React.FC<DocumentListProps> = ({ pages, onDelete }) => {
  return (
    <div className="grid grid-cols-2 gap-4 p-4">
      {pages.map((page) => (
        <div key={page.id} className="relative">
          <img
            src={page.imageData}
            alt="Document page"
            className="w-full h-48 object-cover rounded-lg"
          />
          <button
            onClick={() => onDelete(page.id)}
            className="absolute top-2 right-2 bg-red-500 p-2 rounded-full"
          >
            <Trash2 className="text-white" size={16} />
          </button>
        </div>
      ))}
    </div>
  );
};