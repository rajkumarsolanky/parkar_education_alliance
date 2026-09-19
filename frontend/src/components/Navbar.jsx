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

  const navLink = (path, label) => (
    <Link
      to={path}
      className={`font-body-md text-body-md transition-colors hover:bg-primary-container/10 rounded-lg px-sm py-xs ${location.pathname === path ? 'text-primary border-b-2 border-primary pb-1' : 'text-on-surface-variant hover:text-primary'
        }`}
    >
      {label}
    </Link>
  );

  return (
    <nav className={`fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-md border-b border-outline-variant/30 shadow-sm transition-all duration-300 ${scrolled ? 'ambient-shadow-md' : ''}`}>
      <div className="flex justify-between items-center max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop py-4">
        <Link to="/" className="flex items-center gap-sm group">
          <img alt="Parkar Education Alliance Logo" className="w-10 h-10 object-contain rounded-full border border-outline-variant/50 group-hover:scale-105 transition-transform" src="src\assets\img\pea.png" />
          <span className="font-headline-md text-headline-md font-bold text-primary tracking-tight">PARKAR</span>
        </Link>

        <div className="hidden md:flex items-center gap-md">
          {navLink('/', 'Home')}
          {navLink('/about', 'About')}
          {navLink('/testing-services', 'Testing Services')}
          {navLink('/contact', 'Contact')}
        </div>

        <div className="flex items-center gap-sm">
          {user ? (
            <>
              <div
                className="hidden md:flex w-9 h-9 rounded-full bg-primary items-center justify-center text-on-primary font-bold cursor-pointer"
                onClick={() => navigate('/profile')}
              >
                {initials}
              </div>
              <button onClick={handleLogout} className="hidden md:flex items-center gap-1 bg-surface-container text-on-surface font-label-caps text-label-caps px-md py-sm rounded-full border border-outline-variant hover:bg-surface-variant transition-all">
                <span className="material-symbols-outlined text-[16px]">logout</span> Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="hidden md:flex items-center justify-center bg-primary text-on-primary font-label-caps text-label-caps px-md py-sm rounded-full hover:bg-on-primary-fixed-variant hover:shadow-md transition-all active:scale-95 duration-150">
              Login / Sign Up
            </Link>
          )}
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-on-surface-variant p-2 rounded-lg hover:bg-surface-variant transition-colors">
            <span className="material-symbols-outlined">menu</span>
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-surface border-t border-outline-variant/30 px-margin-mobile py-md flex flex-col gap-sm">
          <Link to="/" className="font-body-md text-body-md text-on-surface-variant hover:text-primary py-2" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/about" className="font-body-md text-body-md text-on-surface-variant hover:text-primary py-2" onClick={() => setMenuOpen(false)}>About</Link>
          <Link to="/testing-services" className="font-body-md text-body-md text-on-surface-variant hover:text-primary py-2" onClick={() => setMenuOpen(false)}>Testing Services</Link>
          <Link to="/contact" className="font-body-md text-body-md text-on-surface-variant hover:text-primary py-2" onClick={() => setMenuOpen(false)}>Contact</Link>
          {user ? (
            <button onClick={handleLogout} className="text-left text-error py-2">Logout</button>
          ) : (
            <Link to="/login" className="bg-primary text-on-primary font-label-caps text-label-caps px-md py-sm rounded-full text-center mt-2" onClick={() => setMenuOpen(false)}>Login / Sign Up</Link>
          )}
        </div>
      )}
    </nav>
  );
}
