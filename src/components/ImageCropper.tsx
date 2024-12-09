import React, { useState } from 'react';
import Cropper from 'react-easy-crop';
import { Check, RotateCcw, Smartphone, Monitor } from 'lucide-react';
import type { CropArea, Orientation } from '../types';

interface ImageCropperProps {
  image: string;
  onCropComplete: (croppedArea: CropArea) => void;
  onSave: () => void;
  onCancel: () => void;
}

export const ImageCropper: React.FC<ImageCropperProps> = ({
  image,
  onCropComplete,
  onSave,
  onCancel,
}) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [currentCropArea, setCurrentCropArea] = useState<CropArea | null>(null);
  const [orientation, setOrientation] = useState<Orientation>('portrait');

  const aspectRatio = orientation === 'portrait' ? 0.707 : 1.414; // A4 paper ratio (1/√2 for portrait, √2 for landscape)

  const handleCropComplete = (_: any, croppedAreaPixels: CropArea) => {
    setCurrentCropArea(croppedAreaPixels);
  };

  const handleSave = () => {
    if (currentCropArea) {
      onCropComplete(currentCropArea);
    }
  };

  const toggleOrientation = () => {
    setOrientation(prev => prev === 'portrait' ? 'landscape' : 'portrait');
  };

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col">
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-lg z-10">
        <button
          onClick={toggleOrientation}
          className="flex items-center px-4 py-2 space-x-2"
        >
          {orientation === 'portrait' ? (
            <>
              <Smartphone className="text-gray-700" size={20} />
              <span className="text-sm text-gray-700">Portrait</span>
            </>
          ) : (
            <>
              <Monitor className="text-gray-700" size={20} />
              <span className="text-sm text-gray-700">Landscape</span>
            </>
          )}
        </button>
      </div>
      
      <div className="relative h-full">
        <Cropper
          image={image}
          crop={crop}
          zoom={zoom}
          aspect={aspectRatio}
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onCropComplete={handleCropComplete}
        />
      </div>

      <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-4">
        <button
          onClick={onCancel}
          className="bg-red-500 p-3 rounded-full hover:bg-red-600 transition-colors"
        >
          <RotateCcw className="text-white" size={24} />
        </button>
        <button
          onClick={handleSave}
          className="bg-green-500 p-3 rounded-full hover:bg-green-600 transition-colors"
        >
          <Check className="text-white" size={24} />
        </button>
      </div>
    </div>
  );
};