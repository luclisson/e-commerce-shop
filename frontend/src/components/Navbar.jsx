import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-white border-b border-stone-200 sticky top-0 z-50 w-full">
      <div className="w-full px-6 md:px-10 h-16 flex items-center justify-between">
        
        <Link to="/" className="text-xl font-black text-stone-900 flex items-center gap-2">
           <span className="text-2xl">☕</span> Nicht Die Bohne
        </Link>

        <div className="hidden md:flex gap-6">
           <Link to="/" className="hover:text-orange-600 font-medium">Startseite</Link>
           <Link to="/marketplace" className="hover:text-orange-600 font-medium">Marktplatz</Link>
        </div>

        <button className="bg-stone-900 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-orange-600 transition-colors">
            Verkaufen
        </button>
      </div>
    </nav>
  );
}