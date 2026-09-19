import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    
    const checkUser = () => {
      const cached = localStorage.getItem('pea_user');
      if (cached) {
        try {
          setUser(JSON.parse(cached));
        } catch (e) {
          setUser(null);
        }
      } else {
        setUser(null);
      }
    };

    checkUser();
    window.addEventListener('auth-change', checkUser);
    
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('auth-change', checkUser);
    };
  }, []);

  function handleLogout() {
    localStorage.removeItem('pea_token');
    localStorage.removeItem('pea_user');
    setUser(null);
    window.dispatchEvent(new Event('auth-change'));
    navigate('/login');
  }

  const initials = user?.full_name
    ? user.full_name.trim().split(/\s+/).map(w => w[0]).join('').toUpperCase().slice(0, 2)
    : 'U';

  const navLink = (path, label) => {
    const isActive = location.pathname === path;

    return (
      <Link
        to={path}
        className={`relative overflow-hidden rounded-full px-4 py-2.5 text-sm font-semibold tracking-wide transition-all duration-300 ease-out ${
          isActive
            ? 'text-blue-600 bg-blue-50 shadow-sm'
            : 'text-slate-600 hover:text-blue-600 hover:bg-blue-50/80'
        }`}
      >
        <span className="relative z-10">{label}</span>
        <span
          className={`absolute inset-x-2 bottom-1 h-0.5 rounded-full bg-blue-500 transition-all duration-300 ${
            isActive ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-75'
          }`}
        />
      </Link>
    );
  };

  return (
    <nav className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-1.5rem)] max-w-6xl backdrop-blur-xl transition-all duration-300 ${scrolled ? 'bg-white/85 shadow-[0_14px_30px_rgba(17,24,39,0.08)]' : 'bg-white/75'} border border-slate-200/80 rounded-full`}>
      <div className="flex justify-between items-center px-4 md:px-6 py-3">
        <Link to="/" className="flex items-center gap-3 group">
          <img alt="Parkar Education Alliance Logo" className="w-10 h-10 object-contain rounded-full border border-slate-200 bg-white shadow-sm group-hover:scale-105 transition-transform" src="src\assets\img\pea.png" />
          <span className="font-bold text-lg md:text-xl text-blue-600 tracking-tight">PARKAR</span>
        </Link>

        <div className="hidden md:flex items-center gap-2 rounded-full bg-slate-100/80 px-2 py-1 border border-slate-200/80">
          {navLink('/', 'Home')}
          {navLink('/about', 'About')}
          {navLink('/testing-services', 'Testing Services')}
          {navLink('/contact', 'Contact')}
        </div>

        <div className="flex items-center gap-2">
          {user ? (
            <>
              <div
                className="hidden md:flex w-9 h-9 rounded-full bg-blue-600 items-center justify-center text-white font-bold cursor-pointer shadow-md shadow-blue-200"
                onClick={() => navigate('/profile')}
              >
                {initials}
              </div>
              <button onClick={handleLogout} className="hidden md:flex items-center gap-1 bg-slate-100 text-slate-800 font-semibold px-4 py-2.5 rounded-full border border-slate-200 hover:bg-slate-200 transition-all">
                <span className="material-symbols-outlined text-[16px]">logout</span> Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="hidden md:flex items-center justify-center bg-blue-600 text-white font-semibold px-4 py-2.5 rounded-full shadow-md shadow-blue-200 hover:bg-blue-500 transition-all active:scale-95">
              Login / Sign Up
            </Link>
          )}
          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
            className={`menu-toggle md:hidden ${menuOpen ? 'open' : ''}`}
          >
            <span className="menu-toggle-lines">
              <span className="menu-toggle-line"></span>
              <span className="menu-toggle-line"></span>
              <span className="menu-toggle-line"></span>
            </span>
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-surface border-t border-outline-variant/30 px-margin-mobile py-md flex flex-col gap-1">
          <Link to="/" className="flex items-center gap-2 font-body-md text-body-md text-on-surface-variant hover:text-primary hover:bg-surface-container px-3 py-2.5 rounded-xl transition-colors" onClick={() => setMenuOpen(false)}>
            <span className="material-symbols-outlined text-[18px]">home</span>Home
          </Link>
          <Link to="/about" className="flex items-center gap-2 font-body-md text-body-md text-on-surface-variant hover:text-primary hover:bg-surface-container px-3 py-2.5 rounded-xl transition-colors" onClick={() => setMenuOpen(false)}>
            <span className="material-symbols-outlined text-[18px]">info</span>About
          </Link>
          <Link to="/testing-services" className="flex items-center gap-2 font-body-md text-body-md text-on-surface-variant hover:text-primary hover:bg-surface-container px-3 py-2.5 rounded-xl transition-colors" onClick={() => setMenuOpen(false)}>
            <span className="material-symbols-outlined text-[18px]">quiz</span>Testing Services
          </Link>
          <Link to="/contact" className="flex items-center gap-2 font-body-md text-body-md text-on-surface-variant hover:text-primary hover:bg-surface-container px-3 py-2.5 rounded-xl transition-colors" onClick={() => setMenuOpen(false)}>
            <span className="material-symbols-outlined text-[18px]">mail</span>Contact
          </Link>
          <div className="h-px bg-outline-variant/30 my-1"></div>
          {user ? (
            <>
              <Link to="/profile" className="flex items-center gap-2 font-body-md text-body-md text-primary font-semibold hover:bg-primary/10 px-3 py-2.5 rounded-xl transition-colors" onClick={() => setMenuOpen(false)}>
                <span className="material-symbols-outlined text-[18px]">badge</span>My Profile & Admit Card
              </Link>
              <button onClick={() => { handleLogout(); setMenuOpen(false); }} className="flex items-center gap-2 text-left text-error font-semibold px-3 py-2.5 rounded-xl hover:bg-error-container/20 transition-colors">
                <span className="material-symbols-outlined text-[18px]">logout</span>Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="bg-primary text-on-primary font-label-caps text-label-caps px-md py-sm rounded-full text-center mt-2 flex items-center justify-center gap-2" onClick={() => setMenuOpen(false)}>
              <span className="material-symbols-outlined text-[18px]">login</span>Login / Sign Up
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
