import React, { useState } from 'react';
import Cropper from 'react-easy-crop';
import { Check, RotateCcw } from 'lucide-react';
import type { CropArea } from '../types';

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

  const handleCropComplete = (_: any, croppedAreaPixels: CropArea) => {
    setCurrentCropArea(croppedAreaPixels);
  };

  const handleSave = () => {
    if (currentCropArea) {
      onCropComplete(currentCropArea);
    }
  };

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col">
      <div className="relative h-full">
        <Cropper
          image={image}
          crop={crop}
          zoom={zoom}
          aspect={1.4142857143}
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onCropComplete={handleCropComplete}
        />
      </div>
      <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-4">
        <button
          onClick={onCancel}
          className="bg-red-500 p-3 rounded-full"
        >
          <RotateCcw className="text-white" size={24} />
        </button>
        <button
          onClick={handleSave}
          className="bg-green-500 p-3 rounded-full"
        >
          <Check className="text-white" size={24} />
        </button>
      </div>
    </div>
  );
};