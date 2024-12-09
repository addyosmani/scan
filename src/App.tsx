import React, { useState } from 'react';
import { Camera, Upload, FileText, Download, RefreshCw } from 'lucide-react';
import { Camera as CameraComponent } from './components/Camera';
import { ImageCropper } from './components/ImageCropper';
import { DocumentList } from './components/DocumentList';
import { Footer } from './components/Footer';
import { processImage } from './utils/imageProcessing';
import { generatePDF } from './utils/pdfGenerator';
import type { DocumentPage, CropArea } from './types';

function App() {
  const [pages, setPages] = useState<DocumentPage[]>([]);
  const [showCamera, setShowCamera] = useState(false);
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCapture = (imageData: string) => {
    setCurrentImage(imageData);
    setShowCamera(false);
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCurrentImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCropComplete = async (croppedArea: CropArea) => {
    if (!currentImage) return;
    
    setIsProcessing(true);
    try {
      const processedImage = await processImage(currentImage, croppedArea);
      setPages(prev => [...prev, {
        id: Date.now().toString(),
        imageData: processedImage,
        processed: true
      }]);
    } catch (error) {
      console.error('Error processing image:', error);
    }
    setIsProcessing(false);
    setCurrentImage(null);
  };

  const handleDelete = (id: string) => {
    setPages(prev => prev.filter(page => page.id !== id));
  };

  const handleReorder = (fromIndex: number, toIndex: number) => {
    setPages(prev => {
      const newPages = [...prev];
      const [movedPage] = newPages.splice(fromIndex, 1);
      newPages.splice(toIndex, 0, movedPage);
      return newPages;
    });
  };

  const handleDownload = async () => {
    if (pages.length === 0) return;

    try {
      const pdfBlob = await generatePDF(pages.map(page => page.imageData));
      const url = URL.createObjectURL(pdfBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'document.pdf';
      link.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  const handleReset = () => {
    setPages([]);
    setCurrentImage(null);
    setShowCamera(false);
    setIsProcessing(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <FileText className="mr-2" />
            Document Scanner
          </h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 flex-grow">
        {showCamera && (
          <CameraComponent
            onCapture={handleCapture}
            onClose={() => setShowCamera(false)}
          />
        )}

        {currentImage && (
          <ImageCropper
            image={currentImage}
            onCropComplete={handleCropComplete}
            onSave={handleCropComplete}
            onCancel={() => setCurrentImage(null)}
          />
        )}

        {isProcessing && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-4 rounded-lg">
              <p>Processing image...</p>
            </div>
          </div>
        )}

        <div className="space-y-6">
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => setShowCamera(true)}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Camera className="mr-2" />
              Take Photo
            </button>
            <label className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg cursor-pointer hover:bg-green-700 transition-colors">
              <Upload className="mr-2" />
              Upload Image
              <input
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />
            </label>
            {pages.length > 0 && (
              <>
                <button
                  onClick={handleDownload}
                  className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  <Download className="mr-2" />
                  Download PDF
                </button>
                <button
                  onClick={handleReset}
                  className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  <RefreshCw className="mr-2" />
                  Reset
                </button>
              </>
            )}
          </div>

          <DocumentList 
            pages={pages} 
            onDelete={handleDelete}
            onReorder={handleReorder}
          />
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;