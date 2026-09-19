import test from 'node:test';
import assert from 'node:assert/strict';
import { generateAdmitCardPdf } from './admitCardPdf.js';

test('generateAdmitCardPdf should return a jsPDF document with at least one page', () => {
  const doc = generateAdmitCardPdf({
    fullName: 'Ali Ahmed',
    fatherName: 'Ghulam Rasool',
    surname: 'Parkar',
    cnic: '44301-1234567-1',
    testDate: 'Sunday, 27-Sep-2026 05:00 PM',
    testVenue: 'Public School Nagarparkar',
    seatNo: 'PEA-2026-0001',
    applicationId: '246901',
  });

  assert.ok(doc);
  assert.equal(typeof doc.save, 'function');
  assert.ok(doc.getNumberOfPages() >= 1);
});
