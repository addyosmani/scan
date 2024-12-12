import React from 'react';
import { Camera, Upload, FileText, Download, RefreshCw } from 'lucide-react';
import { Camera as CameraComponent } from './components/Camera';
import { ImageCropper } from './components/ImageCropper';
import { DocumentList } from './components/DocumentList';
import { TextExtractor } from './components/TextExtractor';
import { Footer } from './components/Footer';
import { LandingPage } from './components/LandingPage';
import { useDocumentScanner } from './hooks/useDocumentScanner';

function App() {
  const {
    pages,
    showCamera,
    currentImage,
    isProcessing,
    setShowCamera,
    handleCapture,
    handleFileSelect,
    handleCropComplete,
    handleDelete,
    handleReorder,
    handleDownload,
    handleReset
  } = useDocumentScanner();

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

          {pages.length === 0 && !showCamera && !currentImage && !isProcessing && <LandingPage />}

          <DocumentList 
            pages={pages} 
            onDelete={handleDelete}
            onReorder={handleReorder}
          />

          {pages.length > 0 && (
            <div className="mt-8">
              <TextExtractor pages={pages} />
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;