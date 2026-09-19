import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

export async function generateAdmitCardPdfFromElement(element) {
  if (!element) {
    throw new Error('Admit card element is not available.');
  }

  if (document.fonts?.ready) {
    await document.fonts.ready;
  }

  await Promise.all(
    Array.from(element.querySelectorAll('img')).map((image) => {
      if (image.complete) return Promise.resolve();
      return new Promise((resolve) => {
        image.addEventListener('load', resolve, { once: true });
        image.addEventListener('error', resolve, { once: true });
      });
    }),
  );

  const canvas = await html2canvas(element, {
    backgroundColor: '#ffffff',
    scale: Math.min(window.devicePixelRatio || 1, 2),
    useCORS: true,
    logging: false,
    width: element.getBoundingClientRect().width,
    height: element.getBoundingClientRect().height,
    windowWidth: Math.ceil(element.getBoundingClientRect().width),
    windowHeight: Math.ceil(element.getBoundingClientRect().height),
  });

  const pdf = new jsPDF({ unit: 'mm', format: 'a4', orientation: 'portrait' });
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const margin = 8;
  const availableWidth = pageWidth - margin * 2;
  const availableHeight = pageHeight - margin * 2;
  const imageRatio = canvas.width / canvas.height;
  const imageWidth = Math.min(availableWidth, availableHeight * imageRatio);
  const imageHeight = imageWidth / imageRatio;
  const imageX = (pageWidth - imageWidth) / 2;
  const imageY = (pageHeight - imageHeight) / 2;
  const imageData = canvas.toDataURL('image/png', 1);

  pdf.addImage(imageData, 'PNG', imageX, imageY, imageWidth, imageHeight);
  return pdf;
}

