import React, { useRef } from 'react';
import peaLogo from '../assets/img/pea.png';

export default function AdmitCard({ data, onClose }) {
  const {
    seatNo = 'PEA-2026-2469',
    applicationId = '246937',
    fullName = 'Student Name',
    fatherName = 'Father Name',
    surname = 'Parkar',
    cnic = '44301-1234567-1',
    testDate = 'Sunday, 27-September-2026 05:00 PM',
    testVenue = 'Public School / Govt Degree College, Nagarparkar',
    photoUrl = null
  } = data || {};

  const cardRef = useRef(null);

  const handlePrint = () => {
    const cardHtml = cardRef.current?.innerHTML;
    if (!cardHtml) return;

    const win = window.open('', '_blank', 'width=900,height=700');
    win.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8"/>
          <title>Admit Card — ${fullName}</title>
          <link rel="preconnect" href="https://fonts.googleapis.com"/>
          <link href="https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800;900&display=swap" rel="stylesheet"/>
          <style>
            * { box-sizing: border-box; margin: 0; padding: 0; }
            body { font-family: 'Sora', Arial, sans-serif; background: white; color: #0f172a; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
            .slip-wrapper { max-width: 700px; margin: 20px auto; padding: 20px; border: 2px solid #334155; font-size: 12px; }
            .header-row { display: flex; align-items: flex-start; justify-content: space-between; padding-bottom: 10px; border-bottom: 1px solid #94a3b8; }
            .org-name { font-size: 20px; font-weight: 900; color: #173a5e; text-transform: uppercase; letter-spacing: -0.5px; }
            .org-tagline { font-size: 10px; font-weight: 600; color: #64748b; margin-top: 2px; letter-spacing: 0.5px; }
            .pea-logo { width: 72px; height: 72px; object-fit: contain; }
            .qr-img { width: 70px; height: 70px; border: 1px solid #cbd5e1; padding: 2px; border-radius: 2px; }
            .title-section { text-align: center; margin: 12px 0; }
            .admit-badge { display: inline-block; background: #173a5e; color: white; padding: 4px 36px; border-radius: 4px; font-size: 14px; font-weight: 800; letter-spacing: 2px; text-transform: uppercase; }
            .pre-entry-title { font-size: 13px; font-weight: 700; color: #0f172a; margin-top: 4px; text-transform: uppercase; letter-spacing: 1px; }
            .app-id { font-size: 12px; font-weight: 700; color: #1e293b; margin-top: 2px; letter-spacing: 0.5px; }
            .info-grid { display: grid; grid-template-columns: 1fr 72px; gap: 12px; margin: 12px 0; align-items: start; }
            .fields { display: flex; flex-direction: column; gap: 6px; }
            .field-row { display: grid; grid-template-columns: 110px 12px 1fr; align-items: baseline; font-size: 11px; }
            .field-label { font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; color: #374151; }
            .field-colon { font-weight: 700; text-align: center; }
            .field-value { font-weight: 700; color: #0f172a; text-transform: uppercase; }
            .field-value.mono { font-family: monospace; }
            .photo-box { width: 96px; height: 124px; border: 2px solid #334155; background: #f1f5f9; display: flex; flex-direction: column; align-items: center; justify-content: center; overflow: hidden; }
            .photo-box img { width: 100%; height: 100%; object-fit: cover; }
            .photo-placeholder { font-size: 9px; text-align: center; color: #94a3b8; text-transform: uppercase; font-weight: 700; letter-spacing: 0.5px; }
            .divider { border: none; border-top: 1px solid #94a3b8; margin: 10px 0; }
            .instructions-header { background: #173a5e; color: white; padding: 4px 10px; border-radius: 3px; font-size: 10px; font-weight: 700; letter-spacing: 0.5px; text-transform: uppercase; margin-bottom: 8px; }
            .instructions-list { list-style: none; display: flex; flex-direction: column; gap: 4px; }
            .instruction-item { display: flex; align-items: flex-start; gap: 6px; font-size: 10px; color: #1e293b; line-height: 1.45; font-weight: 500; }
            .instr-num { font-weight: 700; flex-shrink: 0; }
            .bottom-alert { margin-top: 10px; border: 1.5px solid #334155; border-radius: 3px; padding: 6px; text-align: center; background: #f8fafc; }
            .bottom-alert p { font-size: 9.5px; font-weight: 900; text-transform: uppercase; letter-spacing: 0.3px; color: #0f172a; }
            @media print {
              body { margin: 0; }
              .slip-wrapper { margin: 0; border: 2px solid #334155; }
            }
          </style>
        </head>
        <body>
          <div class="slip-wrapper">
            <div class="header-row">
              <div style="display:flex;align-items:center;gap:12px;">
                <img class="pea-logo" src="${window.location.origin}/src/assets/img/pea.png" alt="PEA Logo" onerror="this.style.display='none'"/>
                <div>
                  <div class="org-name">Parkar Education Alliance</div>
                  <div class="org-tagline">Education for a Brighter Future</div>
                </div>
              </div>
              <img class="qr-img" src="https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=PEA-ADMIT-${applicationId}-${cnic}" alt="QR"/>
            </div>

            <div class="title-section">
              <div class="admit-badge">ADMIT CARD</div>
              <div class="pre-entry-title">PRE-ENTRY TEST</div>
              <div class="app-id">APPLICATION ID: <span style="font-family:monospace;">${applicationId}</span></div>
            </div>

            <div class="info-grid">
              <div class="fields">
                <div class="field-row">
                  <span class="field-label">SEAT NO</span>
                  <span class="field-colon">:</span>
                  <span class="field-value mono">${seatNo}</span>
                </div>
                <div class="field-row">
                  <span class="field-label">NAME</span>
                  <span class="field-colon">:</span>
                  <span class="field-value">${fullName}</span>
                </div>
                <div class="field-row">
                  <span class="field-label">FATHER'S NAME</span>
                  <span class="field-colon">:</span>
                  <span class="field-value">${fatherName}</span>
                </div>
                <div class="field-row">
                  <span class="field-label">SURNAME</span>
                  <span class="field-colon">:</span>
                  <span class="field-value">${surname}</span>
                </div>
                <div class="field-row">
                  <span class="field-label">CNIC NO</span>
                  <span class="field-colon">:</span>
                  <span class="field-value mono">${cnic}</span>
                </div>
                <div class="field-row">
                  <span class="field-label">TEST DATE</span>
                  <span class="field-colon">:</span>
                  <span class="field-value">${testDate}</span>
                </div>
                <div class="field-row">
                  <span class="field-label">TEST VENUE</span>
                  <span class="field-colon">:</span>
                  <span class="field-value" style="text-transform:none;font-weight:600;">${testVenue}</span>
                </div>
              </div>
              <div class="photo-box">
                ${photoUrl
                  ? `<img src="${photoUrl}" alt="Candidate"/>`
                  : `<div class="photo-placeholder">Candidate<br/>Photo</div>`
                }
              </div>
            </div>

            <hr class="divider"/>

            <div class="instructions-header">IMPORTANT INFORMATION / INSTRUCTIONS FOR THE DAY OF TEST:</div>
            <ol class="instructions-list">
              <li class="instruction-item"><span class="instr-num">i.</span><span>It is mandatory to bring printed copy of this Admit Card along with the original CNIC/B-FORM for appearing in the Pre-Entry Test (Batch - 2026).</span></li>
              <li class="instruction-item"><span class="instr-num">ii.</span><span>Use of mobile phone, electronic device, calculator, personal computing device, smart watch, camera, ear plugs or other such devices that can be used to send, receive or record any type of examination information are strictly prohibited at the pre-entry test centre.</span></li>
              <li class="instruction-item"><span class="instr-num">iii.</span><span>Please carefully match and verify your Name and Seat Number appearing on your Admit Card with the OMR answer sheet before the start of Pre-Entry Test.</span></li>
              <li class="instruction-item"><span class="instr-num">iv.</span><span>You are required to reach in your respective block upto 04:30 PM.</span></li>
              <li class="instruction-item"><span class="instr-num">v.</span><span>Please bring black ball point pen with you.</span></li>
              <li class="instruction-item"><span class="instr-num">vi.</span><span>This Pre-Entry Test Admit Card is being issued provisionally, subject to the verification of the documents provided by you.</span></li>
              <li class="instruction-item"><span class="instr-num">vii.</span><span>In case of any forgery, impersonation or cheating, University of Sindh reserves the right to cancel or disqualify your candidature.</span></li>
            </ol>

            <div class="bottom-alert">
              <p>MOBILE PHONE AND OTHER COMPUTING DEVICES ARE STRICTLY PROHIBITED AT THE PRE-ENTRY TEST CENTRE.</p>
            </div>
          </div>

          <script>
            window.onload = function() {
              window.print();
              window.onafterprint = function() { window.close(); };
            };
          </script>
        </body>
      </html>
    `);
    win.document.close();
  };

  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=PEA-ADMIT-${applicationId}-${cnic}`;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 overflow-y-auto flex items-center justify-center p-3 md:p-6 print:p-0 print:bg-white print:static print:inset-auto">
      <div className="bg-white text-slate-900 rounded-2xl shadow-2xl max-w-2xl w-full p-4 md:p-6 relative print:shadow-none print:p-0 print:max-w-full print:rounded-none">
        
        {/* Top Control Bar (Hidden in Print / PDF) */}
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-200 print:hidden">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-emerald-700 text-2xl">badge</span>
            <div>
              <h2 className="font-bold text-base md:text-lg text-slate-800 leading-tight">Official Pre-Entry Test Admit Card</h2>
              <p className="text-xs text-slate-500">Roll No Slip for Batch - 2026</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#173a5e] hover:bg-[#102a45] text-white text-xs md:text-sm font-bold rounded-lg shadow-md transition-all active:scale-95"
            >
              <span className="material-symbols-outlined text-base">print</span>
              Download / Print Slip
            </button>
            {onClose && (
              <button
                onClick={onClose}
                className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                title="Close"
              >
                <span className="material-symbols-outlined text-xl">close</span>
              </button>
            )}
          </div>
        </div>

        {/* Printable Card Frame — Exact 1:1 match to Official Sample */}
        <div className="border-[2px] border-slate-700 p-4 md:p-6 bg-white font-sans text-slate-900 leading-normal print:border-[2px]">
          
          {/* Header Row */}
          <div className="flex items-start justify-between gap-2 border-b border-slate-400 pb-2.5">
            {/* Logo + Titles */}
            <div className="flex items-center gap-3">
              <img src={peaLogo} alt="PEA Logo" className="w-16 h-16 md:w-20 md:h-20 object-contain shrink-0" />
              <div>
                <h1 className="text-lg md:text-2xl font-black text-[#173a5e] tracking-tight uppercase">
                  PARKAR EDUCATION ALLIANCE
                </h1>
                <p className="text-[11px] md:text-xs font-semibold text-slate-600 tracking-wide mt-0.5">
                  Education for a Brighter Future
                </p>
              </div>
            </div>

            {/* QR Code */}
            <div className="shrink-0 flex flex-col items-center">
              <img
                src={qrUrl}
                alt="QR Verification"
                className="w-16 h-16 md:w-18 md:h-18 border border-slate-300 p-0.5 rounded"
                onError={(e) => { e.target.style.display = 'none'; }}
              />
            </div>
          </div>

          {/* Title Badges */}
          <div className="text-center my-3">
            <div className="inline-block bg-[#173a5e] text-white px-8 py-1 rounded-md text-sm md:text-base font-extrabold tracking-wider uppercase">
              ADMIT CARD
            </div>
            <h2 className="text-sm md:text-base font-bold text-slate-900 mt-1 uppercase tracking-wide">
              PRE-ENTRY TEST
            </h2>
            <div className="text-xs md:text-sm font-bold text-slate-800 mt-0.5 tracking-wider">
              APPLICATION ID: <span className="font-mono">{applicationId}</span>
            </div>
          </div>

          {/* Student Info & Photo Section */}
          <div className="grid grid-cols-12 gap-3 items-start my-3">
            
            {/* Left Data Table */}
            <div className="col-span-8 md:col-span-9 space-y-1.5 text-[11px] md:text-xs">
              <div className="grid grid-cols-12 items-baseline">
                <span className="col-span-4 font-bold uppercase tracking-wider text-slate-800">SEAT NO</span>
                <span className="col-span-1 font-bold text-center">:</span>
                <span className="col-span-7 font-mono font-bold text-slate-900">{seatNo || '—'}</span>
              </div>

              <div className="grid grid-cols-12 items-baseline">
                <span className="col-span-4 font-bold uppercase tracking-wider text-slate-800">NAME</span>
                <span className="col-span-1 font-bold text-center">:</span>
                <span className="col-span-7 font-bold text-slate-900 uppercase">{fullName || '—'}</span>
              </div>

              <div className="grid grid-cols-12 items-baseline">
                <span className="col-span-4 font-bold uppercase tracking-wider text-slate-800">FATHER’S NAME</span>
                <span className="col-span-1 font-bold text-center">:</span>
                <span className="col-span-7 font-bold text-slate-900 uppercase">{fatherName || '—'}</span>
              </div>

              <div className="grid grid-cols-12 items-baseline">
                <span className="col-span-4 font-bold uppercase tracking-wider text-slate-800">SURNAME</span>
                <span className="col-span-1 font-bold text-center">:</span>
                <span className="col-span-7 font-bold text-slate-900 uppercase">{surname || '—'}</span>
              </div>

              <div className="grid grid-cols-12 items-baseline">
                <span className="col-span-4 font-bold uppercase tracking-wider text-slate-800">CNIC NO</span>
                <span className="col-span-1 font-bold text-center">:</span>
                <span className="col-span-7 font-mono font-bold text-slate-900">{cnic || '—'}</span>
              </div>

              <div className="grid grid-cols-12 items-baseline pt-1">
                <span className="col-span-4 font-bold uppercase tracking-wider text-slate-800">TEST DATE</span>
                <span className="col-span-1 font-bold text-center">:</span>
                <span className="col-span-7 font-bold text-slate-900">{testDate || 'Sunday, 27-September-2026 05:00 PM'}</span>
              </div>

              <div className="grid grid-cols-12 items-baseline">
                <span className="col-span-4 font-bold uppercase tracking-wider text-slate-800">TEST VENUE</span>
                <span className="col-span-1 font-bold text-center">:</span>
                <span className="col-span-7 font-medium text-slate-900 leading-snug">{testVenue || 'Public School / Govt Degree College, Nagarparkar'}</span>
              </div>
            </div>

            {/* Right Photo Frame */}
            <div className="col-span-4 md:col-span-3 flex justify-end">
              <div className="w-24 h-32 md:w-28 md:h-36 border-2 border-slate-700 bg-slate-100 rounded flex flex-col items-center justify-center overflow-hidden shrink-0 shadow-inner">
                {photoUrl ? (
                  <img src={photoUrl} alt="Candidate" className="w-full h-full object-cover" />
                ) : (
                  <div className="flex flex-col items-center justify-center p-2 text-center text-slate-400">
                    <span className="material-symbols-outlined text-4xl mb-0.5">person</span>
                    <span className="text-[9px] uppercase font-bold tracking-wider leading-tight text-slate-500">Candidate Photo</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="border-t border-slate-400 my-2.5"></div>

          {/* Instructions Header Banner */}
          <div className="bg-[#173a5e] text-white px-2.5 py-1 rounded text-[10.5px] md:text-xs font-bold tracking-wide uppercase mb-2">
            IMPORTANT INFORMATION / INSTRUCTIONS FOR THE DAY OF TEST:
          </div>

          {/* Instructions 7 Rules — Exact match */}
          <ol className="text-[10px] md:text-[11px] text-slate-800 space-y-1 leading-relaxed list-none font-medium pl-0.5">
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
              <span>In case of any forgery, impersonation or cheating, University of Sindh reserves the right to cancel or disqualify your candidature.</span>
            </li>
          </ol>

          {/* Bottom Alert Box */}
          <div className="mt-2.5 border-[1.5px] border-slate-700 rounded p-1.5 text-center bg-slate-50">
            <p className="text-[9.5px] md:text-[10.5px] font-black text-slate-900 uppercase tracking-wide">
              MOBILE PHONE AND OTHER COMPUTING DEVICES ARE STRICTLY PROHIBITED AT THE PRE-ENTRY TEST CENTRE.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}
