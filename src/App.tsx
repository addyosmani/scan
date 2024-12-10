import React, { useState } from 'react';
import { Camera, Upload, FileText, Download, RefreshCw, Scan, Layers, Maximize2, FileOutput, Settings2, Smartphone } from 'lucide-react';
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

  const renderLandingPage = () => (
    <div className="flex flex-col md:flex-row items-center justify-center bg-gray-50 p-8 gap-8 rounded-xl mt-6">
      <div className="flex flex-col gap-6 text-center md:text-left md:w-1/3">
        <div className="flex items-start gap-4">
          <div className="bg-blue-100 p-3 rounded-full">
            <Scan className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h3 className="font-bold text-lg">Smart Document Scanning</h3>
            <p className="text-gray-600">Capture documents with precision using your device's camera or upload existing images. Our smart cropping ensures perfect scans every time.</p>
          </div>
        </div>
        <div className="flex items-start gap-4">
          <div className="bg-blue-100 p-3 rounded-full">
            <Settings2 className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h3 className="font-bold text-lg">Advanced Processing</h3>
            <p className="text-gray-600">Automatic enhancement features clean up your scans, adjust contrast, and optimize text readability for professional results.</p>
          </div>
        </div>
        <div className="flex items-start gap-4">
          <div className="bg-blue-100 p-3 rounded-full">
            <Layers className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h3 className="font-bold text-lg">Multi-Page Support</h3>
            <p className="text-gray-600">Create multi-page documents effortlessly. Reorder pages, preview in full screen, and manage your document structure with ease.</p>
          </div>
        </div>
      </div>

      <div className="relative flex justify-center items-center w-full md:w-1/3 mb-12 mt-8 md:mb-0 md:mt-0">
        <img
          src="https://images.unsplash.com/photo-1664706599545-41abae195a57?auto=format&fit=crop&q=80&w=1974"
          alt="Document Scanning"
          className="w-72 rounded-xl shadow-2xl"
        />
        <div className="ocrloader">
          <p>Scanning</p>
          <em></em>
          <span></span>
        </div>
      </div>

      <div className="flex flex-col gap-6 text-center md:text-left md:w-1/3">
        <div className="flex items-start gap-4">
          <div className="bg-blue-100 p-3 rounded-full">
            <Smartphone className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h3 className="font-bold text-lg">Mobile Optimized</h3>
            <p className="text-gray-600">Fully responsive design works seamlessly on all devices. Switch between portrait and landscape orientations for perfect captures.</p>
          </div>
        </div>
        <div className="flex items-start gap-4">
          <div className="bg-blue-100 p-3 rounded-full">
            <Maximize2 className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h3 className="font-bold text-lg">Full Preview Control</h3>
            <p className="text-gray-600">Review your scans in full-screen mode. Ensure every detail is captured perfectly before finalizing your document.</p>
          </div>
        </div>
        <div className="flex items-start gap-4">
          <div className="bg-blue-100 p-3 rounded-full">
            <FileOutput className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h3 className="font-bold text-lg">Instant PDF Export</h3>
            <p className="text-gray-600">Convert your scans into professional PDF documents with a single click. Perfect for sharing or archiving.</p>
          </div>
        </div>
      </div>
    </div>
  );

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
          <div className="flex flex-col items-center space-y-4">
            <div className="flex justify-center gap-4">
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
            </div>
            {pages.length > 0 && (
              <div className="flex gap-4">
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
              </div>
            )}
          </div>

          {pages.length === 0 && !showCamera && !currentImage && !isProcessing && renderLandingPage()}

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