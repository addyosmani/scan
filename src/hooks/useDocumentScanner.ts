import { useState } from 'react';
import type { DocumentPage, CropArea } from '../types';
import { processImage } from '../utils/imageProcessing';
import { generatePDF } from '../utils/pdfGenerator';

export const useDocumentScanner = () => {
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

  return {
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
  };
};