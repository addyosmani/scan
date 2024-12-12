import { createWorker } from 'tesseract.js';

let worker: Tesseract.Worker | null = null;

export const extractTextFromImage = async (imageData: string): Promise<string> => {
  try {
    if (!worker) {
      worker = await createWorker();
      await worker.loadLanguage('eng');
      await worker.initialize('eng');
    }

    const { data: { text } } = await worker.recognize(imageData);
    return text.trim();
  } catch (error) {
    console.error('Error in text extraction:', error);
    throw error;
  }
};