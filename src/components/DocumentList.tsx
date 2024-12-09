import React, { useState } from 'react';
import { Trash2, Expand } from 'lucide-react';
import { ImageModal } from './ImageModal';
import type { DocumentPage } from '../types';

interface DocumentListProps {
  pages: DocumentPage[];
  onDelete: (id: string) => void;
}

export const DocumentList: React.FC<DocumentListProps> = ({ pages, onDelete }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <>
      <div className="grid grid-cols-2 gap-4 p-4">
        {pages.map((page) => (
          <div key={page.id} className="relative">
            <img
              src={page.imageData}
              alt="Document page"
              className="w-full h-48 object-cover rounded-lg"
            />
            <div className="absolute top-2 right-2 flex gap-2">
              <button
                onClick={() => setSelectedImage(page.imageData)}
                className="bg-blue-500 p-2 rounded-full hover:bg-blue-600 transition-colors"
              >
                <Expand className="text-white" size={16} />
              </button>
              <button
                onClick={() => onDelete(page.id)}
                className="bg-red-500 p-2 rounded-full hover:bg-red-600 transition-colors"
              >
                <Trash2 className="text-white" size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedImage && (
        <ImageModal
          imageUrl={selectedImage}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </>
  );
};