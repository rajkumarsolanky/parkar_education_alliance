import React from 'react';
import peaLogo from '../assets/img/pea.png';

export default function AdmitCard({ data, onClose }) {
  const {
    seatNo = 'PEA-2026-2469',
    applicationId = '246937',
    fullName = 'Student Name',
    fatherName = 'Father Name',
    surname = 'Parkar',
    cnic = '44301-XXXXXXX-X',
    testDate = 'Sunday, 27-September-2026 05:00 PM',
    testVenue = 'Public School / Govt Degree College, Nagarparkar',
    photoUrl = null
  } = data || {};

  const handlePrint = () => {
    window.print();
  };

  // Generate QR Code data URL using a lightweight SVG QR or API
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=PEA-VERIFY-${applicationId}-${cnic}`;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 overflow-y-auto flex items-center justify-center p-4 print:p-0 print:bg-white print:static print:inset-auto">
      <div className="bg-white text-slate-900 rounded-2xl shadow-2xl max-w-2xl w-full p-6 md:p-8 relative print:shadow-none print:p-2 print:max-w-full print:rounded-none">
        
        {/* Action Controls (Hidden on Print) */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-200 print:hidden">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-emerald-700 text-2xl">badge</span>
            <h2 className="font-bold text-lg text-slate-800">Official Admit Card Preview</h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-sm font-semibold rounded-lg shadow-sm transition-all active:scale-95"
            >
              <span className="material-symbols-outlined text-base">print</span>
              Print / Save PDF
            </button>
            {onClose && (
              <button
                onClick={onClose}
                className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
                title="Close"
              >
                <span className="material-symbols-outlined text-xl">close</span>
              </button>
            )}
          </div>
        </div>

        {/* Printable Admit Card Frame */}
        <div className="border-[2.5px] border-slate-700 p-5 md:p-7 bg-white relative font-sans print:border-[2px]">
          
          {/* Card Top Header */}
          <div className="flex items-center justify-between gap-3 border-b-2 border-slate-300 pb-3">
            {/* Logo & Org Name */}
            <div className="flex items-center gap-3">
              <img src={peaLogo} alt="PEA Logo" className="w-16 h-16 object-contain shrink-0" />
              <div>
                <h1 className="text-xl md:text-2xl font-black tracking-wide text-[#173a5e] uppercase">
                  Parkar Education Alliance
                </h1>
                <p className="text-xs font-semibold text-slate-600 tracking-wider">
                  Education for a Brighter Future
                </p>
              </div>
            </div>

            {/* QR Code */}
            <div className="shrink-0 flex flex-col items-center">
              <img
                src={qrUrl}
                alt="Verification QR"
                className="w-16 h-16 md:w-20 md:h-20 border border-slate-300 p-0.5 rounded"
                onError={(e) => { e.target.style.display = 'none'; }}
              />
            </div>
          </div>

          {/* Banner Title */}
          <div className="text-center my-3">
            <div className="inline-block bg-[#173a5e] text-white px-8 py-1 rounded-md text-sm md:text-base font-extrabold tracking-wider uppercase shadow-sm">
              Admit Card
            </div>
            <div className="text-sm font-bold text-slate-800 mt-1 uppercase tracking-wide">
              Pre-Entry Test
            </div>
            <div className="text-xs font-bold text-slate-700 mt-0.5 tracking-wider">
              APPLICATION ID: <span className="font-mono">{applicationId}</span>
            </div>
          </div>

          {/* Student Info & Photo Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-start my-4">
            
            {/* Details Table */}
            <div className="md:col-span-3 space-y-1.5 text-xs md:text-sm">
              <div className="grid grid-cols-12 items-baseline">
                <span className="col-span-4 font-bold text-slate-800 uppercase tracking-wide">Seat No</span>
                <span className="col-span-1 font-bold text-center">:</span>
                <span className="col-span-7 font-mono font-bold text-slate-900">{seatNo}</span>
              </div>

              <div className="grid grid-cols-12 items-baseline">
                <span className="col-span-4 font-bold text-slate-800 uppercase tracking-wide">Name</span>
                <span className="col-span-1 font-bold text-center">:</span>
                <span className="col-span-7 font-bold text-slate-900 uppercase">{fullName}</span>
              </div>

              <div className="grid grid-cols-12 items-baseline">
                <span className="col-span-4 font-bold text-slate-800 uppercase tracking-wide">Father's Name</span>
                <span className="col-span-1 font-bold text-center">:</span>
                <span className="col-span-7 font-bold text-slate-900 uppercase">{fatherName}</span>
              </div>

              <div className="grid grid-cols-12 items-baseline">
                <span className="col-span-4 font-bold text-slate-800 uppercase tracking-wide">Surname</span>
                <span className="col-span-1 font-bold text-center">:</span>
                <span className="col-span-7 font-bold text-slate-900 uppercase">{surname}</span>
              </div>

              <div className="grid grid-cols-12 items-baseline">
                <span className="col-span-4 font-bold text-slate-800 uppercase tracking-wide">CNIC No</span>
                <span className="col-span-1 font-bold text-center">:</span>
                <span className="col-span-7 font-mono font-bold text-slate-900">{cnic}</span>
              </div>

              <div className="grid grid-cols-12 items-baseline">
                <span className="col-span-4 font-bold text-slate-800 uppercase tracking-wide">Test Date</span>
                <span className="col-span-1 font-bold text-center">:</span>
                <span className="col-span-7 font-bold text-slate-900">{testDate}</span>
              </div>

              <div className="grid grid-cols-12 items-baseline">
                <span className="col-span-4 font-bold text-slate-800 uppercase tracking-wide">Test Venue</span>
                <span className="col-span-1 font-bold text-center">:</span>
                <span className="col-span-7 font-medium text-slate-900 leading-snug">{testVenue}</span>
              </div>
            </div>

            {/* Photo Box */}
            <div className="md:col-span-1 flex justify-center md:justify-end">
              <div className="w-28 h-36 border-2 border-slate-700 bg-slate-100 rounded flex flex-col items-center justify-center overflow-hidden shrink-0 shadow-inner">
                {photoUrl ? (
                  <img src={photoUrl} alt="Candidate" className="w-full h-full object-cover" />
                ) : (
                  <div className="flex flex-col items-center justify-center p-2 text-center text-slate-400">
                    <span className="material-symbols-outlined text-4xl mb-1">person</span>
                    <span className="text-[10px] uppercase font-bold tracking-wider leading-tight">Candidate Photo</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="border-t border-slate-400 my-3"></div>

          {/* Instructions Banner */}
          <div className="bg-[#173a5e] text-white px-3 py-1 rounded text-xs md:text-[13px] font-bold tracking-wide uppercase mb-2">
            Important Information / Instructions for the Day of Test:
          </div>

          {/* Instructions List */}
          <ol className="text-[11px] md:text-[12px] text-slate-800 space-y-1.5 leading-relaxed pl-1 list-none font-medium">
            <li className="flex items-start gap-1.5">
              <span className="font-bold shrink-0">i.</span>
              <span>It is mandatory to bring printed copy of this Admit Card along with the original CNIC/B-FORM for appearing in the Pre-Entry Test (Batch - 2026).</span>
            </li>
            <li className="flex items-start gap-1.5">
              <span className="font-bold shrink-0">ii.</span>
              <span>Use of mobile phone, electronic device, calculator, personal computing device, smart watch, camera, ear plugs or other such devices that can be used to send, receive or record any type of examination information are strictly prohibited at the pre-entry test centre.</span>
            </li>
            <li className="flex items-start gap-1.5">
              <span className="font-bold shrink-0">iii.</span>
              <span>Please carefully match and verify your Name and Seat Number appearing on your Admit Card with the OMR answer sheet before the start of Pre-Entry Test.</span>
            </li>
            <li className="flex items-start gap-1.5">
              <span className="font-bold shrink-0">iv.</span>
              <span>You are required to reach in your respective block upto 04:30 PM.</span>
            </li>
            <li className="flex items-start gap-1.5">
              <span className="font-bold shrink-0">v.</span>
              <span>Please bring black ball point pen with you.</span>
            </li>
            <li className="flex items-start gap-1.5">
              <span className="font-bold shrink-0">vi.</span>
              <span>This Pre-Entry Test Admit Card is being issued provisionally, subject to the verification of the documents provided by you.</span>
            </li>
            <li className="flex items-start gap-1.5">
              <span className="font-bold shrink-0">vii.</span>
              <span>In case of any forgery, impersonation or cheating, Parkar Education Alliance reserves the right to cancel or disqualify your candidature.</span>
            </li>
          </ol>

          {/* Warning Footer Box */}
          <div className="mt-3 border-2 border-slate-700 rounded p-2 text-center bg-slate-50">
            <p className="text-[10px] md:text-[11px] font-black text-slate-900 uppercase tracking-wide">
              Mobile phone and other computing devices are strictly prohibited at the pre-entry test centre.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}
