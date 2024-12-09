import { jsPDF } from 'jspdf';

export const generatePDF = async (pages: string[]): Promise<Blob> => {
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  for (let i = 0; i < pages.length; i++) {
    if (i > 0) {
      pdf.addPage();
    }

    const img = new Image();
    await new Promise((resolve) => {
      img.onload = resolve;
      img.src = pages[i];
    });

    pdf.addImage(img, 'JPEG', 0, 0, 210, 297);
  }

  return pdf.output('blob');
};