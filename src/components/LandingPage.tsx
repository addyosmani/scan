import React from 'react';
import { Scan, Settings2, Layers, Smartphone, Maximize2, FileOutput } from 'lucide-react';

export const LandingPage: React.FC = () => {
  return (
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

      <div className="relative flex justify-center items-center w-full md:w-1/3 relative flex justify-center items-center w-full md:w-1/3 mb-12 mt-8 md:mb-0 md:mt-0">
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
};