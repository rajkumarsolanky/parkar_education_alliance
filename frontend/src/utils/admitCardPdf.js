import { jsPDF } from 'jspdf';

export function generateAdmitCardPdf({
  fullName,
  fatherName,
  surname,
  cnic,
  testDate,
  testVenue,
  seatNo,
  applicationId,
}) {
  const doc = new jsPDF({ unit: 'mm', format: 'a4' });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  doc.setFillColor(247, 250, 252);
  doc.rect(0, 0, pageWidth, pageHeight, 'F');

  doc.setDrawColor(201, 213, 225);
  doc.roundedRect(14, 14, pageWidth - 28, pageHeight - 28, 8, 8, 'S');

  doc.setFillColor(23, 58, 94);
  doc.roundedRect(18, 18, pageWidth - 36, 22, 5, 5, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text('PARKAR EDUCATION ALLIANCE', 25, 32);

  doc.setTextColor(15, 23, 42);
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.text('Pre-Entry Test Admit Card', 26, 58);

  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  doc.text('Official Roll No Slip for appearing in the Pre-Entry Test (Batch - 2026)', 26, 66);

  doc.setDrawColor(148, 163, 184);
  doc.line(26, 75, pageWidth - 26, 75);

  const leftColX = 26;
  const rightColX = 120;
  const startY = 88;
  const rowGap = 12;

  const rows = [
    ['Candidate Name', fullName || '—'],
    ['Father\'s Name', fatherName || '—'],
    ['Surname / Family Name', surname || '—'],
    ['CNIC', cnic || '—'],
    ['Seat No', seatNo || '—'],
    ['Application ID', applicationId || '—'],
    ['Test Date', testDate || '—'],
    ['Venue', testVenue || '—'],
  ];

  rows.forEach(([label, value], index) => {
    const y = startY + index * rowGap;
    doc.setFillColor(255, 255, 255);
    doc.roundedRect(leftColX, y - 5, pageWidth - 54, 9, 2, 2, 'F');
    doc.setTextColor(71, 85, 105);
    doc.setFont('helvetica', 'bold');
    doc.text(label, leftColX + 3, y + 1);
    doc.setTextColor(15, 23, 42);
    doc.setFont('helvetica', 'normal');
    doc.text(String(value), rightColX, y + 1);
  });

  doc.setDrawColor(148, 163, 184);
  doc.line(26, 185, pageWidth - 26, 185);

  doc.setFont('helvetica', 'bold');
  doc.setTextColor(22, 101, 52);
  doc.text('Important Instructions', 26, 197);

  doc.setTextColor(51, 65, 85);
  doc.setFont('helvetica', 'normal');
  const instructions = [
    '• Bring original CNIC or B-Form along with this slip.',
    '• Arrive before 04:30 PM.',
    '• Mobile phones and electronic devices are strictly prohibited.',
    '• Carry a black ballpoint pen.',
  ];

  instructions.forEach((line, index) => {
    doc.text(line, 30, 206 + index * 8);
  });

  doc.setTextColor(59, 130, 246);
  doc.setFont('helvetica', 'bold');
  doc.text('Good luck!', pageWidth - 42, pageHeight - 24, { align: 'right' });

  return doc;
}
