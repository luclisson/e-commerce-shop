import React from 'react';
import { Link } from 'react-router-dom';

export default function LoginModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}>
      
      <div 
        className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 relative animate-in fade-in zoom-in duration-300"
        onClick={(e) => e.stopPropagation()}>
        
        <button 
          onClick={onClose}
          className="absolute bg-stone-100 top-4 right-4 text-stone-400 hover:text-stone-900 transition-colors">
          ✕
        </button>

        <div className="text-center mb-8">
          <h2 className="text-2xl font-black text-stone-900">Willkommen zurück!</h2>
          <p className="text-stone-500 text-sm mt-2">Logge dich ein, um Equipment zu verkaufen.</p>
        </div>

        <form className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-stone-700 mb-1">E-Mail</label>
            <input 
              type="email" 
              className="w-full bg-white text-stone-900 border border-stone-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500 focus:outline-none transition-all"
              placeholder="barista@beispiel.de"
            />
          </div>
          
          <div>
            <label className="block text-sm font-bold text-stone-700 mb-1">Passwort</label>
            <input 
              type="password" 
              className="w-full bg-white text-stone-900 border border-stone-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500 focus:outline-none transition-all"
              placeholder="••••••••"
            />
          </div>

          <button 
            type="submit"
            className="w-full bg-stone-900 text-white font-bold py-3 rounded-xl hover:bg-orange-600 transition-colors shadow-lg hover:shadow-orange-600/20">
            Einloggen
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-stone-500">
          Noch kein Konto?{' '}
          <Link 
            to="/register" 
            onClick={onClose} 
            className="text-orange-600 font-bold hover:underline"
          >
            Registrieren
          </Link>
        </div>

      </div>
    </div>
  );
}