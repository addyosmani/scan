import React, { useCallback, useRef } from 'react';
import Webcam from 'react-webcam';
import { Camera as CameraIcon, X } from 'lucide-react';

interface CameraProps {
  onCapture: (imageData: string) => void;
  onClose: () => void;
}

export const Camera: React.FC<CameraProps> = ({ onCapture, onClose }) => {
  const webcamRef = useRef<Webcam>(null);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      onCapture(imageSrc);
    }
  }, [onCapture]);

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white p-2"
      >
        <X size={24} />
      </button>
      <Webcam
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        videoConstraints={{
          facingMode: { ideal: 'environment' },
          aspectRatio: 1.4142857143
        }}
        className="w-full h-full object-cover"
      />
      <button
        onClick={capture}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-white rounded-full p-4"
      >
        <CameraIcon size={32} />
      </button>
    </div>
  );
};