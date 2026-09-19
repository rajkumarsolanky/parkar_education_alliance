export default function Footer() {
  return (
    <footer className="w-full px-4 pb-6 pt-2">
      <div className="max-w-6xl mx-auto bg-white/80 border border-slate-200 rounded-[28px] shadow-[0_14px_35px_rgba(15,23,42,0.06)] px-5 py-5 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-col items-center md:items-start gap-1">
            <span className="font-extrabold text-xl tracking-tight text-emerald-700">PARKAR</span>
            <p className="font-medium text-sm text-slate-600">© 2026 Parkar Education Alliance. All rights reserved.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-3 md:gap-5">
            <a className="text-sm text-slate-600 hover:text-emerald-700 transition-colors underline" href="#">Privacy Policy</a>
            <a className="text-sm text-slate-600 hover:text-emerald-700 transition-colors underline" href="#">Terms of Service</a>
            <a className="text-sm text-slate-600 hover:text-emerald-700 transition-colors underline" href="#">FAQ</a>
            <a className="text-sm text-slate-600 hover:text-emerald-700 transition-colors underline" href="#">Support</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
