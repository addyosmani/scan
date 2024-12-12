import React, { useState } from 'react';
import { FileText, Loader } from 'lucide-react';
import { extractTextFromImage } from '../utils/textExtraction';
import type { DocumentPage } from '../types';

interface TextExtractorProps {
  pages: DocumentPage[];
}

export const TextExtractor: React.FC<TextExtractorProps> = ({ pages }) => {
  const [extractedText, setExtractedText] = useState<string>('');
  const [isExtracting, setIsExtracting] = useState(false);

  const handleExtractText = async () => {
    setIsExtracting(true);
    try {
      const textResults = await Promise.all(
        pages.map(async (page, index) => {
          const text = await extractTextFromImage(page.imageData);
          return `Page ${index + 1} === ${text}\n\n`;
        })
      );
      setExtractedText(textResults.join(''));
    } catch (error) {
      console.error('Error extracting text:', error);
    }
    setIsExtracting(false);
  };

  return (
    <div className="space-y-4">
      <button
        onClick={handleExtractText}
        disabled={isExtracting || pages.length === 0}
        className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
          isExtracting || pages.length === 0
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-indigo-600 hover:bg-indigo-700 text-white'
        }`}
      >
        {isExtracting ? (
          <Loader className="mr-2 animate-spin" />
        ) : (
          <FileText className="mr-2" />
        )}
        {isExtracting ? 'Extracting Text...' : 'Extract Text'}
      </button>

      {extractedText && (
        <div className="mt-4">
          <textarea
            value={extractedText}
            readOnly
            className="w-full h-64 p-4 border rounded-lg font-mono text-sm bg-gray-50"
            placeholder="Extracted text will appear here..."
          />
        </div>
      )}
    </div>
  );
};