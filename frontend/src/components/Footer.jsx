export default function Footer() {
  return (
    <footer className="bg-surface-container w-full py-lg px-margin-desktop border-t border-outline-variant">
      <div className="flex flex-col md:flex-row justify-between items-center gap-md max-w-7xl mx-auto">
        <div className="flex flex-col items-center md:items-start gap-sm">
          <span className="font-headline-md text-headline-md font-bold text-on-surface">PARKAR</span>
          <p className="font-body-md text-body-md text-on-surface-variant">© 2026 Parkar Education Alliance. All rights reserved.</p>
        </div>
        <div className="flex flex-wrap justify-center gap-md">
          <a className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors underline" href="#">Privacy Policy</a>
          <a className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors underline" href="#">Terms of Service</a>
          <a className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors underline" href="#">FAQ</a>
          <a className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors underline" href="#">Support</a>
        </div>
      </div>
    </footer>
  );
}
