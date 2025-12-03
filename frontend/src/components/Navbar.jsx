import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LoginModal from './LoginModal';
import { logoutUser } from '../services/api';

export default function Navbar() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [username, setUsername] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("username");
    if (storedUser) {
      setUsername(storedUser);
    }
  }, []);

  const handleLogout = () => {
    logoutUser();     
    setUsername(null); 
    setIsMenuOpen(false); 
    navigate('/');    
  };

  return (
    <>
      <nav className="bg-white border-b border-stone-200 sticky top-0 z-40 w-full">
        <div className="w-full px-6 md:px-10 h-16 flex items-center justify-between">
          
          <Link to="/" className="text-xl font-black text-orange-700 hover:text-orange-600 flex items-center gap-2">
             <span className="text-2xl">☕</span> Nicht Die Bohne
          </Link>

          <div className="hidden md:flex gap-7">
             <Link to="/" className="text-lg hover:text-orange-600 text-orange-700 font-medium">Startseite</Link>
             <Link to="/marketplace" className="text-lg hover:text-orange-600 text-orange-700 font-medium">Marktplatz</Link>
          </div>

          <div className="flex gap-4 items-center">
            
            <button className="bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-900 font-medium px-4 py-2 rounded-lg transition-colors flex items-center gap-2 active:scale-95">
                Verkaufen
            </button>

            {username ? (
              <div className="relative">
                <button 
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="flex items-center gap-2 bg-stone-100 hover:bg-stone-200 px-3 py-2 rounded-full transition-colors"
                >
                  <div className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {username.charAt(0).toUpperCase()}
                  </div>
                  <span className="font-bold text-stone-800 text-sm hidden sm:block">{username}</span>
                  <span className="text-stone-500 text-xs">▼</span>
                </button>
                
                {isMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-stone-100 overflow-hidden py-1 animate-in fade-in zoom-in duration-200">
                    <div className="px-4 py-3 border-b border-stone-100 bg-stone-50">
                      <p className="text-xs text-stone-500">Angemeldet als</p>
                      <p className="font-bold text-stone-900 truncate">{username}</p>
                    </div>

                    <Link 
                      to="/account" 
                      onClick={() => setIsMenuOpen(false)}
                      className="block px-4 py-2 text-sm text-stone-700 hover:bg-orange-50 hover:text-orange-700"
                    >
                      Mein Konto
                    </Link>
                    
                    <button 
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 bg-orange-600 text-white hover:bg-orange-50 hover:text-orange-700  font-medium"
                    >
                      Abmelden
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button 
                  onClick={() => setIsLoginOpen(true)}
                  className="bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-orange-700 transition-colors">
                  Login
              </button>
            )}
            
          </div>
        </div>
      </nav>

      <LoginModal 
        isOpen={isLoginOpen} 
        onClose={() => setIsLoginOpen(false)} 
      />
    </>
  );
}