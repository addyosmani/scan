import React, { useState } from 'react';
import { Trash2, Expand, ChevronLeft, ChevronRight } from 'lucide-react';
import { ImageModal } from './ImageModal';
import type { DocumentPage } from '../types';

interface DocumentListProps {
  pages: DocumentPage[];
  onDelete: (id: string) => void;
  onReorder?: (fromIndex: number, toIndex: number) => void;
}

export const DocumentList: React.FC<DocumentListProps> = ({ 
  pages, 
  onDelete,
  onReorder 
}) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleMove = (index: number, direction: 'left' | 'right') => {
    if (!onReorder) return;
    const newIndex = direction === 'left' ? index - 1 : index + 1;
    if (newIndex >= 0 && newIndex < pages.length) {
      onReorder(index, newIndex);
    }
  };

  return (
    <>
      <div className="grid grid-cols-2 gap-4 p-4">
        {pages.map((page, index) => (
          <div key={page.id} className="relative flex flex-col">
            <img
              src={page.imageData}
              alt={`Document page ${index + 1}`}
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
            <div className="mt-2 flex items-center justify-between px-2">
              <button
                onClick={() => handleMove(index, 'left')}
                disabled={index === 0}
                className={`p-1 rounded ${
                  index === 0
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'text-blue-600 hover:bg-blue-100'
                }`}
              >
                <ChevronLeft size={20} />
              </button>
              <span className="text-sm font-medium text-gray-700">
                Page {index + 1} of {pages.length}
              </span>
              <button
                onClick={() => handleMove(index, 'right')}
                disabled={index === pages.length - 1}
                className={`p-1 rounded ${
                  index === pages.length - 1
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'text-blue-600 hover:bg-blue-100'
                }`}
              >
                <ChevronRight size={20} />
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